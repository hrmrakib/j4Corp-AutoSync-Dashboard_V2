"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/ui/SearchInput";
import { IconButton } from "@/components/ui/IconButton";
import { InfoIcon, MotorcycleIcon } from "@/components/ui/Icons";
import { useDebounce } from "@/hooks/useDebounce";
import { RegisteredUnitsModal } from "@/components/users/RegisteredUnitsModal";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { useGetAllUsersQuery } from "@/redux/features/user/userAPI";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

export function UsersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showUnitsModal, setShowUnitsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  const router = useRouter();
  const debouncedSearch = useDebounce(searchQuery);

  // When search changes, reset page to 1
  useMemo(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const { data, isLoading } = useGetAllUsersQuery({ 
    page: currentPage, 
    search: debouncedSearch 
  });

  const usersList = data?.data?.users || [];
  const meta = data?.data?.meta?.pagination;
  const totalPages = meta?.total_pages || 1;

  return (
    <>
      <div className='rounded-2xl bg-surface border border-border overflow-hidden'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-5'>
          <h3 className='text-lg font-bold text-text-primary'>Users</h3>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder='Search...'
            className='w-full sm:w-64'
          />
        </div>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[700px]'>
            <thead>
              <tr className='border-t border-border'>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider'>
                  Email
                </th>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider'>
                  Phone
                </th>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider'>
                  Address
                </th>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider'>
                  Birthday
                </th>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider'>
                  Zip Code
                </th>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className='px-6 py-12 text-center text-sm text-text-muted'>
                    Loading users...
                  </td>
                </tr>
              ) : usersList.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className='px-6 py-12 text-center text-sm text-text-muted'
                  >
                    No users found matching &ldquo;{debouncedSearch}&rdquo;
                  </td>
                </tr>
              ) : (
                usersList.map((user: any) => (
                  <tr
                    key={user.user_id}
                    className='border-t border-border-light transition-colors hover:bg-surface-hover'
                  >
                    <td className='px-4 sm:px-6 py-4 text-sm font-medium text-text-primary whitespace-nowrap'>
                      {user.full_name || `${user.first_name} ${user.last_name}`}
                    </td>
                    <td className='px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap'>
                      {user.email || "-"}
                    </td>
                    <td className='px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap'>
                      {user.phone || "-"}
                    </td>
                    <td className='px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap'>
                      {user.address || "-"}
                    </td>
                    <td className='px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap'>
                      {user.dob || "-"}
                    </td>
                    <td className='px-4 sm:px-6 py-4 text-sm text-text-secondary whitespace-nowrap'>
                      {user.zip_code || "-"}
                    </td>
                    <td className='px-4 sm:px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <IconButton
                          label={`View info for ${user.full_name || user.first_name}`}
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDetailModal(true);
                          }}
                        >
                          <InfoIcon className='h-4 w-4' />
                        </IconButton>
                        <IconButton
                          label={`Message ${user.full_name || user.first_name}`}
                          onClick={() => router.push('/inbox')}
                        >
                          <MessageCircle className='h-4 w-4' />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with pagination */}
        <div className='flex items-center justify-between border-t border-border px-4 sm:px-6 py-3'>
          <p className='text-xs text-text-muted'>
            Showing {usersList.length} users {meta?.total_items ? `of ${meta.total_items} total` : ''}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center p-1.5 rounded-lg border border-border text-text-secondary hover:bg-surface-hover hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-text-muted">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage >= totalPages}
              className="flex items-center justify-center p-1.5 rounded-lg border border-border text-text-secondary hover:bg-surface-hover hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <UserDetailModal
        user={selectedUser}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedUser(null);
        }}
      />

      {/* Registered Units Modal */}
      <RegisteredUnitsModal
        isOpen={showUnitsModal}
        onClose={() => setShowUnitsModal(false)}
      />
    </>
  );
}
