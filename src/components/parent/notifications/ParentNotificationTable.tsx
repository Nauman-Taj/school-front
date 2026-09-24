"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Bell,
    Check,
    Search,
} from "lucide-react";

import { ParentNotification } from "@/types/parentNotification";

type ParentNotificationTableProps = {
    notifications: ParentNotification[];
};

export default function ParentNotificationTable({
    notifications: initialNotifications,
}: ParentNotificationTableProps) {
    const [notifications, setNotifications] =
        useState(initialNotifications);

    useEffect(() => {
        setNotifications(initialNotifications);
    }, [initialNotifications]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<
        "All" | "Unread" | "Read"
    >("All");

    const filteredNotifications = useMemo(() => {
        return notifications.filter((notification) => {
            const matchesSearch =
                notification.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                notification.message
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                notification.type
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesFilter =
                filter === "All" ||
                (filter === "Unread" && !notification.read) ||
                (filter === "Read" && notification.read);

            return matchesSearch && matchesFilter;
        });
    }, [notifications, search, filter]);

    const markAsRead = (id: number) => {
        setNotifications((current) =>
            current.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((current) =>
            current.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
    };

    const typeStyles = {
        Attendance: "bg-red-50 text-red-600",
        Fee: "bg-orange-50 text-orange-600",
        Result: "bg-green-50 text-green-600",
        Assignment: "bg-blue-50 text-blue-600",
        Announcement: "bg-[#e6f4f2] text-[#01796f]",
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white">
            {/* Top */}
            <div className="border-b border-gray-100 p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Search */}
                    <div className="relative w-full lg:max-w-2xl">
                        <Search
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search notifications"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={markAllAsRead}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#01796F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] lg:w-auto"
                    >
                        <Check size={17} />
                        Mark all as read
                    </button>
                </div>

                {/* Filters */}
                <div className="mt-4 flex items-center justify-center gap-2">
                    {(["All", "Unread", "Read"] as const).map(
                        (item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setFilter(item)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === item
                                    ? "bg-[#e6f4f2] text-[#01796f]"
                                    : "text-gray-500 hover:bg-gray-100"
                                    }`}
                            >
                                {item}
                            </button>
                        )
                    )}
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100 text-sm text-gray-500">
                            <th className="px-5 py-4 font-medium">
                                Notification
                            </th>
                            <th className="px-5 py-4 font-medium">
                                Type
                            </th>
                            <th className="px-5 py-4 font-medium">
                                Date
                            </th>
                            <th className="px-5 py-4 text-center font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredNotifications.map(
                            (notification) => (
                                <tr
                                    key={notification.id}
                                    className={`border-b border-gray-100 last:border-0 ${!notification.read
                                        ? "bg-[#e6f4f2]/30"
                                        : ""
                                        }`}
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796f]">
                                                <Bell size={17} />
                                            </div>

                                            <div>
                                                <p
                                                    className={`text-sm ${!notification.read
                                                        ? "font-semibold text-gray-900"
                                                        : "font-medium text-gray-800"
                                                        }`}
                                                >
                                                    {notification.title}
                                                </p>

                                                <p className="mt-1 max-w-xl text-sm text-gray-500">
                                                    {notification.message}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${typeStyles[notification.type]}`}
                                        >
                                            {notification.type}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-gray-500">
                                        {notification.date}
                                    </td>

                                    <td className="px-5 py-4 text-center">
                                        {!notification.read ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    markAsRead(notification.id)
                                                }
                                                className="rounded-lg px-3 py-2 text-xs font-medium text-[#01796f] transition hover:bg-[#e6f4f2]"
                                            >
                                                Mark read
                                            </button>
                                        ) : (
                                            <span className="text-xs text-gray-400">
                                                Read
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>

                {filteredNotifications.length === 0 && (
                    <div className="px-5 py-12 text-center text-sm text-gray-500">
                        No notifications found.
                    </div>
                )}
            </div>

            {/* Mobile */}
            <div className="space-y-3 p-4 md:hidden">
                {filteredNotifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`rounded-xl border p-4 ${!notification.read
                            ? "border-[#01796f]/20 bg-[#e6f4f2]/30"
                            : "border-gray-200"
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796f]">
                                <Bell size={17} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                    <h3
                                        className={`text-sm ${!notification.read
                                            ? "font-semibold text-gray-900"
                                            : "font-medium text-gray-800"
                                            }`}
                                    >
                                        {notification.title}
                                    </h3>

                                    {!notification.read && (
                                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#01796f]" />
                                    )}
                                </div>

                                <span
                                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${typeStyles[notification.type]}`}
                                >
                                    {notification.type}
                                </span>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    {notification.message}
                                </p>

                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                        {notification.date}
                                    </span>

                                    {!notification.read && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                markAsRead(notification.id)
                                            }
                                            className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#01796f] hover:bg-[#e6f4f2]"
                                        >
                                            Mark read
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
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