// =============================================================================
// Skeleton — Loading placeholder with pulse animation
// =============================================================================

interface SkeletonProps {
  className?: string;
}

/** Generic skeleton block that animates with a pulse effect */
export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-skeleton rounded-lg bg-gray-200 ${className}`}
      aria-hidden="true"
    />
  );
}

/** Pre-built skeleton for a stats card */
export function StatsCardSkeleton() {
  return (
    <div className="rounded-2xl bg-surface p-6 border border-border">
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-8 w-16" />
    </div>
  );
}

/** Pre-built skeleton for a table row */
export function TableRowSkeleton() {
  return (
    <tr className="border-b border-border-light">
      <td className="py-4 px-4"><Skeleton className="h-4 w-32" /></td>
      <td className="py-4 px-4"><Skeleton className="h-4 w-40" /></td>
      <td className="py-4 px-4"><Skeleton className="h-4 w-28" /></td>
      <td className="py-4 px-4"><Skeleton className="h-4 w-36" /></td>
      <td className="py-4 px-4"><Skeleton className="h-4 w-16" /></td>
      <td className="py-4 px-4"><Skeleton className="h-4 w-12" /></td>
      <td className="py-4 px-4">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </td>
    </tr>
  );
}

/** Pre-built skeleton for the chart area */
export function ChartSkeleton() {
  return (
    <div className="rounded-2xl bg-surface p-6 border border-border">
      <div className="flex gap-4 mb-6">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-24" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
