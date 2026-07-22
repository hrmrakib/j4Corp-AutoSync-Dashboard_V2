"use client";

// =============================================================================
// ChatArea — Right panel of the Inbox showing messages
// =============================================================================

import { useState, useRef, useEffect } from "react";
import { mockContacts, mockMessages } from "@/data/mock-data";
import { Avatar } from "@/components/ui/Avatar";
import { SearchIcon, PlusIcon, SendIcon } from "@/components/ui/Icons";

interface ChatAreaProps {
  contactId: string | null;
  className?: string;
  onBack?: () => void; // For mobile back button
}

export function ChatArea({ contactId, className = "", onBack }: ChatAreaProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on load
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [contactId]);

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
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-surface-secondary border border-border rounded-full px-4 py-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here ..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-text-primary placeholder:text-text-muted"
            />
            <button className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-colors ml-2">
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
