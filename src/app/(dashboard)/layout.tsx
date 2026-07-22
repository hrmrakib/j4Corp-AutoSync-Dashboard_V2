// =============================================================================
// Dashboard Group Layout — Wraps all dashboard pages with Sidebar + TopHeader
// Using a route group (dashboard) so the URL path is not affected
// =============================================================================

import { DashboardShell } from "@/components/layout/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
