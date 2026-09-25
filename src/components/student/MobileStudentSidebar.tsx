"use client";

import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { studentNavigation } from "@/data/student/studentNavigation";

type MobileStudentSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileStudentSidebar({
  open,
  onClose,
}: MobileStudentSidebarProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-gray-200 bg-white lg:hidden">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-6">
          <div className="flex items-center">
            <Link href="/" onClick={onClose}>
              <Image
                src="/images/school.jpg"
                alt="School Logo"
                width={55}
                height={55}
                className="object-contain"
              />
            </Link>

            <Link href="/" onClick={onClose}>
              <div className="pl-2 text-lg font-bold text-[#015f58]">
                <p>Garrison School</p>
              </div>
            </Link>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-scroll h-[calc(100vh-4rem)] overflow-y-auto p-4">
          <div className="space-y-1">
            {studentNavigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/student"
                  ? pathname === "/student"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors text-gray-600 hover:bg-[#01796f]/10 hover:text-[#01796f]`}
                  //    ${
                  //   isActive
                  //     ? "bg-[#01796f]/10 text-[#01796f]"
                  //     : "text-gray-600 hover:bg-[#01796f]/10 hover:text-[#01796f]"
                  // }`}
                >
                  <Icon size={19} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}