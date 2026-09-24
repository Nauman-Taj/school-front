"use client";

import {
  CalendarDays,
  Clock3,
  UserRound,
  MapPin,
} from "lucide-react";

import { ParentTimetable } from "@/types/parentTimetable";

type ParentTimetableTableProps = {
  timetable: ParentTimetable[];
};

export default function ParentTimetableTable({
  timetable,
}: ParentTimetableTableProps) {
  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Day
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Time
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Subject
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Teacher
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Room
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {timetable.map((item) => (
                <tr
                  key={item.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <span className="font-medium text-gray-900">
                      {item.day}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.time}
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-medium text-gray-900">
                      {item.subject}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.teacher}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.room}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {timetable.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-gray-500">
            No timetable records found.
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {timetable.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {item.subject}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {item.day}
                </p>
              </div>

              <div className="rounded-lg bg-[#e6f4f2] px-3 py-1.5 text-xs font-medium text-[#01796F]">
                {item.time}
              </div>
            </div>

            <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <UserRound size={16} className="text-gray-400" />
                {item.teacher}
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-400" />
                {item.room}
              </div>
            </div>
          </div>
        ))}

        {timetable.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center text-sm text-gray-500">
            No timetable records found.
          </div>
        )}
      </div>
    </div>
  );
}