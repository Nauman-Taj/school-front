"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import MobileAdminSidebar from "@/components/admin/MobileAdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const session = getSession();

    if (!session) {
      router.replace("/");
      return;
    }

    if (session.role !== "Admin") {
      if (session.role === "Teacher") {
        router.replace("/teacher");
      } else if (session.role === "Parent") {
        router.replace("/parent");
      } else if (session.role === "Student") {
        router.replace("/student");
      }

      return;
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f6f8f8]">
      <AdminHeader
        onMenuClick={() => setMobileSidebarOpen(true)}
      />

      <MobileAdminSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 lg:ml-64">
          <div className="p-6 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}