"use client";


import { useState } from "react";
import { ChatSidebar } from "@/components/inbox/ChatSidebar";
import { ChatArea } from "@/components/inbox/ChatArea";
import { WebSocketProvider } from "@/provider/WebSocketProvider";

export default function InboxPage() {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  return (
    <WebSocketProvider>
      <div className="flex h-[calc(100vh-8rem)] rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className={`w-full md:w-80 shrink-0 ${selectedContactId ? 'hidden md:block' : 'block'}`}>
          <ChatSidebar
            selectedContactId={selectedContactId}
            onSelectContact={setSelectedContactId}
          />
        </div>

        <div className={`flex-1 ${!selectedContactId ? 'hidden md:block' : 'block'}`}>
          <ChatArea 
            contactId={selectedContactId} 
            onBack={() => setSelectedContactId(null)}
          />
        </div>
      </div>
    </WebSocketProvider>
  );
}
