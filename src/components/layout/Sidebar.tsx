"use client";

import { getSession } from "@/lib/auth";
import { navigationByRole } from "@/data/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  const session = getSession();

  const menuItems = session
    ? navigationByRole[session.role]
    : [];

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-white lg:block">

      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-6">

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
          <div className="pl-2 text-lg font-bold text-[#015f58]">
            <p>Garrison School</p>
          </div>
        </Link>

      </div>

      {/* Navigation */}
      <nav className="sidebar-scroll h-[calc(100vh-4rem)] overflow-y-auto p-4">
        <div className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-[#01796f]/10 hover:text-[#01796f]"
              >
                <Icon
                  size={19}
                  strokeWidth={1.8}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}

        </div>
      </nav>

    </aside>
  );
}