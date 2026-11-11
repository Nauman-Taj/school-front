"use client";

import { useState } from "react";
import {
  Search,
  CalendarDays,
  Bell,
} from "lucide-react";

import { Announcement } from "@/types/announcement";

type ParentAnnouncementTableProps = {
  announcements: Announcement[];
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
        announcement.description
          .toLowerCase()
          .includes(searchTerm) ||
        announcement.audience
          .toLowerCase()
          .includes(searchTerm) ||
        announcement.date
          .toLowerCase()
          .includes(searchTerm)
      );
    }
  );

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
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
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
              />
          </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
          <div className="overflow-x-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-5 py-4 font-semibold">
                        Announcement
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Audience
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredAnnouncements.map((announcement) => (
                      <tr
                        key={announcement.id}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-gray-900">
                            {announcement.title}
                          </p>

                          <p className="mt-1 max-w-xl text-sm text-gray-500">
                            {announcement.description}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                            {announcement.audience}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {new Date(
                            announcement.date
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
          </div>
          <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
              Showing {filteredAnnouncements.length} of {announcements.length} announcements
          </div>
      </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
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

                  <span className="shrink-0 rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                    {announcement.audience}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {announcement.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays
                    size={16}
                    className="text-[#01796F]"
                  />

                  <span>
                    {new Date(
                      announcement.date
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAnnouncements.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
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