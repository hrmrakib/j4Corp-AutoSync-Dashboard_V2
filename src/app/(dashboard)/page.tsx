"use client";

// =============================================================================
// Dashboard Home Page — Stats, Chart, and Recent Users table
// =============================================================================

import { useState } from "react";
import { useGetOverviewQuery } from "@/redux/features/overview/overviewAPI";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentUsersTable } from "@/components/dashboard/RecentUsersTable";
import { useDebounce } from "@/hooks/useDebounce";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery);

  const { data: response, isLoading } = useGetOverviewQuery({ search: debouncedSearch });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-text-muted">Loading dashboard...</div>
      </div>
    );
  }

  const data = response?.data;

  // If no data object at all, render nothing or a fallback message
  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-text-muted">No dashboard data available.</div>
      </div>
    );
  }

  const hasStats =
    data.total_users > 0 ||
    data.appointments_today > 0 ||
    data.sales_today > 0;

  const hasUsers = data.users && data.users.length > 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {hasStats && (
        <StatsCards
          totalUsers={data.total_users}
          appointmentsToday={data.appointments_today}
          salesToday={data.sales_today}
        />
      )}

      {/* Recent Users Table */}
      {data.users && (
        <RecentUsersTable 
          users={data.users} 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}
    </div>
  );
}
