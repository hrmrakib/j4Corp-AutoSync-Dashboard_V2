"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { ToastMessage, ToastVariant } from "@/types";

// =============================================================================
// Toast Context — Global toast notification system
// =============================================================================

interface ToastContextValue {
  toasts: ToastMessage[];
  addToast: (message: string, variant?: ToastVariant) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/** Auto-dismiss delay in milliseconds */
const TOAST_DURATION = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const toast: ToastMessage = { id, message, variant };

      setToasts((prev) => [...prev, toast]);

      // Auto-dismiss after TOAST_DURATION
      setTimeout(() => {
        removeToast(id);
      }, TOAST_DURATION);
    },
    [removeToast]
  );

  return (
    <ToastContext value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext>
  );
}

/**
 * Hook to access the toast notification system.
 * Must be used within a ToastProvider.
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
