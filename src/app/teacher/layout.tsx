"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TeacherHeader from "@/components/teacher/TeacherHeader";
import TeacherSidebar from "@/components/teacher/TeacherSidebar";
import MobileTeacherSidebar from "@/components/teacher/MobileTeacherSidebar";

import {
  useAuthSession,
  useSessionHydrated,
} from "@/lib/useAuthSession";

export default function TeacherLayout({
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
    }
  }, [hydrated, router, session]);

  if (!hydrated || !session || session.role !== "Teacher") {
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
