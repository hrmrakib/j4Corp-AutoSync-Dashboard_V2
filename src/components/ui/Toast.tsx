"use client";

// =============================================================================
// Toast — Toast notification display component
// Renders all active toasts from ToastContext
// =============================================================================

import { useToast } from "@/context/ToastContext";
import {
  CheckCircleIcon,
  CloseIcon,
  InfoIcon,
  WarningIcon,
} from "@/components/ui/Icons";
import type { ToastVariant } from "@/types";

/** Maps variant to icon, bg color, and border color */
const variantStyles: Record<
  ToastVariant,
  { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; bg: string; border: string; iconColor: string }
> = {
  success: {
    icon: CheckCircleIcon,
    bg: "bg-green-50",
    border: "border-green-200",
    iconColor: "text-green-600",
  },
  error: {
    icon: WarningIcon,
    bg: "bg-red-50",
    border: "border-red-200",
    iconColor: "text-red-600",
  },
  warning: {
    icon: WarningIcon,
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-amber-600",
  },
  info: {
    icon: InfoIcon,
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-600",
  },
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 max-w-sm" aria-live="polite">
      {toasts.map((toast) => {
        const styles = variantStyles[toast.variant];
        const Icon = styles.icon;

        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 rounded-xl border ${styles.border} ${styles.bg} px-4 py-3 shadow-dropdown animate-toast-in`}
            role="alert"
          >
            <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${styles.iconColor}`} />
            <p className="flex-1 text-sm font-medium text-text-primary">
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Dismiss notification"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
