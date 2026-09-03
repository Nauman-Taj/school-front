"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Search,
  Menu,
  User,
} from "lucide-react";

type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          <div className="hidden sm:block">
            <div className="flex h-16 shrink-0 items-center  border-b border-gray-200">

              <Link
                href="/"
                className="flex items-center gap-3"
              >
                <Image
                  src="/images/school.jpg"
                  alt="School Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </Link>

              <Link
                href="/"
                className="flex items-center gap-3"
              >
                <div className="text-xl font-bold ml-2 text-[#015f58]">
                  <p>Garrison School</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg p-2.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#01796f]"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            className="relative rounded-lg p-2.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#01796f]"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.8} />

            {/* <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#01796f]" /> */}
          </button>

          <div className="ml-2 flex items-center gap-3 border-l border-gray-200 pl-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">
                Nauman
              </p>
              <p className="text-xs text-gray-500">
                Admin
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
              <User size={19} strokeWidth={1.8} />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}