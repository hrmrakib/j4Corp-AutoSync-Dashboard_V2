"use client";

// =============================================================================
// NotificationDropdown — Floating notification panel
// Anchored to the bell icon in TopHeader
// =============================================================================

import { mockNotifications } from "@/data/mock-data";
import { WarningIcon } from "@/components/ui/Icons";

interface NotificationDropdownProps {
  onClose: () => void;
}

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  return (
    <div
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-border bg-surface shadow-dropdown animate-slide-in-down"
      role="menu"
      aria-label="Notifications"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-base font-semibold text-text-primary">
          Notifications
        </h3>
      </div>

      {/* Notification list */}
      <div className="max-h-80 overflow-y-auto">
        {mockNotifications.map((notification) => (
          <button
            key={notification.id}
            onClick={onClose}
            className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-surface-secondary border-b border-border-light last:border-b-0"
          >
            {/* Icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 mt-0.5">
              <WarningIcon className="h-5 w-5 text-red-500" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-text-primary leading-tight">
                  {notification.title}
                </p>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs text-text-muted whitespace-nowrap">
                    {notification.time}
                  </span>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                  )}
                </div>
              </div>
              <p className="mt-1 text-xs text-text-secondary leading-relaxed line-clamp-3">
                {notification.message}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-border px-5 py-3">
        <button
          onClick={onClose}
          className="w-full text-center text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          View all notifications
        </button>
      </div>
    </div>
  );
}
