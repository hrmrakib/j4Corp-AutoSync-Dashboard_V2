"use client";

import { ChevronRightIcon } from "@/components/ui/Icons";

interface SettingsMenuProps {
  onNavigate: (view: string) => void;
  onOpenChangePassword: () => void;
}

export function SettingsMenu({ onNavigate, onOpenChangePassword }: SettingsMenuProps) {
  const menuItems = [
    { id: "personal-info", label: "Personal Information", action: () => onNavigate("personal-info") },
    { id: "change-password", label: "Change Password", action: onOpenChangePassword },
    { id: "privacy", label: "Privacy & Policy", action: () => onNavigate("privacy") },
    { id: "terms", label: "Terms & Condition", action: () => onNavigate("terms") },
    { id: "about", label: "About Us", action: () => onNavigate("about") },
  ];

  return (
    <div className="w-full max-w-4xl bg-surface-secondary/30 rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-bold text-primary">Setting</h2>
      </div>
      
      <div className="flex flex-col">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex items-center justify-between p-6 text-left transition-colors hover:bg-white hover:shadow-sm ${
              index !== menuItems.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <span className="text-sm font-medium text-text-secondary">{item.label}</span>
            <ChevronRightIcon className="h-5 w-5 text-blue-600" />
          </button>
        ))}
      </div>
    </div>
  );
}
