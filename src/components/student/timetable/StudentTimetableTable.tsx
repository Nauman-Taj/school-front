"use client";

import {
  BookOpen,
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react";

import { TimetableEntry } from "@/types/timetable";

type StudentTimetableTableProps = {
  timetable: TimetableEntry[];
};

const days: TimetableEntry["day"][] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export default function StudentTimetableTable({
  timetable,
}: StudentTimetableTableProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Weekly Timetable
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your scheduled classes for the week.
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[800px]">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                Day
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                Time
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                Subject
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                Teacher
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                Room
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {days.map((day) => {
              const dayEntries = timetable.filter(
                (entry) => entry.day === day
              );

              return dayEntries.map((entry) => (
                <tr
                  key={entry.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <span className="font-medium text-gray-900">
                      {entry.day}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock3
                        size={16}
                        className="text-[#01796f]"
                        strokeWidth={1.8}
                      />

                      <span>
                        {entry.startTime} - {entry.endTime}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <BookOpen
                        size={17}
                        className="text-[#01796f]"
                        strokeWidth={1.8}
                      />

                      <span className="font-medium text-gray-900">
                        {entry.subject}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <UserRound
                        size={16}
                        className="text-gray-400"
                        strokeWidth={1.8}
                      />

                      {entry.teacher}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin
                        size={16}
                        className="text-gray-400"
                        strokeWidth={1.8}
                      />

                      {entry.room}
                    </div>
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {days.map((day) => {
          const dayEntries = timetable.filter(
            (entry) => entry.day === day
          );

          return dayEntries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#01796f]">
                    {entry.day}
                  </p>

                  <h3 className="mt-1 font-semibold text-gray-900">
                    {entry.subject}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 rounded-lg bg-[#e6f4f2] px-2.5 py-1.5 text-xs font-medium text-[#01796f]">
                  <Clock3 size={14} />
                  {entry.startTime}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400">
                    Time
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {entry.startTime} - {entry.endTime}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Room
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {entry.room}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-xs text-gray-400">
                    Teacher
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {entry.teacher}
                  </p>
                </div>
              </div>
            </div>
          ));
        })}

        {timetable.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No timetable entries found.
          </div>
        )}
      </div>

      {timetable.length === 0 && (
        <div className="hidden py-10 text-center text-sm text-gray-500 md:block">
          No timetable entries found.
        </div>
      )}
    </div>
  );
}