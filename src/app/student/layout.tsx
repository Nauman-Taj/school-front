"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import StudentSidebar from "@/components/student/StudentSidebar";
import MobileStudentSidebar from "@/components/student/MobileStudentSidebar";
import StudentHeader from "@/components/student/StudentHeader";

import {
  useAuthSession,
  useSessionHydrated,
} from "@/lib/useAuthSession";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  // The session lives outside React, so it is read through
  // `useAuthSession()` instead of being copied into state inside an effect.
  const session = useAuthSession();
  const hydrated = useSessionHydrated();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // The stored session is only read after the first client render.
    if (!hydrated) return;

    // Not logged in
    if (!session) {
      router.replace("/");
      return;
    }

    // Only Student can access /student
    if (session.role !== "Student") {
      if (session.role === "Admin") {
        router.replace("/admin");
      } else if (session.role === "Teacher") {
        router.replace("/teacher");
      } else if (session.role === "Parent") {
        router.replace("/parent");
      } else {
        router.replace("/");
      }
    }
  }, [hydrated, router, session]);

  if (!hydrated || !session || session.role !== "Student") {
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
          <div className="min-w-0 p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
