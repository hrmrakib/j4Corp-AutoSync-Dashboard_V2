"use client";

// =============================================================================
// Settings Page — Manages state for different setting views
// =============================================================================

import { useState } from "react";
import { SettingsMenu } from "@/components/settings/SettingsMenu";
import { PersonalInfoView } from "@/components/settings/PersonalInfoView";
import { ChangePasswordModal } from "@/components/settings/ChangePasswordModal";
import { ContentEditorView } from "@/components/settings/ContentEditorView";

const LOREM_CONTENT = `Lorem ipsum dolor sit amet consectetur. Eget ac turpis auctor pulvinar libero ipsum tortor. Purus nulla ultricies pellentesque at erat pretium ultricies quam. Id parturient eu neque sit faucibus urna ut. Non proin pulvinar neque nunc est est tristique sit in. Nisi diam ut volutpat tortor. At id sed sed a habitant. Pharetra odio fusce felis purus velit sit at adipiscing. Mattis eget orci eu feugiat varius. Nunc proin hac egestas ultrices rutrum. Molestie nunc cras convallis tincidunt id commodo est dui. Et id morbi vitae vel scelerisque sit nulla.

A non euismod duis enim sit. Vulputate volutpat suspendisse mauris at sollicitudin nulla. Id est auctor vel eget augue massa eu tempor. Mi senectus sollicitudin proin dolor dictum faucibus. Mi ullamcorper ut elementum netus duis facilisi sit iaculis. Lacus sit enim donec bibendum vulputate metus nisi tristique. Sed viverra sed scelerisque amet dolor facilisi. Nam dictumst sed massa imperdiet amet egestas enim tellus. Cursus a fames hendrerit amet interdum.

Vitae morbi tortor purus gravida. Massa quam amet lorem netus facilisi risus pulvinar quis. Feugiat diam enim dolor sit dolor egestas aliquam. Tristique euismod maecenas nunc amet. Integer suscipit quis aliquam ligula pharetra. Nunc non enim iaculis dictum et quam eget justo. Ridiculus pellentesque volutpat vulputate scelerisque. Amet convallis sit morbi viverra aliquet tempor sit commodo sit. Euismod volutpat quis egestas nulla amet dui maecenas nulla.`;

export default function SettingsPage() {
  const [activeView, setActiveView] = useState<"menu" | "personal-info" | "privacy" | "terms" | "about">("menu");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const navigateTo = (view: string) => {
    setActiveView(view as any);
  };

  return (
    <div className="flex justify-center p-2 sm:p-6">
      {activeView === "menu" && (
        <SettingsMenu 
          onNavigate={navigateTo} 
          onOpenChangePassword={() => setIsPasswordModalOpen(true)}
        />
      )}

      {activeView === "personal-info" && (
        <PersonalInfoView onBack={() => setActiveView("menu")} />
      )}

      {activeView === "privacy" && (
        <ContentEditorView title="Privacy Policy" initialContent={LOREM_CONTENT} onBack={() => setActiveView("menu")} />
      )}

      {activeView === "terms" && (
        <ContentEditorView title="Terms & Condition" initialContent={LOREM_CONTENT} onBack={() => setActiveView("menu")} />
      )}

      {activeView === "about" && (
        <ContentEditorView title="About Us" initialContent={LOREM_CONTENT} onBack={() => setActiveView("menu")} />
      )}

      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
    </div>
  );
}
