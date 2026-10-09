"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, LogOut, Menu, UserCircle, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { signOut } from "next-auth/react";

interface AdminHeaderProps {
  session: any;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
}

export default function AdminHeader({
  session,
  isCollapsed,
  toggleSidebar,
  toggleMobileSidebar,
}: AdminHeaderProps) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return null;
  }

  // Derive page title from route
  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    if (pathname.startsWith("/admin/appointments")) return "Appointment Leads";
    if (pathname.startsWith("/admin/blogs")) return "Blog CMS";
    if (pathname.startsWith("/admin/services")) return "Services CMS";
    return "Admin Portal";
  };

  return (
    <header className="h-[70px] border-b border-[#EFE8E0] bg-white px-4 md:px-6 flex items-center justify-between shrink-0 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 rounded-lg text-[#555555] hover:text-[#151515] hover:bg-[#F8F6F2]"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex p-2 rounded-lg text-[#555555] hover:text-[#E6663A] hover:bg-[#F8F6F2] transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>

        <h2 className="text-lg md:text-xl font-bold text-[#151515] tracking-tight font-serif">
          {getPageTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* View Public Website */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#E6663A] text-[#E6663A] hover:bg-[#E6663A] hover:text-white text-xs font-semibold transition-all shadow-xs"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">View Website</span>
        </Link>

        {/* User Badge */}
        <div className="flex items-center gap-2 border-l border-[#EFE8E0] pl-3">
          <div className="w-8 h-8 rounded-full bg-[#F8F6F2] border border-[#EFE8E0] flex items-center justify-center text-[#E6663A]">
            <UserCircle className="w-5 h-5" />
          </div>
          <span className="text-xs text-[#151515] hidden sm:inline-block font-bold">
            {session?.user?.name || "Admin"}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="p-1.5 text-[#555555] hover:text-rose-600 transition-colors md:hidden"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
