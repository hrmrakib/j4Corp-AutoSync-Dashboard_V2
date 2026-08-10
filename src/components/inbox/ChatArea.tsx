"use client";

// =============================================================================
// ChatArea — Right panel of the Inbox showing messages
// =============================================================================

import { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { SearchIcon } from "@/components/ui/Icons";
import { useClientChat } from "@/provider/WebSocketProvider";
import { useCreateRoomMutation, useGetChatRoomsQuery } from "@/redux/features/messages/messagesAPI";
import { useToast } from "@/context/ToastContext";

interface ChatAreaProps {
  contactId: string | null;
  className?: string;
  onBack?: () => void;
}

export function ChatArea({ contactId, className = "", onBack }: ChatAreaProps) {
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use the new useClientChat hook
  const { isAuthenticated, messages, connect, disconnect, sendMessage, markSeen } = useClientChat();
  
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [createRoom] = useCreateRoomMutation();
  const { addToast } = useToast();
  const { data: roomsData, isLoading: isRoomsLoading } = useGetChatRoomsQuery(undefined);

  const activeContactIdRef = useRef<string | null>(null);
  const connectedRoomIdRef = useRef<string | number | null>(null);

  // 1. When contactId changes → connect WebSocket (create room if needed)
  useEffect(() => {
    if (!contactId) {
      activeContactIdRef.current = null;
      connectedRoomIdRef.current = null;
      disconnect();
      return;
    }

    if (activeContactIdRef.current !== contactId) {
      activeContactIdRef.current = contactId;
      connectedRoomIdRef.current = null;
    }

    if (isRoomsLoading) {
      return;
    }

    setConnectionError(null);

    const rooms = roomsData?.results || roomsData?.data || (Array.isArray(roomsData) ? roomsData : []);
    const existingRoom = rooms.find(
      (r: any) => r.other_user?.user_id?.toString() === contactId || r.id?.toString() === contactId
    );

    if (existingRoom && existingRoom.id) {
      if (connectedRoomIdRef.current !== existingRoom.id) {
        console.log("[ChatArea] Found existing room ID:", existingRoom.id);
        connectedRoomIdRef.current = existingRoom.id;
        connect(existingRoom.id);
      }
      return;
    }

    const requestedContactId = contactId;
    const createRoomPromise = createRoom({ other_user_id: Number(contactId) || contactId });

    createRoomPromise
      .unwrap()
      .then((res) => {
        if (activeContactIdRef.current !== requestedContactId) return; // stale, ignore
        const newRoomId =
          res.room?.id || res.room_id || res.id ||
          (res.data && (res.data.room_id || res.data.id));
        if (newRoomId && typeof newRoomId !== "object") {
          if (connectedRoomIdRef.current !== newRoomId) {
            connectedRoomIdRef.current = newRoomId;
            connect(newRoomId);
          }
        } else {
          console.error("[ChatArea] No room ID in response");
        }
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        console.error("[ChatArea] createRoom error:", err);
        setConnectionError("Failed to create chat room: " + (err?.data?.message || err?.data?.other_user_id?.[0] || "Unknown API error"));
      });

    return () => {
      createRoomPromise.abort();
    };
  }, [contactId, roomsData, isRoomsLoading, connect, disconnect, createRoom]);

  // 2. Mark messages as seen when they load or when we authenticate
  useEffect(() => {
    if (isAuthenticated) {
      markSeen();
    }
  }, [isAuthenticated, messages.length, markSeen]);

  // 3. Send message
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!messageText.trim()) return;

    if (!isAuthenticated) {
      addToast("Not connected to chat. Please wait...", "error");
      return;
    }

    const msgText = messageText.trim();
    console.log("[ChatArea] Sending:", msgText);
    
    // The Provider's sendMessage will handle optimistic updates automatically
    sendMessage({ action: "send_message", text: msgText });

    setMessageText("");
  };

  // 4. Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 5. Resolve contact info from rooms API
  const rooms = roomsData?.results || roomsData?.data || (Array.isArray(roomsData) ? roomsData : []);

  const room = rooms.find(
    (r: any) =>
      r.other_user?.user_id?.toString() === contactId ||
      r.id?.toString() === contactId
  );

  const contactName = room?.other_user?.first_name
    ? `${room.other_user.first_name} ${room.other_user.last_name || ""}`.trim()
    : room?.other_user?.email || `User ${contactId}`;

  const contactAvatar =
    room?.other_user?.profile_pic || room?.other_user?.profile_picture || "";

  // ─── RENDER ────────────────────────────────────────────────────────

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
            <Avatar src={contactAvatar} alt={contactName} size="sm" />
          </div>
          <h3 className="text-base font-semibold text-text-primary">{contactName}</h3>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-surface-secondary/30">
        {connectionError && (
          <div className="text-center py-8">
            <p className="text-sm font-medium text-red-500 mb-2">Connection Failed</p>
            <p className="text-xs text-text-muted">{connectionError}</p>
            <button 
              onClick={() => {
                setConnectionError(null);
                connectedRoomIdRef.current = null;
                activeContactIdRef.current = null;
              }}
              className="mt-4 px-4 py-2 bg-surface border border-border rounded-lg text-sm hover:bg-surface-hover transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!isAuthenticated && !connectionError && messages.length === 0 && (
          <div className="text-center text-sm text-text-muted py-8">
            Connecting to chat...
          </div>
        )}

        {isAuthenticated && !connectionError && messages.length === 0 && (
          <div className="text-center text-sm text-text-muted py-8">
            No messages yet. Start the conversation!
          </div>
        )}

        {messages.map((msg, idx) => {
          const isMe = msg.sender_type === "client" || msg.sender === "client" || msg.isOptimistic;
          return (
            <div
              key={msg.id || `msg-${idx}`}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm ${
                  isMe
                    ? "bg-text-primary text-white rounded-br-sm"
                    : "bg-surface-secondary text-text-primary border border-border-light rounded-bl-sm"
                }`}
              >
                {msg.text || msg.content}
              </div>
              <span className="text-[10px] text-text-muted mt-1.5 px-1">
                {msg.created_at
                  ? new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-surface">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-surface-secondary border border-border rounded-full px-4 py-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message here ..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-text-primary placeholder:text-text-muted"
            />
            <button
              type="submit"
              disabled={!messageText.trim() || !isAuthenticated}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-colors ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}