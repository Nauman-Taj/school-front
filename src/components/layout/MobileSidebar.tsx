"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  UserRoundCog,
  ClipboardCheck,
  GraduationCap,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  Wallet,
  Library,
  Bus,
  Megaphone,
  Bell,
  Settings,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Students", href: "/dashboard/students", icon: Users },
  { name: "Teachers", href: "/dashboard/teachers", icon: UserRoundCog },
  { name: "Attendance", href: "/dashboard/attendance", icon: ClipboardCheck },
  { name: "Classes", href: "/dashboard/classes", icon: GraduationCap },
  { name: "Subjects", href: "/dashboard/subjects", icon: BookOpen },
  { name: "Timetable", href: "/dashboard/timetable", icon: CalendarDays },
  { name: "Assignments", href: "/dashboard/assignments", icon: ClipboardList },
  { name: "Exams", href: "/dashboard/exams", icon: FileText },
  { name: "Results", href: "/dashboard/results", icon: GraduationCap },
  { name: "Fees", href: "/dashboard/fees", icon: Wallet },
  { name: "Library", href: "/dashboard/library", icon: Library },
  { name: "Transport", href: "/dashboard/transport", icon: Bus },
  { name: "Announcements", href: "/dashboard/announcements", icon: Megaphone },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileSidebar({
  open,
  onClose,
}: MobileSidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-gray-200 bg-white transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <Image
              src="/images/school.jpg"
              alt="School Logo"
              width={55}
              height={55}
              className="object-contain"
            />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <h1 className="text-lg font-bold text-[#015f58]">
              Garrison School
            </h1>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-scroll h-[calc(100vh-4rem)] overflow-y-auto p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-[#01796f]/10 hover:text-[#01796f]"
                >
                  <Icon size={19} strokeWidth={1.8} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside >
    </>
  );
}