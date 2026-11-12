"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Megaphone, Search } from "lucide-react";

import type { Announcement } from "@/types/announcement";

type TeacherAnnouncementTableProps = {
  announcements: Announcement[];
};

export default function TeacherAnnouncementTable({
  announcements,
}: TeacherAnnouncementTableProps) {
  const [search, setSearch] = useState("");

  const filteredAnnouncements = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return announcements;

    return announcements.filter((item) =>
      [
        item.title,
        item.description,
        item.audience,
        item.date,
        item.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [announcements, search]);

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
            type="search"
            placeholder="Search announcements"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Announcement</th>
                <th className="px-5 py-4 font-semibold">Audience</th>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                          <Megaphone size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800">
                            {item.title}
                          </p>

                          <p className="mt-1 max-w-md truncate text-xs text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {item.audience}
                    </td>

                    <td className="px-5 py-4 text-gray-600">{item.date}</td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Published"
                            ? "bg-[#e6f4f2] text-[#01796F]"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-gray-500"
                  >
                    {search.trim()
                      ? "No announcements match your search."
                      : "No announcements were returned by the backend."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {filteredAnnouncements.length} of {announcements.length}{" "}
          announcements
        </div>
      </div>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                    <Megaphone size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "Published"
                      ? "bg-[#e6f4f2] text-[#01796F]"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                {item.description}
              </p>

              <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm text-gray-500">
                <CalendarDays size={16} className="text-[#01796F]" />

                <span>
                  Audience: <span className="font-medium">{item.audience}</span>
                </span>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            {search.trim()
              ? "No announcements match your search."
              : "No announcements were returned by the backend."}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 md:hidden">
        Showing {filteredAnnouncements.length} of {announcements.length}{" "}
        announcements
      </p>
    </div>
  );
}
