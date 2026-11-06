"use client";

import { getNavigationItemClass, isNavigationItemActive, navigationByRole } from "@/data/navigation";
import { useSchoolSetting } from "@/lib/schoolSettings";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const school = useSchoolSetting();
  const adminNavigation = navigationByRole.Admin;

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-white lg:block">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-6">
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
            <span className="block h-[55px] w-[55px]" />
          )}
        </Link>

        <Link href="/admin" className="min-w-0 flex-1">
          <div className="pl-2 text-[#015f58]">
            <p className="truncate text-lg font-bold" title={school.schoolName}>
              {school.schoolName}
            </p>
          </div>
        </Link>
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
  );
}