"use client";

// =============================================================================
// ChatSidebar — Left panel of the Inbox showing contacts
// =============================================================================

import { useState } from "react";
import { mockContacts } from "@/data/mock-data";
import { SearchInput } from "@/components/ui/SearchInput";
import { Avatar } from "@/components/ui/Avatar";
import { useDebounce } from "@/hooks/useDebounce";

interface ChatSidebarProps {
  onSelectContact: (id: string) => void;
  selectedContactId: string | null;
  className?: string;
}

export function ChatSidebar({
  onSelectContact,
  selectedContactId,
  className = "",
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery);

  const filteredContacts = mockContacts.filter((c) =>
    c.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className={`flex flex-col bg-surface border-r border-border h-full ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-base font-bold text-text-primary mb-4">All Messages</h3>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search..."
          className="w-full bg-surface-secondary"
        />
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="p-4 text-center text-sm text-text-muted">
            No contacts found
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onSelectContact(contact.id)}
              className={`flex w-full items-start gap-3 p-4 text-left transition-colors border-b border-border-light last:border-b-0 ${
                selectedContactId === contact.id
                  ? "bg-surface-active"
                  : "hover:bg-surface-hover"
              }`}
            >
              {/* Avatar & Online status */}
              <div className="relative shrink-0">
                <Avatar src={contact.avatarUrl} alt={contact.name} size="md" />
                {contact.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-surface bg-green-500" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">
                  {contact.name}
                </p>
                <p className="mt-1 text-xs text-text-secondary line-clamp-2">
                  {contact.lastMessage}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-text-muted">
                  <span>⏰</span>
                  <span>{contact.lastMessageTime}</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
