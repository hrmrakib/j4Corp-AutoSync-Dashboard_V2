"use client";

// =============================================================================
// Inbox Page — Responsive split view for chat
// =============================================================================

import { useState } from "react";
import { ChatSidebar } from "@/components/inbox/ChatSidebar";
import { ChatArea } from "@/components/inbox/ChatArea";

export default function InboxPage() {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  
  // Mobile: If a contact is selected, show only ChatArea. Otherwise, show Sidebar.
  // Desktop: Show both side-by-side.

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Sidebar - hidden on mobile if contact is selected */}
      <div className={`w-full md:w-80 shrink-0 ${selectedContactId ? 'hidden md:block' : 'block'}`}>
        <ChatSidebar
          selectedContactId={selectedContactId}
          onSelectContact={setSelectedContactId}
        />
      </div>

      {/* Chat Area - hidden on mobile if NO contact is selected */}
      <div className={`flex-1 ${!selectedContactId ? 'hidden md:block' : 'block'}`}>
        <ChatArea 
          contactId={selectedContactId} 
          onBack={() => setSelectedContactId(null)}
        />
      </div>
    </div>
  );
}
