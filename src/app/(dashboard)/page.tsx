// =============================================================================
// Dashboard Home Page — Stats, Chart, and Recent Users table
// =============================================================================

import { StatsCards } from "@/components/dashboard/StatsCards";
import { ChartSection } from "@/components/dashboard/ChartSection";
import { RecentUsersTable } from "@/components/dashboard/RecentUsersTable";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards />

      {/* Line Chart */}
      <ChartSection />

      {/* Recent Users Table */}
      <RecentUsersTable />
    </div>
  );
}
