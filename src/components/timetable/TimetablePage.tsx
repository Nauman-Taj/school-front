"use client";

import { useState } from "react";
import { CalendarDays, Clock3, UserRound, MapPin } from "lucide-react";
import { timetable } from "@/data/timetable";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

const times = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"];

const classes = [
  "All Classes",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
];

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState("All Classes");

  const filteredTimetable =
    selectedClass === "All Classes"
      ? timetable
      : timetable.filter((entry) => entry.className === selectedClass);

  const getEntry = (day: string, time: string) => {
    return filteredTimetable.find(
      (entry) => entry.day === day && entry.time === time
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timetable</h1>
          <p className="mt-1 text-sm text-gray-500">
            View the weekly class schedule.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-[#01796F]" />

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
          >
            {classes.map((className) => (
              <option key={className}>{className}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Timetable */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="w-28 px-4 py-4 text-left text-sm font-semibold text-gray-600">
                  Time
                </th>

                {days.map((day) => (
                  <th
                    key={day}
                    className="px-4 py-4 text-center text-sm font-semibold text-gray-700"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {times.map((time) => (
                <tr key={time} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-4 align-top">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <Clock3 size={15} className="text-[#01796F]" />
                      {time}
                    </div>
                  </td>

                  {days.map((day) => {
                    const entry = getEntry(day, time);

                    return (
                      <td key={`${day}-${time}`} className="p-3 align-top">
                        {entry ? (
                          <div className="rounded-xl border border-[#01796F]/10 bg-[#e6f4f2] p-3">
                            <p className="font-semibold text-[#01796F]">
                              {entry.subject}
                            </p>

                            <div className="mt-2 space-y-1.5 text-xs text-gray-600">
                              <div className="flex items-center gap-1.5">
                                <UserRound size={13} />
                                {entry.teacher}
                              </div>

                              <div className="flex items-center gap-1.5">
                                <MapPin size={13} />
                                {entry.room}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-gray-200 text-xs text-gray-400">
                            No class
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Timetable */}
      <div className="space-y-4 md:hidden">
        {days.map((day) => {
          const dayEntries = filteredTimetable.filter(
            (entry) => entry.day === day
          );

          return (
            <div
              key={day}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h2 className="font-semibold text-gray-900">{day}</h2>
              </div>

              <div className="divide-y divide-gray-100">
                {dayEntries.length > 0 ? (
                  dayEntries.map((entry) => (
                    <div key={entry.id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[#01796F]">
                            {entry.subject}
                          </p>

                          <div className="mt-2 space-y-1.5 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <UserRound size={13} />
                              {entry.teacher}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <MapPin size={13} />
                              {entry.room}
                            </div>
                          </div>
                        </div>

                        <span className="shrink-0 rounded-lg bg-[#e6f4f2] px-2.5 py-1 text-xs font-medium text-[#01796F]">
                          {entry.time}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-5 text-center text-sm text-gray-400">
                    No classes scheduled.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}