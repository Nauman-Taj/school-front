"use client";

import { useMemo } from "react";
import {
  Bell,
  CalendarDays,
  Users,
  UserRound,
} from "lucide-react";

import { announcements } from "@/data/announcements";
import ParentAnnouncementTable from "./ParentAnnouncementTable";

export default function ParentAnnouncementsPage() {
  const parentAnnouncements = useMemo(
    () =>
      announcements.filter(
        (announcement) =>
          announcement.status === "Published" &&
          (announcement.audience === "All" ||
            announcement.audience === "Parents")
      ),
    []
  );

  const stats = [
    {
      title: "Total",
      value: parentAnnouncements.length,
      icon: Bell,
      iconClass: "bg-[#e6f4f2] text-[#01796F]",
    },
    {
      title: "For Everyone",
      value: parentAnnouncements.filter(
        (announcement) => announcement.audience === "All"
      ).length,
      icon: Users,
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "For Parents",
      value: parentAnnouncements.filter(
        (announcement) => announcement.audience === "Parents"
      ).length,
      icon: UserRound,
      iconClass: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Published",
      value: parentAnnouncements.filter(
        (announcement) => announcement.status === "Published"
      ).length,
      icon: CalendarDays,
      iconClass: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Announcements
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View school announcements and important updates for parents.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClass}`}
                >
                  <Icon size={19} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-900">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Announcement Records */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            School Announcements
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest published announcements available to parents.
          </p>
        </div>

        <ParentAnnouncementTable
          announcements={parentAnnouncements}
        />
      </div>
    </div>
  );
}