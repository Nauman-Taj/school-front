"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  Megaphone,
  Users,
  UsersRound,
} from "lucide-react";

import { fetchAnnouncements } from "@/lib/announcements";
import type { Announcement } from "@/types/announcement";

import StudentStatCards from "../StudentStatCards";
import StudentAnnouncementTable from "./StudentAnnouncementTable";

export default function StudentAnnouncementsPage() {
  const [search, setSearch] = useState("");

  const [state, setState] = useState<{
    loaded: boolean;
    announcements: Announcement[];
    error: string;
  }>({
    loaded: false,
    announcements: [],
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchAnnouncements()
      .then((announcements) => {
        if (!active) return;
        setState({ loaded: true, announcements, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          announcements: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load announcements.",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return state.announcements;

    return state.announcements.filter(
      (item) =>
        item.title.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value) ||
        item.audience.toLowerCase().includes(value) ||
        item.date.toLowerCase().includes(value)
    );
  }, [search, state.announcements]);

  const stats = [
    {
      title: "Total",
      value: state.announcements.length,
      icon: Megaphone,
    },
    {
      title: "For Everyone",
      value: state.announcements.filter((item) => item.audience === "All").length,
      icon: Users,
    },
    {
      title: "For Students",
      value: state.announcements.filter(
        (item) => item.audience === "Students"
      ).length,
      icon: UsersRound,
    },
    {
      title: "Published",
      value: state.announcements.filter((item) => item.status === "Published")
        .length,
      icon: CalendarCheck,
    },
  ];

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Announcements
      </h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        View important school announcements and updates.
      </p>
    </div>
  );

  if (!state.loaded && !state.error) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading announcements...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {header}

      {state.error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {state.error}
        </div>
      )}

      <StudentStatCards stats={stats} />

      <StudentAnnouncementTable
        announcements={filtered}
        search={search}
        setSearch={setSearch}
        total={state.announcements.length}
      />
    </div>
  );
}
