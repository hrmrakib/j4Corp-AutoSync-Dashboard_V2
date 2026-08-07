"use client";

// =============================================================================
// UserDetailModal — Shows user details using the backend API
// =============================================================================

import { Modal } from "@/components/ui/Modal";

interface UserDetailModalProps {
  user: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailModal({
  user,
  isOpen,
  onClose,
}: UserDetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details">
      <div className="space-y-4">
        {!user ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-sm text-red-500">No user details available</p>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface-secondary p-4">
            <div className="mb-4 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary mb-2">
                {user.first_name?.[0] || user.full_name?.[0] || "?"}
              </div>
              <p className="text-lg font-medium text-text-primary">
                {user.full_name || `${user.first_name} ${user.last_name}`}
              </p>
            </div>
            <div className="space-y-2">
              <DetailRow label="ID" value={String(user.user_id)} />
              <DetailRow label="Email" value={user.email || "-"} />
              <DetailRow label="Phone" value={user.phone || "-"} />
              <DetailRow label="Address" value={user.address || "-"} />
              <DetailRow label="Date of Birth" value={user.dob || "-"} />
              <DetailRow label="Zip Code" value={user.zip_code || "-"} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

/** Helper component for displaying a label-value detail row */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm text-text-secondary">
      {label}:{" "}
      <span className="font-semibold text-text-primary">{value}</span>
    </p>
  );
}
