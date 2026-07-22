"use client";

// =============================================================================
// Modal — Overlay modal with backdrop blur and animations
// =============================================================================

import { useEffect, useRef } from "react";
import { CloseIcon } from "@/components/ui/Icons";
import { useClickOutside } from "@/hooks/useClickOutside";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Max width class (default: max-w-lg) */
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("body-scroll-lock");
    } else {
      document.body.classList.remove("body-scroll-lock");
    }
    return () => {
      document.body.classList.remove("body-scroll-lock");
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidth} max-h-[85vh] overflow-y-auto rounded-2xl bg-surface shadow-modal animate-slide-in-up`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-surface px-6 py-4 border-b border-border">
          <h2 id="modal-title" className="text-lg font-semibold text-text-primary">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-gray-100 hover:text-text-primary"
            aria-label="Close modal"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
