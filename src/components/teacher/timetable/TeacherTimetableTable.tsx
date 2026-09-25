"use client";

import { CalendarDays, Clock, MapPin } from "lucide-react";

import { TimetableEntry } from "@/types/timetable";

type TeacherTimetableTableProps = {
  timetable: TimetableEntry[];
};

export default function TeacherTimetableTable({
  timetable,
}: TeacherTimetableTableProps) {
  return (
    <div className="space-y-4">
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Day
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Time
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Class
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Subject
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Room
                </th>
              </tr>
            </thead>

            <tbody>
              {timetable.length > 0 ? (
                timetable.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <span className="font-medium text-gray-900">
                        {item.day}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.startTime} - {item.endTime}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.className} - {item.section}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.subject}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.room}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-sm text-gray-500"
                  >
                    No timetable entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {timetable.length > 0 ? (
          timetable.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
                  <CalendarDays size={19} />
                </div>

                <div className="min-w-0">
                  <h2 className="font-semibold text-gray-900">
                    {item.subject}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.className} - {item.section}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={16}
                    className="text-[#01796f]"
                  />
                  <span>{item.day}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock
                    size={16}
                    className="text-[#01796f]"
                  />
                  <span>
                    {item.startTime} - {item.endTime}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin
                    size={16}
                    className="text-[#01796f]"
                  />
                  <span>Room {item.room}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No timetable entries found.
          </div>
        )}
      </div>
    </div>
  );
}