"use client";

import AppHeader from "../../../layout/AppHeader";
import Backdrop from "../../../layout/Backdrop";
import React from "react";
import AppSidebarLawyers from "../../../layout/AppSidebarLawyers";
import { useSidebar } from "../../../context/SidebarContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:mr-[290px]"
    : "lg:mr-[90px]";

  return (
    <div className="min-h-screen xl:flex" dir="rtl">
      {/* Sidebar and Backdrop */}
      <AppSidebarLawyers />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}
