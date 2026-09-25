"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Menu,
  User,
  X,
  LogOut,
} from "lucide-react";

import { getSession, logout, AuthSession } from "@/lib/auth";
import { navigationByRole } from "@/data/navigation";
import { parentNavigation } from "@/data/parentNavigation";

type ParentHeaderProps = {
  onMenuClick?: () => void;
};

export default function ParentHeader({
  onMenuClick,
}: ParentHeaderProps) {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const [session, setSession] =
    useState<AuthSession | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSession(getSession());
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
        setSearch("");
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Use Parent navigation for Parent users
  const navigation =
    session?.role === "Parent"
      ? parentNavigation.map((item) => ({
        label: item.title,
        href: item.href,
        icon: item.icon,
      }))
      : session
        ? navigationByRole[session.role]
        : [];

  const results = navigation.filter((item) =>
    item.label
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  const handleSearch = (href: string) => {
    router.push(href);
    setSearch("");
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          <div className="hidden sm:block">
            <Link
              href="/"
              className="text-xl font-bold text-[#015f58]"
            >
              Garrison School
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div
            ref={searchRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-lg p-2.5 text-gray-600 transition hover:bg-gray-100 hover:text-[#01796f]"
              aria-label="Search"
            >
              <Search
                size={20}
                strokeWidth={1.8}
              />
            </button>

            {searchOpen && (
              <div
                className="
                  absolute
                  right-[-50px]
                  top-[-10px]
                  z-50
                  w-[calc(100vw-2rem)]
                  max-w-72
                  translate-y-16
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  p-2
                  shadow-lg
                "
              >
                {/* Search Input */}
                <div className="flex items-center gap-2 rounded-full border border-gray-200 px-3">
                  <Search
                    size={17}
                    className="shrink-0 text-gray-400"
                  />

                  <input
                    autoFocus
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search"
                    className="w-full min-w-0 py-2.5 text-sm outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setSearchOpen(false);
                    }}
                    className="shrink-0 text-gray-400 hover:text-gray-700"
                    aria-label="Close search"
                  >
                    <X size={17} />
                  </button>
                </div>

                {/* Results */}
                {search.trim() && (
                  <div className="mt-2 max-h-60 overflow-y-auto">
                    {results.length > 0 ? (
                      results.map((item) => {
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.href}
                            type="button"
                            onClick={() =>
                              handleSearch(item.href)
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                          >
                            <Icon size={17} />

                            <span>{item.label}</span>
                          </button>
                        );
                      })
                    ) : (
                      <p className="px-3 py-3 text-sm text-gray-500">
                        No results found
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User */}
          <div className="ml-2 flex items-center gap-3 border-l border-gray-200 pl-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {session?.name || "Parent"}
              </p>

              <p className="text-xs text-gray-500">
                {session?.role || "Parent"}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
              <User
                size={19}
                strokeWidth={1.8}
              />
            </div>
          </div>
          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className="ml-1 inline-flex w-fit items-center gap-2 rounded-xl p-2.5 text-sm font-semibold text-gray-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}