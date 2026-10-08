"use client";

import { navigationByRole } from "@/data/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

type MobileAdminSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileAdminSidebar({
  open,
  onClose,
}: MobileAdminSidebarProps) {
  const pathname = usePathname();
  const adminNavigation = navigationByRole.Admin;

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
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 ps-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/school.jpg"
              alt="School Logo"
              width={55}
              height={55}
              className="object-contain"
            />
          </Link>

          <Link href="/" className="flex items-center gap-3">
            <h1 className="pr-4 text-lg font-bold text-[#015f58]">
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

        {/* Navigation */}
        <nav className="sidebar-scroll h-[calc(100vh-4rem)] overflow-y-auto p-4">
          <div className="space-y-1">
            {adminNavigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors text-gray-600 hover:bg-[#01796f]/10 hover:text-[#01796f]`}
                  // ${
                  //   isActive
                  //   ? "bg-[#01796f]/10 text-[#01796f]"
                  //   : "text-gray-600 hover:bg-[#01796f]/10 hover:text-[#01796f]"
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