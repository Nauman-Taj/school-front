"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getSession } from "@/lib/auth";
import ParentSidebar from "@/components/parent/ParentSidebar";
import MobileParentSidebar from "@/components/parent/MobileParentSidebar";
import ParentHeader from "@/components/parent/ParentHeader";

export default function ParentLayout({
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

    if (session.role !== "Parent") {
      router.replace("/dashboard");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f6f8f8]">
      <ParentHeader
        onMenuClick={() => setMobileSidebarOpen(true)}
      />

      <MobileParentSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex">

        <ParentSidebar />

        <main className="min-w-0 flex-1 lg:ml-64">
          <div className="p-6 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

