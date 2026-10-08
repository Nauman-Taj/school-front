"use client";

import { useMemo, useState } from "react";
import { Megaphone, Search } from "lucide-react";

import { announcements } from "@/data/announcements";

export default function StudentAnnouncementsPage() {
  const [search, setSearch] = useState("");

  const studentAnnouncements = useMemo(() => {
    return announcements.filter(
      (announcement) =>
        announcement.audience === "Students" ||
        announcement.audience === "All"
    );
  }, []);

  const filteredAnnouncements = studentAnnouncements.filter(
    (announcement) => {
      const value = search.toLowerCase();

      return (
        announcement.title.toLowerCase().includes(value) ||
        announcement.description.toLowerCase().includes(value) ||
        announcement.audience.toLowerCase().includes(value) ||
        announcement.date.toLowerCase().includes(value) ||
        announcement.status.toLowerCase().includes(value)
      );
    }
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Announcements
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View important school announcements and updates.
        </p>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search announcements"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796f]"
          />
        </div>
      </div>

      {/* Announcements */}
      <div className="space-y-3">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                  <Megaphone size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {announcement.title}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {announcement.description}
                      </p>
                    </div>

                    <span
                      className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        announcement.status === "Published"
                          ? "bg-green-50 text-green-600"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {announcement.status}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span>
                      Date: {announcement.date}
                    </span>

                    <span className="text-gray-300">•</span>

                    <span>
                      Audience: {announcement.audience}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              No announcements found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}