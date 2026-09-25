"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  Menu,
  User,
  X,
  LogOut,
  Bell,
  CheckCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { getSession, logout, AuthSession } from "@/lib/auth";
import { navigationByRole } from "@/data/navigation";
import { notifications as initialNotifications } from "@/data/notifications";

type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const [session, setSession] = useState<AuthSession | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [adminNotifications, setAdminNotifications] =
    useState(initialNotifications);

  useEffect(() => {
    setSession(getSession());
  }, []);

  // Close search and notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        searchRef.current &&
        !searchRef.current.contains(target)
      ) {
        setSearchOpen(false);
        setSearch("");
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const navigation = session
    ? navigationByRole[session.role]
    : [];

  const results = navigation.filter((item) =>
    item.label
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredNotifications = adminNotifications.filter(
    (notification) =>
      notification.role === "Admin" &&
      notification.userId === session?.id
  );

  const unreadCount = filteredNotifications.filter(
    (notification) => !notification.read
  ).length;

  const handleSearch = (href: string) => {
    router.push(href);
    setSearch("");
    setSearchOpen(false);
  };

  const markAsRead = (id: number) => {
    setAdminNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setAdminNotifications((current) =>
      current.map((notification) =>
        notification.role === "Admin" &&
          notification.userId === session?.id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}
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
            <Link
              href="/"
              className="text-xl font-bold text-[#015f58]"
            >
              Garrison School
            </Link>
          </div>
        </div>

        {/* Right */}
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
              <div className="absolute right-[-50px] top-[-10px] z-50 w-[calc(100vw-2rem)] max-w-72 translate-y-16 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">

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

          {/* Notifications */}
          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setNotificationOpen((open) => !open)
              }
              className="relative rounded-lg p-2.5 text-gray-600 transition hover:bg-gray-100 hover:text-[#01796f]"
              aria-label="Notifications"
            >
              <Bell
                size={20}
                strokeWidth={1.8}
              />

              {unreadCount > 0 && (
                <span className="absolute -right-0 -top-0 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#01796f] px-1 text-[9px] font-bold leading-none text-white shadow-md">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {notificationOpen && (
              <div className="absolute right-[-55px] top-12 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg sm:right-0">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {unreadCount} unread
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#01796f] hover:text-[#015f58]"
                    >
                      <CheckCheck size={15} />
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Notification List */}
                <div className="max-h-96 overflow-y-auto">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map(
                      (notification) => (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                          className={`w-full border-b border-gray-100 px-4 py-3 text-left transition hover:bg-gray-50 ${!notification.read
                              ? "bg-[#e6f4f2]/40"
                              : "bg-white"
                            }`}
                        >
                          <div className="flex gap-3">

                            <div
                              className={`mt-1 h-2 w-2 shrink-0 rounded-full ${notification.read
                                  ? "bg-gray-300"
                                  : "bg-[#01796f]"
                                }`}
                            />

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p
                                  className={`text-sm ${notification.read
                                      ? "font-medium text-gray-700"
                                      : "font-semibold text-gray-900"
                                    }`}
                                >
                                  {notification.title}
                                </p>

                                <span className="shrink-0 text-[11px] text-gray-400">
                                  {notification.date}
                                </span>
                              </div>

                              <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                                {notification.message}
                              </p>

                              <p className="mt-1 text-[11px] text-gray-400">
                                {notification.time}
                              </p>
                            </div>

                          </div>
                        </button>
                      )
                    )
                  ) : (
                    <div className="px-4 py-10 text-center">
                      <Bell
                        size={28}
                        className="mx-auto text-gray-300"
                      />

                      <p className="mt-3 text-sm font-medium text-gray-600">
                        No notifications
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        You're all caught up.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User */}
          <div className="ml-2 flex items-center gap-3 border-l border-gray-200 pl-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {session?.name || "User"}
              </p>

              <p className="text-xs text-gray-500">
                {session?.role || "User"}
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
            <LogOut size={17} />
            <span className="hidden sm:inline">
              Logout
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}