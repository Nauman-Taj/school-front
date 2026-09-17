"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Eye,
    Pencil,
    Trash2,
    Megaphone,
} from "lucide-react";

import { announcements } from "@/data/announcements";
import { Announcement } from "@/types/announcement";

export default function AnnouncementTable() {
    const [announcementList, setAnnouncementList] =
        useState<Announcement[]>(announcements);

    const [search, setSearch] = useState("");

    const filteredAnnouncements = announcementList.filter(
        (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.audience.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmed) return;

    setAnnouncementList((current) =>
      current.filter((item) => item.id !== id)
    );
  };

    return (
        <div className="space-y-5">
            {/* Search */}
            <div className="relative">
                <Search
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search announcements"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                />
            </div>

            {/* Desktop */}
            <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left">
                        <thead className="border-b border-gray-200 bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Announcement
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Audience
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Date
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredAnnouncements.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                                                <Megaphone size={19} />
                                            </div>

                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {item.title}
                                                </p>

                                                <p className="mt-1 max-w-md truncate text-sm text-gray-500">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {item.audience}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {item.date}
                                    </td>

                                    <td className="px-6 py-4">
                                        <StatusBadge status={item.status} />
                                    </td>

                                    <td className="px-6 py-4">
                                        <AnnouncementActions
                                            id={item.id}
                                            onDelete={handleDelete}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile */}
            <div className="space-y-4 md:hidden">
                {filteredAnnouncements.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-2xl border border-gray-200 bg-white p-4"
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                                <Megaphone size={20} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900">
                                    {item.title}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {item.description}
                                </p>
                            </div>

                            <StatusBadge status={item.status} />
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                            <div>
                                <p className="text-xs text-gray-400">
                                    Audience
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-700">
                                    {item.audience}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">
                                    Date
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-700">
                                    {item.date}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end border-t border-gray-100 pt-3">
                            <AnnouncementActions
                                id={item.id}
                                onDelete={handleDelete}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {filteredAnnouncements.length === 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">
                    No announcements found.
                </div>
            )}
        </div>
    );
}

function StatusBadge({
    status,
}: {
    status: Announcement["status"];
}) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status === "Published"
                    ? "bg-green-50 text-green-600"
                    : "bg-yellow-50 text-yellow-600"
                }`}
        >
            {status}
        </span>
    );
}

function AnnouncementActions({
    id,
    onDelete,
}: {
    id: number;
    onDelete: (id: number) => void;
}) {
    return (
        <div className="flex items-center justify-center gap-2">
            <Link
                href={`/dashboard/announcements/${id}`}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
            >
                <Eye size={17} />
            </Link>

            <Link
                href={`/dashboard/announcements/${id}/edit`}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
            >
                <Pencil size={17} />
            </Link>

            <button
                onClick={() => onDelete(id)}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
            >
                <Trash2 size={17} />
            </button>
        </div>
    );
}