"use client";

import { getNavigationItemClass, isNavigationItemActive, navigationByRole } from "@/data/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const adminNavigation = navigationByRole.Admin;

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-white lg:block">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-6">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/images/school.jpg"
            alt="School Logo"
            width={55}
            height={55}
            className="object-contain"
          />
        </Link>

        <Link href="/admin" className="flex items-center gap-3">
          <div className="pl-2 text-lg font-bold text-[#015f58]">
            <p>Garrison School</p>
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