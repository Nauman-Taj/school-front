"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";

import { getSession } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const session = getSession();

    // Not logged in
    if (!session) {
      router.replace("/");
      return;
    }

    // Parent has a separate dashboard
    if (session.role === "Parent") {
      router.replace("/parent/dashboard");
      return;
    }

    // Check permission for current route
    const allowed = hasPermission(
      session.role,
      pathname
    );

    if (!allowed) {
      router.replace("/dashboard");
      return;
    }

    setCheckingAuth(false);
  }, [pathname, router]);

  if (checkingAuth) {
    return null;
  }

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