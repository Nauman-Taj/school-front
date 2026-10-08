"use client";

import { Search, Megaphone } from "lucide-react";

import { Announcement } from "@/types/announcement";

type TeacherAnnouncementTableProps = {
  announcements: Announcement[];
  search: string;
  setSearch: (value: string) => void;
};

export default function TeacherAnnouncementTable({
  announcements,
  search,
  setSearch,
}: TeacherAnnouncementTableProps) {
  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="relative max-w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search announcements"
            className="w-full rounded-full border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796f]"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Announcement
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Audience
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <tr
                    key={announcement.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#01796f]/10 text-[#01796f]">
                          <Megaphone size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">
                            {announcement.title}
                          </p>

                          <p className="mt-1 max-w-md text-sm text-gray-500">
                            {announcement.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {announcement.audience}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {announcement.date}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          announcement.status === "Published"
                            ? "bg-green-50 text-green-600"
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                      >
                        {announcement.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-8 text-center text-sm text-gray-500"
                  >
                    No announcements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
                  <Megaphone size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-gray-900">
                    {announcement.title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {announcement.date}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    announcement.status === "Published"
                      ? "bg-green-50 text-green-600"
                      : "bg-yellow-50 text-yellow-600"
                  }`}
                >
                  {announcement.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                {announcement.description}
              </p>

              <p className="mt-3 text-sm text-gray-500">
                <span className="font-medium text-gray-900">
                  Audience:
                </span>{" "}
                {announcement.audience}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No announcements found.
          </div>
        )}
      </div>
    </div>
  );
}