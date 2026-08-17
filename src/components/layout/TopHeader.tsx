"use client";

// =============================================================================
// TopHeader — Welcome greeting, notification bell, and user profile
// =============================================================================

import { useState, useRef, useCallback } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { BellIcon, MenuIcon, ChevronDownIcon } from "@/components/ui/Icons";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import { useClickOutside } from "@/hooks/useClickOutside";
import { mockNotifications } from "@/data/mock-data";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/redux/features/setting/settingAPI";

export function TopHeader() {
  const router = useRouter();
  const { toggle } = useSidebar();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { data: profileData, isLoading } = useGetProfileQuery({});

  const profile = profileData?.data;

  const unreadCount = mockNotifications.filter((n) => !n.read).length;
  const { user } = useAuth();

  const closeNotifications = useCallback(() => {
    setShowNotifications(false);
  }, []);

  useClickOutside(notificationRef, closeNotifications);

  return (
    <header className='sticky top-0 z-30 flex items-center justify-between bg-surface-secondary/80 backdrop-blur-md px-4 py-4 lg:px-8'>
      {/* Left: Hamburger (mobile) + Welcome text */}
      <div className='flex items-center gap-3'>
        <button
          onClick={toggle}
          className='flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary hover:bg-white hover:text-text-primary transition-colors lg:hidden'
          aria-label='Toggle navigation menu'
        >
          <MenuIcon className='h-6 w-6' />
        </button>

        <div>
          <h2 className='text-lg font-bold text-text-primary sm:text-xl'>
            Welcome, {user?.full_name}
          </h2>
          <p className='text-xs text-text-muted sm:text-sm'>Have a nice day</p>
        </div>
      </div>

      {/* Right: Notification bell + User profile */}
      <div className='flex items-center gap-2 sm:gap-4'>
        {/* Notification bell */}
        <div ref={notificationRef} className='relative'>
          {/* <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className='relative flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-white hover:text-primary'
            aria-label='View notifications'
            aria-expanded={showNotifications}
          >
            <BellIcon className='h-5 w-5' />
            <Badge count={unreadCount} />
          </button> */}

          {/* Notification dropdown */}
          {showNotifications && (
            <NotificationDropdown onClose={closeNotifications} />
          )}
        </div>

        {/* User profile */}
        <div
          onClick={() => router.push("/setting")}
          className='flex items-center gap-2 cursor-pointer rounded-xl px-2 py-1.5 transition-colors hover:bg-white'
        >
          <Avatar
            src={
              profile?.profile_pic || profile?.profile_pic_url || "/admin.jpg"
            }
            alt={user?.full_name! || "Admin"}
            size='md'
          />
          <span className='hidden text-sm font-semibold text-text-primary sm:block'>
            {user?.full_name}
          </span>
          <ChevronDownIcon className='hidden h-4 w-4 text-text-muted sm:block' />
        </div>
      </div>
    </header>
  );
}
