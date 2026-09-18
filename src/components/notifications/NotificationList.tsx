"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Info,
  TriangleAlert,
  CircleCheck,
  Clock,
  Search,
} from "lucide-react";

import { notifications } from "@/data/notifications";
import { Notification } from "@/types/notification";

const typeStyles = {
  Info: {
    icon: Info,
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  Success: {
    icon: CircleCheck,
    bg: "bg-green-50",
    text: "text-green-600",
  },
  Warning: {
    icon: TriangleAlert,
    bg: "bg-yellow-50",
    text: "text-yellow-600",
  },
  Alert: {
    icon: Bell,
    bg: "bg-red-50",
    text: "text-red-600",
  },
};

type Filter = "All" | "Unread" | "Read";

export default function NotificationList() {
  const [notificationList, setNotificationList] =
    useState<Notification[]>(notifications);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const filteredNotifications = notificationList.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(search.toLowerCase()) ||
      notification.message.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Unread" && !notification.read) ||
      (filter === "Read" && notification.read);

    return matchesSearch && matchesFilter;
  });

  const unreadCount = notificationList.filter(
    (notification) => !notification.read
  ).length;

  const markAsRead = (id: number) => {
    setNotificationList((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Notifications
            </h1>

            {unreadCount > 0 && (
              <span className="rounded-full bg-[#01796f]/10 px-2.5 py-1 text-xs font-semibold text-[#01796f]">
                {unreadCount} unread
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Stay updated with important school activities.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:text-[#01796f]"
          >
            <CheckCheck size={17} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search notifications"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
        </div>

        <div className="flex rounded-full border border-gray-200 bg-white p-1">
          {(["All", "Unread", "Read"] as Filter[]).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === item
                  ? "bg-[#01796f] text-white"
                  : "text-gray-500 hover:text-[#01796f]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const style = typeStyles[notification.type];
          const Icon = style.icon;

          return (
            <div
              key={notification.id}
              className={`rounded-2xl border bg-white p-4 transition sm:p-5 ${
                notification.read
                  ? "border-gray-200"
                  : "border-[#01796f]/20 bg-[#e6f4f2]/30"
              }`}
            >
              <div className="flex gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.bg}`}
                >
                  <Icon size={20} className={style.text} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {notification.title}
                        </h3>

                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-[#01796f]" />
                        )}
                      </div>

                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {notification.message}
                      </p>
                    </div>

                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="flex shrink-0 items-center gap-1.5 self-start text-sm font-medium text-[#01796f] hover:text-[#015f58]"
                      >
                        <Check size={16} />
                        Mark as read
                      </button>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                    <Clock size={14} />
                    {notification.date} · {notification.time}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white py-12 text-center">
            <Bell className="mx-auto text-gray-300" size={36} />

            <p className="mt-3 font-medium text-gray-700">
              No notifications found
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}