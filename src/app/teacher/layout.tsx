"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TeacherHeader from "@/components/teacher/TeacherHeader";
import TeacherSidebar from "@/components/teacher/TeacherSidebar";
import MobileTeacherSidebar from "@/components/teacher/MobileTeacherSidebar";

import { getSession } from "@/lib/auth";

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const session = getSession();

    // Not logged in
    if (!session) {
      router.replace("/");
      return;
    }

    // Only Teacher can access /teacher
    if (session.role !== "Teacher") {
      if (session.role === "Admin") {
        router.replace("/admin");
      } else if (session.role === "Student") {
        router.replace("/student");
      } else if (session.role === "Parent") {
        router.replace("/parent");
      } else {
        router.replace("/");
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
      <TeacherHeader
        onMenuClick={() => setMobileSidebarOpen(true)}
      />

      <MobileTeacherSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex">
        <TeacherSidebar />

        <main className="min-w-0 flex-1 lg:ml-64">
          <div className="p-6 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}