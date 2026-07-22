// =============================================================================
// DashboardShell — Combines Sidebar + TopHeader + main content area
// =============================================================================

import { Sidebar } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar — fixed on desktop, drawer on mobile */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
