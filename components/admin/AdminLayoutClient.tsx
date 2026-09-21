"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface AdminLayoutClientProps {
  session: any;
  children: React.ReactNode;
}

export default function AdminLayoutClient({
  session,
  children,
}: AdminLayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#151515] flex font-sans antialiased selection:bg-[#E6663A] selection:text-white">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <AdminSidebar
        session={session}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <AdminHeader
          session={session}
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
        />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#F8F6F2]">
          {children}
        </main>
      </div>
    </div>
  );
}
