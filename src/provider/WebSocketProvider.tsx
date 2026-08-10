"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

interface MessagePayload {
  action?: string;
  type?: string;
  data?: any;
  [key: string]: any;
}

interface ClientChatContextType {
  socket: WebSocket | null;
  isAuthenticated: boolean;
  messages: any[];
  unreadCount: number;
  connect: (threadId: string | number) => void;
  sendMessage: (payload: MessagePayload) => void;
  markSeen: () => void;
  disconnect: () => void;
}

const ClientChatContext = createContext<ClientChatContextType>({
  socket: null,
  isAuthenticated: false,
  messages: [],
  unreadCount: 0,
  connect: () => {},
  sendMessage: () => {},
  markSeen: () => {},
  disconnect: () => {},
});

export const useClientChat = () => useContext(ClientChatContext);

// Backwards compatibility for ChatArea which imports useSocket
export const useSocket = useClientChat; 

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const currentThreadId = useRef<string | number | null>(null);
  const messageQueue = useRef<MessagePayload[]>([]);

  const connect = useCallback((threadId: string | number) => {
    const currentSocket = socketRef.current;
    if (
      currentThreadId.current === threadId &&
      (currentSocket?.readyState === WebSocket.OPEN || currentSocket?.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    const rawToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null;
    const token = rawToken ? rawToken.replace(/^["']|["']$/g, "") : null;

    if (!token || !threadId) {
      console.warn("Missing token or threadId");
      return;
    }

    if (currentSocket) {
      currentSocket.close();
    }

    setSocket(null);
    socketRef.current = null;

    currentThreadId.current = threadId;
    setIsAuthenticated(false);
    setMessages([]);

    const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    
    // Use the existing .env variable
    const baseWsUrl = process.env.NEXT_PUBLIC_WEB_SOCKET_URL 
      ? process.env.NEXT_PUBLIC_WEB_SOCKET_URL.replace(/\/+$/, '') 
      : `${protocol}//api.jm.j4corp.net`;
      
    const wsUrl = `${baseWsUrl}/ws/client-chat/${threadId}/`;
    console.log("Connecting to:", wsUrl);
    
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log("ClientChat WebSocket connected. Authenticating...");
      // Send auth payload without token in URL
      ws.send(JSON.stringify({ action: "auth", token: token }));
    };

    ws.onclose = (event) => {
      console.log("ClientChat WebSocket disconnected", event.code);
      currentThreadId.current = null;
      setIsAuthenticated(false);
      setSocket(null);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "auth_ok") {
          console.log("ClientChat auth successful");
          setIsAuthenticated(true);
          // Hydrate history immediately upon authentication
          ws.send(JSON.stringify({ action: "fetch_chat" }));

          // Flush any queued messages
          if (messageQueue.current.length > 0) {
            messageQueue.current.forEach((payload) => {
              ws.send(JSON.stringify(payload));
            });
            messageQueue.current = [];
          }
        } else if (message.type === "fetch_chat" || message.type === "chat_history") {
          // Received hydrated history
          const serverMsgs = Array.isArray(message.data) ? message.data : (message.data?.messages || message.messages || []);
          
          setMessages((prev) => {
            const optimisticMsgs = prev.filter((m) => m.isOptimistic);
            return [...serverMsgs, ...optimisticMsgs];
          });
        } else if (message.type === "message" || message.type === "new_message") {
          // Received a new live message
          const newMsg = message.data || message.message || message;
          setMessages((prev) => {
            // Deduplicate server echo of our own optimistic message
            const hasOptimistic = prev.some(
              (m) => m.isOptimistic && m.text === newMsg.text
            );
            if (hasOptimistic) {
              return prev.map((m) =>
                m.isOptimistic && m.text === newMsg.text ? newMsg : m
              );
            }
            if (newMsg.id && prev.some((m) => m.id === newMsg.id)) {
              return prev;
            }
            return [...prev, newMsg];
          });

          // Increment unread count if it's from someone else
          if (newMsg.sender_type === "agent" || newMsg.sender === "agent") {
            setUnreadCount((prev) => prev + 1);
          }
          
        } else if (message.type === "seen") {
          console.log("ClientChat messages seen by", message.data?.seen_by);
          const seenBy = message.data?.seen_by;
          setMessages((prev) => prev.map(m => {
            if (seenBy === "agent" && (m.sender === "client" || m.sender_type === "client")) {
              return { ...m, is_seen_by_agent: true };
            }
            if (seenBy === "client" && (m.sender === "agent" || m.sender_type === "agent")) {
              return { ...m, is_seen_by_client: true };
            }
            return m;
          }));
        } else if (message.type === "error") {
          console.error("ClientChat error:", message);
        } else {
          console.log("ClientChat unknown message:", message);
        }
      } catch (err) {
        console.error("Error parsing ClientChat message", err);
      }
    };

    setSocket(ws);
    socketRef.current = ws;
  }, []);

  const markSeen = useCallback(() => {
    setUnreadCount(0);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && isAuthenticated) {
      socketRef.current.send(JSON.stringify({ action: "seen" }));
    }
  }, [isAuthenticated]);

  const sendMessage = useCallback((payload: MessagePayload) => {
    // Optimistic UI update
    if (payload.action === "send_message" && payload.text) {
      setMessages((prev) => [
        ...prev,
        {
          id: `opt-${Date.now()}`,
          sender: "client",
          sender_type: "client",
          text: payload.text,
          isOptimistic: true,
          created_at: new Date().toISOString(),
        },
      ]);
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && isAuthenticated) {
      const payloadString = JSON.stringify(payload);
      console.log("ClientChat sending message:", payloadString);
      try {
        socketRef.current.send(payloadString);
      } catch (err) {
        console.error("ClientChat send error:", err);
      }
    } else {
      console.warn("Socket is not open or not authenticated yet. Queuing message...");
      messageQueue.current.push(payload);
    }
  }, [isAuthenticated]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    setSocket(null);
    setIsAuthenticated(false);
    currentThreadId.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <ClientChatContext.Provider value={{ socket, isAuthenticated, messages, unreadCount, connect, sendMessage, markSeen, disconnect }}>
      {children}
    </ClientChatContext.Provider>
  );
};