// =============================================================================
// IconButton — Circular icon button with hover/active states
// Used for table action buttons (info, motorcycle icons)
// =============================================================================

interface IconButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  label: string;
  variant?: "default" | "ghost";
  className?: string;
}

export function IconButton({
  onClick,
  children,
  label,
  variant = "default",
  className = "",
}: IconButtonProps) {
  const baseClasses =
    "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30";

  const variantClasses = {
    default:
      "border border-border text-text-secondary hover:bg-surface-secondary hover:text-text-primary hover:border-primary/30",
    ghost:
      "text-text-muted hover:bg-surface-secondary hover:text-text-primary",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={label}
      type="button"
    >
      {children}
    </button>
  );
}
