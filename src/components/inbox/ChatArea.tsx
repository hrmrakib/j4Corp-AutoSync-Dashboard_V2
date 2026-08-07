"use client";

// =============================================================================
// ChatArea — Right panel of the Inbox showing messages
// =============================================================================

import { useState, useRef, useEffect } from "react";
import { mockContacts, mockMessages } from "@/data/mock-data";
import { Avatar } from "@/components/ui/Avatar";
import { SearchIcon, PlusIcon } from "@/components/ui/Icons";
import { useSocket } from "@/provider/WebSocketProvider";
import { useCreateRoomMutation } from "@/redux/features/messages/messagesAPI";
import { useToast } from "@/context/ToastContext";

interface ChatAreaProps {
  contactId: string | null;
  className?: string;
  onBack?: () => void; // For mobile back button
}

export function ChatArea({ contactId, className = "", onBack }: ChatAreaProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socket, connect, disconnect } = useSocket();
  const [realMessages, setRealMessages] = useState<any[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [createRoom] = useCreateRoomMutation();
  const [roomId, setRoomId] = useState<string | number | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    if (contactId) {
      setRealMessages([]);
      createRoom({ other_user_id: Number(contactId) || contactId })
        .unwrap()
        .then((res) => {
          // The API response might have the room id in different formats depending on backend standard
          // Let's grab the id from standard possibilities
          const newRoomId = res.room_id || res.id || (res.data && (res.data.room_id || res.data.id)) || res;
          if (newRoomId) {
            setRoomId(newRoomId);
            connect(newRoomId);
          } else {
            console.error("No room ID returned from createRoom API:", res);
          }
        })
        .catch((err) => {
          console.error("Error creating room:", err);
          if (err?.data?.other_user_id) {
            addToast(`Error: ${err.data.other_user_id[0]}`, "error");
          }
        });
    } else {
      disconnect();
      setRoomId(null);
    }
  }, [contactId, connect, disconnect, createRoom, addToast]);

  // Handle incoming messages
  useEffect(() => {
    if (!socket) return;
    
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "message") {
          setRealMessages(prev => [...prev, data.message]);
        } else if (data.type === "typing") {
          // Can handle remote typing indicator here
        }
      } catch (e) {
        console.error("Error parsing websocket message", e);
      }
    };
    
    socket.addEventListener("message", handleMessage);
    
    // Mark read when opening chat
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: "mark_read" }));
    } else {
      socket.addEventListener("open", () => {
        socket.send(JSON.stringify({ action: "mark_read" }));
      }, { once: true });
    }

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, contactId]);

  // Handle sending message
  const handleSendMessage = () => {
    if (socket && message.trim() && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: "send", text: message }));
      setMessage("");
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      socket.send(JSON.stringify({ action: "typing", is_typing: false }));
    }
  };

  // Handle typing indicator
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (!typingTimeoutRef.current) {
        socket.send(JSON.stringify({ action: "typing", is_typing: true }));
      } else {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        socket.send(JSON.stringify({ action: "typing", is_typing: false }));
        typingTimeoutRef.current = null;
      }, 2000);
    }
  };

  // Scroll to bottom on load or new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [contactId, realMessages]);

  if (!contactId) {
    return (
      <div className={`flex flex-col items-center justify-center bg-surface h-full ${className}`}>
        <div className="text-center">
          <p className="text-lg font-semibold text-text-primary">Select a contact</p>
          <p className="text-sm text-text-muted mt-1">
            Choose a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  const contact = mockContacts.find((c) => c.id === contactId);
  const messages = mockMessages.filter((m) => m.contactId === contactId);

  if (!contact) return null;

  return (
    <div className={`flex flex-col bg-surface h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="relative">
            <Avatar src={contact.avatarUrl} alt={contact.name} size="sm" />
          </div>
          <h3 className="text-base font-semibold text-text-primary">{contact.name}</h3>
        </div>
        
        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-surface-secondary/30">
        <div className="text-center text-xs text-text-muted my-2">
          Today | 06:32 PM
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm ${
                  isUser
                    ? "bg-text-primary text-white rounded-br-sm"
                    : "bg-surface-secondary text-text-primary border border-border-light rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-text-muted mt-1.5 px-1">
                {msg.time}
              </span>
            </div>
          );
        })}
        {realMessages.map((msg, idx) => {
          // Assuming user is sender if we can't determine easily, or checking a local user id
          // For now let's just assume we need to distinguish or just render it
          // Often local messages might have a different structure or we match sender_id.
          // Let's assume if it has no sender_info it's ours, or we just render it as receiver if we can't tell.
          // In a real app we'd compare msg.sender_id with our own user_id.
          const isUser = false; // We can set this to false as fallback or fetch our own user id
          return (
            <div
              key={`real-${msg.id || idx}`}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm ${
                  isUser
                    ? "bg-text-primary text-white rounded-br-sm"
                    : "bg-surface-secondary text-text-primary border border-border-light rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-text-muted mt-1.5 px-1">
                {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-surface-secondary border border-border rounded-full px-4 py-2">
            <input
              type="text"
              value={message}
              onChange={handleTyping}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              placeholder="Type your message here ..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-text-primary placeholder:text-text-muted"
            />
            <button 
              onClick={handleSendMessage}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-colors ml-2"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
