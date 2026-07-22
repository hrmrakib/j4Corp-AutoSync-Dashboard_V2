"use client";

import { Modal } from "@/components/ui/Modal";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Logout">
      <div className="flex flex-col space-y-4">
        <p className="text-sm text-text-secondary leading-relaxed">
          Are you sure you want to log out? You will need to enter your credentials to access the dashboard again.
        </p>
        
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-xl bg-red-600 text-sm font-medium text-white hover:bg-red-700 transition-colors shadow-sm"
          >
            Log Out
          </button>
        </div>
      </div>
    </Modal>
  );
}
