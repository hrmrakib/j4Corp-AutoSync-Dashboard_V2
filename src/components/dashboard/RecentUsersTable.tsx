"use client";

// =============================================================================
// RecentUsersTable — Dashboard table showing recent users with search & actions
// =============================================================================

import { useState, useMemo } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { IconButton } from "@/components/ui/IconButton";
import { InfoIcon, MotorcycleIcon } from "@/components/ui/Icons";
import { useToast } from "@/context/ToastContext";
import { RegisteredUnitsModal } from "@/components/users/RegisteredUnitsModal";

/** Only show the first 6 users on the dashboard */
const RECENT_USERS_COUNT = 6;

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  dob: string | null;
  zip_code: string | null;
}

interface RecentUsersTableProps {
  users: User[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function RecentUsersTable({ users, searchQuery, onSearchChange }: RecentUsersTableProps) {
  const [showUnitsModal, setShowUnitsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { addToast } = useToast();

  const recentUsers = useMemo(() => {
    return users.slice(0, RECENT_USERS_COUNT);
  }, [users]);

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
            onChange={onSearchChange}
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
                    {searchQuery ? `No users found matching "${searchQuery}"` : "No recent users available"}
                  </td>
                </tr>
              ) : (
                recentUsers.map((user) => (
                  <tr
                    key={user.user_id}
                    className="border-t border-border-light transition-colors hover:bg-surface-hover"
                  >
                    <td className="px-4 sm:px-6 py-4 text-sm font-medium text-text-primary whitespace-nowrap">
                      {user.full_name || `${user.first_name} ${user.last_name}`}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                      {user.email || "-"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                      {user.phone || "-"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                      {user.address || "-"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                      {user.dob || "-"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                      {user.zip_code || "-"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <IconButton
                          label={`View info for ${user.full_name || user.first_name}`}
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUnitsModal(true);
                          }}
                        >
                          <InfoIcon className="h-4 w-4" />
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
        user={selectedUser}
        isOpen={showUnitsModal}
        onClose={() => {
          setShowUnitsModal(false);
          setSelectedUser(null);
        }}
      />
    </>
  );
}
