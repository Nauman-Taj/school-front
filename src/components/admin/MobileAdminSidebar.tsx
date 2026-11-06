"use client";

import { getNavigationItemClass, isNavigationItemActive, navigationByRole } from "@/data/navigation";
import { useSchoolSetting } from "@/lib/schoolSettings";
import Link from "next/link";
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
  const school = useSchoolSetting();
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
          <Link href="/admin" className="flex items-center gap-3">
            {school.logo ? (
              <img
                src={school.logo}
                alt=""
                width={55}
                height={55}
                className="object-contain"
              />
            ) : (
              <span className="block h-11 w-11" />
            )}
          </Link>

          <Link href="/admin" className="min-w-0 gap-3 flex-1">
            <h1 className="truncate pr-4 text-lg font-bold text-[#015f58]" title={school.schoolName}>
              {school.schoolName}
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

              const isActive = isNavigationItemActive(pathname, item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={getNavigationItemClass(isActive)}
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