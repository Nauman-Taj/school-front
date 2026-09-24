"use client";

import { useState } from "react";
import {
  Search,
  CalendarDays,
  Bell,
} from "lucide-react";

import { ParentAnnouncement } from "@/types/parentAnnouncement";

type ParentAnnouncementTableProps = {
  announcements: ParentAnnouncement[];
};

export default function ParentAnnouncementTable({
  announcements,
}: ParentAnnouncementTableProps) {
  const [search, setSearch] = useState("");

  const filteredAnnouncements = announcements.filter(
    (announcement) => {
      const searchTerm = search.toLowerCase();

      return (
        announcement.title
          .toLowerCase()
          .includes(searchTerm) ||
        announcement.message
          .toLowerCase()
          .includes(searchTerm) ||
        announcement.category
          .toLowerCase()
          .includes(searchTerm)
      );
    }
  );

  return (
    <div className="space-y-4">
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

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Announcement
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAnnouncements.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {announcement.title}
                    </p>

                    <p className="mt-1 max-w-xl text-sm text-gray-500">
                      {announcement.message}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796F]">
                      {announcement.category}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {announcement.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                <Bell size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-gray-900">
                    {announcement.title}
                  </h3>

                  <span className="shrink-0 rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796F]">
                    {announcement.category}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {announcement.message}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays
                    size={16}
                    className="text-[#01796F]"
                  />
                  <span>{announcement.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAnnouncements.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No announcements found.
          </div>
        )}
      </div>

      {/* Desktop Empty State */}
      {filteredAnnouncements.length === 0 && (
        <div className="hidden rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 md:block">
          No announcements found.
        </div>
      )}
    </div>
  );
}