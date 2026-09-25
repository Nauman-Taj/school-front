"use client";

import { useState } from "react";

import { announcements } from "@/data/announcements";

import TeacherAnnouncementTable from "./TeacherAnnouncementTable";

export default function TeacherAnnouncementsPage() {
  const [search, setSearch] = useState("");

  const filteredAnnouncements = announcements.filter(
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Announcements
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View school announcements relevant to you.
        </p>
      </div>

      <TeacherAnnouncementTable
        announcements={filteredAnnouncements}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}