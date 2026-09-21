"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Images,
  Users,
  Sparkles,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";

interface AdminSidebarProps {
  session: any;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function AdminSidebar({
  session,
  isCollapsed,
  toggleSidebar,
  isMobileOpen,
  setIsMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  // Hide sidebar on login page
  if (pathname === "/admin/login") {
    return null;
  }

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Services",
      href: "/admin/services",
      icon: Sparkles,
    },
    {
      label: "Leads & Bookings",
      href: "/admin/appointments",
      icon: Users,
    },
    {
      label: "Blogs",
      href: "/admin/blogs",
      icon: FileText,
    },
    {
      label: "Gallery / Results",
      href: "/admin/gallery",
      icon: Images,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 bg-white border-r border-[#EFE8E0] shadow-sm flex flex-col justify-between shrink-0 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-52"
        } ${
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Header & Centered Logo */}
          <div className="p-3 border-b border-[#EFE8E0] flex flex-col items-center justify-center relative bg-white min-h-[76px]">
            {/* Collapse Toggle Button */}
            <button
              onClick={toggleSidebar}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              className="hidden md:flex absolute right-2 top-2.5 p-1 rounded-lg text-[#666666] hover:text-[#E6663A] hover:bg-[#F8F6F2] transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden absolute right-2 top-2.5 p-1 text-[#666666] hover:text-[#151515]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Centered Logo */}
            {!isCollapsed ? (
              <div className="relative w-40 h-12 my-1 flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/grm13j3k/image/upload/v1789990763/sculpt_aesthetics/assets/logo/logo.png"
                  alt="SCULPT Aesthetics Logo"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>
            ) : (
              <div className="relative w-8 h-8 flex items-center justify-center my-1">
                <Image
                  src="https://res.cloudinary.com/grm13j3k/image/upload/v1789990762/sculpt_aesthetics/assets/logo/favicon.png"
                  alt="SCULPT Icon"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="p-2.5 space-y-1.5">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#E6663A] to-[#F28C28] text-white shadow-md shadow-[#E6663A]/20 font-bold"
                      : "text-[#555555] hover:text-[#151515] hover:bg-[#F8F6F2]"
                  } ${isCollapsed ? "justify-center px-0" : ""}`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-white" : "text-[#555555]"
                    }`}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="p-2.5 border-t border-[#EFE8E0]">
          <div
            className={`p-2 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] flex items-center justify-between ${
              isCollapsed ? "justify-center p-2" : ""
            }`}
          >
            {!isCollapsed && (
              <div className="min-w-0 pr-1.5">
                <p className="text-xs font-bold text-[#151515] truncate">
                  {session?.user?.name || "Admin"}
                </p>
                <p className="text-[10px] text-[#666666] truncate">
                  {session?.user?.email || "admin@sculpt.com"}
                </p>
              </div>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              title="Logout"
              className="p-1 rounded-lg text-[#666666] hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
