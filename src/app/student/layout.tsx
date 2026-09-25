"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getSession } from "@/lib/auth";
import StudentSidebar from "@/components/student/StudentSidebar";
import MobileStudentSidebar from "@/components/student/MobileStudentSidebar";
import StudentHeader from "@/components/student/StudentHeader";

export default function StudentLayout({
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

    if (session.role !== "Student") {
      if (session.role === "Admin") {
        router.replace("/admin");
      } else if (session.role === "Teacher") {
        router.replace("/teacher");
      } else if (session.role === "Parent") {
        router.replace("/parent");
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
      <StudentHeader
        onMenuClick={() => setMobileSidebarOpen(true)}
      />

      <MobileStudentSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex">
        <StudentSidebar />

        <main className="min-w-0 flex-1 lg:ml-64">
          <div className="p-6 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}