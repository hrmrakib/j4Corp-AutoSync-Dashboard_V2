"use client";

// =============================================================================
// RecentUsersTable — Dashboard table showing recent users with search & actions
// =============================================================================

import { useState, useMemo } from "react";
import { mockUsers } from "@/data/mock-data";
import { SearchInput } from "@/components/ui/SearchInput";
import { IconButton } from "@/components/ui/IconButton";
import { InfoIcon, MotorcycleIcon } from "@/components/ui/Icons";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/context/ToastContext";
import { RegisteredUnitsModal } from "@/components/users/RegisteredUnitsModal";

/** Only show the first 6 users on the dashboard */
const RECENT_USERS_COUNT = 6;

export function RecentUsersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUnitsModal, setShowUnitsModal] = useState(false);
  const debouncedSearch = useDebounce(searchQuery);
  const { addToast } = useToast();

  const recentUsers = useMemo(() => {
    const users = mockUsers.slice(0, RECENT_USERS_COUNT);
    if (!debouncedSearch) return users;

    const query = debouncedSearch.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.includes(query) ||
        user.address.toLowerCase().includes(query)
    );
  }, [debouncedSearch]);

  return (
    <>
      <div className="rounded-2xl bg-surface border border-border overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-5">
          <h3 className="text-base font-bold text-text-primary">
            Recent Users
          </h3>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search..."
            className="w-full sm:w-64"
          />
        </div>

        {/* Table — horizontal scroll on mobile */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-t border-border">
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Address
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Birthday
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Zip Code
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-text-muted"
                  >
                    No users found matching &ldquo;{debouncedSearch}&rdquo;
                  </td>
                </tr>
              ) : (
                recentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-border-light transition-colors hover:bg-surface-hover"
                  >
                    <td className="px-4 sm:px-6 py-4 text-sm font-medium text-text-primary whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                      {user.phone}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                      {user.address}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                      {user.birthday}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                      {user.zipCode}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <IconButton
                          label={`View info for ${user.name}`}
                          onClick={() =>
                            addToast(
                              `Viewing details for ${user.name}`,
                              "info"
                            )
                          }
                        >
                          <InfoIcon className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                          label={`View registered units for ${user.name}`}
                          onClick={() => setShowUnitsModal(true)}
                        >
                          <MotorcycleIcon className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registered Units Modal */}
      <RegisteredUnitsModal
        isOpen={showUnitsModal}
        onClose={() => setShowUnitsModal(false)}
      />
    </>
  );
}
