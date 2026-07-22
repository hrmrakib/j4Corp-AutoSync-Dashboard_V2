"use client";

// =============================================================================
// Sidebar — Dark navy sidebar with navigation items
// Desktop: Fixed 220px sidebar
// Mobile: Slide-in drawer with backdrop overlay
// =============================================================================

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { sidebarItems } from "@/data/mock-data";
import { iconMap, LogoutIcon, CloseIcon } from "@/components/ui/Icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEffect, useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { LogoutModal } from "@/components/layout/LogoutModal";
import toast from "react-hot-toast";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, close } = useSidebar();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const sidebarRef = useRef<HTMLElement>(null);

  const handleLogout = () => {
    // In a real app, clear tokens, auth state, etc.
    setIsLogoutModalOpen(false);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  // Close sidebar when clicking outside on mobile
  useClickOutside(sidebarRef, () => {
    if (!isDesktop && isOpen) {
      close();
    }
  });

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (!isDesktop) {
      close();
    }
  }, [pathname, isDesktop, close]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen && !isDesktop) {
      document.body.classList.add("body-scroll-lock");
    } else {
      document.body.classList.remove("body-scroll-lock");
    }
    return () => {
      document.body.classList.remove("body-scroll-lock");
    };
  }, [isOpen, isDesktop]);

  /**
   * Determines if a nav item is currently active.
   * Root "/" matches exactly; other paths match by prefix.
   */
  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && !isDesktop && (
        <div
          className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in lg:hidden'
          aria-hidden='true'
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 z-50 flex h-full w-[220px] flex-col bg-sidebar-bg
          transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          lg:sticky lg:translate-x-0
          ${isOpen || isDesktop ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label='Main navigation'
      >
        {/* Mobile close button */}
        <div className='flex items-center justify-end p-4 lg:hidden'>
          <button
            onClick={close}
            className='flex h-8 w-8 items-center justify-center rounded-full text-sidebar-text hover:text-white transition-colors'
            aria-label='Close menu'
          >
            <CloseIcon className='h-5 w-5' />
          </button>
        </div>

        {/* Logo / Brand area */}
        <div className='px-6 py-6 lg:pt-8'>
          <h1 className='text-xl font-bold text-white tracking-tight'>
            J4Crop
          </h1>
          <p className='text-xs text-sidebar-text mt-0.5'>AutoSync Dashboard</p>
        </div>

        {/* Navigation items */}
        <nav className='flex-1 px-4 space-y-1'>
          {sidebarItems.map((item) => {
            const Icon = iconMap[item.iconName];
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
                  transition-all duration-200
                  ${
                    active
                      ? "bg-sidebar-active-bg text-sidebar-active-text shadow-card"
                      : "text-sidebar-text hover:bg-white/5 hover:text-white"
                  }
                `}
                aria-current={active ? "page" : undefined}
              >
                {Icon && (
                  <Icon
                    className={`h-5 w-5 shrink-0 transition-colors ${
                      active
                        ? "text-primary"
                        : "text-sidebar-text group-hover:text-white"
                    }`}
                  />
                )}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className='px-4 pb-6'>
          <button
            className='flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-logout transition-all duration-200 hover:bg-red-500/10'
            onClick={() => setIsLogoutModalOpen(true)}
          >
            <LogoutIcon className='h-5 w-5 shrink-0' />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
