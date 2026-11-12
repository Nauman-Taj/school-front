"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  Megaphone,
  Users,
} from "lucide-react";

import { fetchAnnouncements } from "@/lib/announcements";
import type { Announcement } from "@/types/announcement";

import TeacherAnnouncementTable from "./TeacherAnnouncementTable";

export default function TeacherAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchAnnouncements()
      .then((data) => {
        if (!active) return;
        setAnnouncements(data);
        setLoaded(true);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load announcements."
        );
        setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(
    () => [
      {
        title: "Total",
        value: announcements.length,
        icon: Megaphone,
      },
      {
        title: "For Everyone",
        value: announcements.filter(
          (item) => item.audience === "All"
        ).length,
        icon: Bell,
      },
      {
        title: "For Teachers",
        value: announcements.filter(
          (item) => item.audience === "Teachers"
        ).length,
        icon: Users,
      },
      {
        title: "Latest Date",
        value: announcements.length
          ? announcements[announcements.length - 1].date
          : "-",
        icon: CalendarDays,
      },
    ],
    [announcements]
  );

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Announcements
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View school announcements and important updates for teachers.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.title}</p>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-2 text-2xl font-bold text-gray-800">
                {loaded ? stat.value : "0"}
              </p>
            </div>
          );
        })}
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Announcements */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            School Announcements
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest published announcements available to teachers.
          </p>
        </div>

        {!loaded ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
            <p className="mt-4 text-sm text-gray-500">
              Loading announcements...
            </p>
          </div>
        ) : (
          <TeacherAnnouncementTable announcements={announcements} />
        )}
      </div>
    </div>
  );
}
