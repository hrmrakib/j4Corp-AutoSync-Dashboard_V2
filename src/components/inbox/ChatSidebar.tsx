"use client";

// =============================================================================
// ChatSidebar — Left panel of the Inbox showing contacts
// =============================================================================

import { useState, useMemo } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { Avatar } from "@/components/ui/Avatar";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetChatRoomsQuery } from "@/redux/features/messages/messagesAPI";

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
  const { data: roomsData, isLoading } = useGetChatRoomsQuery(debouncedSearch || undefined);

  const rooms = Array.isArray(roomsData) ? roomsData : (roomsData?.data || roomsData?.results || []);

  const filteredContacts = useMemo(() => {
    return rooms; // API handles search filtering now
  }, [rooms]);

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
        {isLoading ? (
          <div className="p-4 text-center text-sm text-text-muted">Loading...</div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-4 text-center text-sm text-text-muted">
            No contacts found
          </div>
        ) : (
          filteredContacts.map((contact: any) => {
            const otherUser = contact.other_user || {};
            const contactId = (otherUser.user_id || contact.other_user_id || contact.id)?.toString();
            const contactName = otherUser.first_name 
              ? `${otherUser.first_name} ${otherUser.last_name || ""}` 
              : (otherUser.email || `User ${contact.other_user_id || contactId}`);
            const avatarUrl = otherUser.profile_pic || otherUser.profile_picture || "";
            const isOnline = false; // We don't have online status from this API
            const lastMessageText = contact.last_message?.text || contact.last_message || "No messages yet";
            const lastMessageTime = contact.last_message?.created_at 
              ? new Date(contact.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
              : (contact.updated_at ? new Date(contact.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "");

            return (
              <button
                key={contact.id?.toString()}
                onClick={() => onSelectContact(contactId)}
                className={`flex w-full items-start gap-3 p-4 text-left transition-colors border-b border-border-light last:border-b-0 ${
                  selectedContactId === contactId
                    ? "bg-surface-active"
                    : "hover:bg-surface-hover"
                }`}
              >
                {/* Avatar & Online status */}
                <div className="relative shrink-0">
                  <Avatar src={avatarUrl} alt={contactName} size="md" />
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-surface bg-green-500" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">
                    {contactName}
                  </p>
                  <p className="mt-1 text-xs text-text-secondary line-clamp-2">
                    {lastMessageText}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-text-muted">
                    <span>⏰</span>
                    <span>{lastMessageTime}</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
