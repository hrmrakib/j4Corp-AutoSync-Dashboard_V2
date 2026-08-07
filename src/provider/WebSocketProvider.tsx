"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

interface SocketContextType {
  socket: WebSocket | null;
  connect: (conversationId: string | number) => void;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connect: () => {},
  disconnect: () => {},
});

export const useSocket = () => useContext(SocketContext);

const BASE_WS_URL = process.env.NEXT_PUBLIC_WEB_SOCKET_URL;

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const currentConversationId = useRef<string | number | null>(null);

  // Cleanly disconnect active socket
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    currentConversationId.current = null;
    setSocket(null);
  }, []);

  const connect = useCallback(
    (conversationId: string | number) => {
      // Prevent reconnecting to the same conversation if socket is active
      if (
        currentConversationId.current === conversationId &&
        socketRef.current?.readyState === WebSocket.OPEN
      ) {
        return;
      }

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : null;

      if (!token) {
        console.warn("WebSocket connection aborted: No access_token found.");
        return;
      }

      // Close previous connection cleanly
      if (socketRef.current) {
        socketRef.current.close();
      }

      currentConversationId.current = conversationId;

      // Properly construct the WebSocket URL dynamically
      const wsUrl = `${BASE_WS_URL}/ws/chat/${conversationId}/?token=${token}`;
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log(`WebSocket connected to room: ${conversationId}`);
        setSocket(ws);
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        if (socketRef.current === ws) {
          socketRef.current = null;
          currentConversationId.current = null;
          setSocket(null);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onmessage = (event) => {
        console.log("WebSocket message:", event.data);
      };
    },
    [disconnect],
  );

  // Clean up socket connection on provider unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connect, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
};
