"use client";

import { useState } from "react";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f8f8]">
      <Header
        onMenuClick={() => setMobileSidebarOpen(true)}
      />

      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 lg:ml-64">
          <div className="p-6 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}