"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Info,
  Search,
  TriangleAlert,
} from "lucide-react";

import { Notification } from "@/types/notification";

type StudentNotificationTableProps = {
  notifications: Notification[];
  setNotifications: React.Dispatch<
    React.SetStateAction<Notification[]>
  >;
};

export default function StudentNotificationTable({
  notifications,
  setNotifications,
}: StudentNotificationTableProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Unread" | "Read">(
    "All"
  );

  const filteredNotifications = notifications.filter(
    (notification) => {
      const matchesSearch =
        `${notification.title} ${notification.message} ${notification.type}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Unread" && !notification.read) ||
        (filter === "Read" && notification.read);

      return matchesSearch && matchesFilter;
    }
  );

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Notification History
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your recent school notifications.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notifications..."
                className="w-full rounded-full border border-gray-200 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["All", "Unread", "Read"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "bg-[#01796f] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-[#e6f4f2] hover:text-[#01796f]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden divide-y divide-gray-100 md:block">
        {filteredNotifications.map((notification) => (
          <NotificationRow
            key={notification.id}
            notification={notification}
            onRead={markAsRead}
          />
        ))}

        {filteredNotifications.length === 0 && (
          <div className="px-5 py-12 text-center">
            <Bell
              size={28}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-sm text-gray-500">
              No notifications found.
            </p>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="space-y-3 p-4 md:hidden">
        {filteredNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onRead={markAsRead}
          />
        ))}

        {filteredNotifications.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No notifications found.
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationRow({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: (id: number) => void;
}) {
  return (
    <div
      className={`flex items-start gap-4 p-5 transition hover:bg-gray-50 ${
        !notification.read ? "bg-[#e6f4f2]/30" : ""
      }`}
    >
      <NotificationIcon type={notification.type} />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {notification.title}
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              {notification.message}
            </p>
          </div>

          {!notification.read && (
            <button
              type="button"
              onClick={() => onRead(notification.id)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#01796f] hover:bg-[#e6f4f2]"
            >
              <Check size={14} />
              Mark Read
            </button>
          )}
        </div>

        <p className="mt-3 text-xs text-gray-400">
          {notification.date} • {notification.time}
        </p>
      </div>
    </div>
  );
}

function NotificationCard({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: (id: number) => void;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        !notification.read
          ? "border-[#01796f]/20 bg-[#e6f4f2]/30"
          : "border-gray-100"
      }`}
    >
      <div className="flex items-start gap-3">
        <NotificationIcon type={notification.type} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900">
              {notification.title}
            </h3>

            {!notification.read && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#01796f]" />
            )}
          </div>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            {notification.message}
          </p>

          <p className="mt-3 text-xs text-gray-400">
            {notification.date} • {notification.time}
          </p>

          {!notification.read && (
            <button
              type="button"
              onClick={() => onRead(notification.id)}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#e6f4f2] px-3 py-2 text-xs font-semibold text-[#01796f]"
            >
              <Check size={14} />
              Mark Read
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationIcon({
  type,
}: {
  type: Notification["type"];
}) {
  if (type === "Alert" || type === "Warning") {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
        <TriangleAlert size={19} />
      </div>
    );
  }

  if (type === "Success") {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
        <CheckCheck size={19} />
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
      <Info size={19} />
    </div>
  );
}