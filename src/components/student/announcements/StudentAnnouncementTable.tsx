"use client";

import { Megaphone, Search } from "lucide-react";

import type { Announcement } from "@/types/announcement";

type Props = {
  announcements: Announcement[];
  search: string;
  setSearch: (value: string) => void;
  total: number;
};

export default function StudentAnnouncementTable({
  announcements,
  search,
  setSearch,
  total,
}: Props) {
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
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Announcement</th>
                <th className="px-5 py-4 font-semibold">Audience</th>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {announcements.length > 0 ? (
                announcements.map((item) => (
                  <tr key={item.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                          <Megaphone size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">
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
                        className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
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
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No announcements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {announcements.length} of {total} announcements
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {announcements.length > 0 ? (
          announcements.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                    <Megaphone size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{item.title}</p>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.audience} · {item.date}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796F]">
                  {item.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                {item.description}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            No announcements found.
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 md:hidden">
        Showing {announcements.length} of {total} announcements
      </p>
    </div>
  );
}
