// =============================================================================
// Badge — Notification count badge (blue dot with number)
// =============================================================================

interface BadgeProps {
  count: number;
  className?: string;
}

/**
 * Renders a small badge with a count. Commonly used on notification bells.
 * Hides when count is 0. Shows "9+" for counts above 9.
 */
export function Badge({ count, className = "" }: BadgeProps) {
  if (count <= 0) return null;

  const displayCount = count > 9 ? "9+" : count.toString();

  return (
    <span
      className={`absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white ${className}`}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
}
