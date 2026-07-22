// =============================================================================
// StatsCards — Row of 3 stat cards on the dashboard
// =============================================================================

import { mockStats } from "@/data/mock-data";

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {mockStats.map((stat) => (
        <div
          key={stat.id}
          className="group relative overflow-hidden rounded-2xl bg-surface border border-border p-6 transition-all duration-300 hover:shadow-card hover:border-primary/20"
        >
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 to-primary/20 opacity-0 transition-opacity group-hover:opacity-100" />

          <p className="text-sm font-medium text-text-secondary">
            {stat.title}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-text-primary">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
