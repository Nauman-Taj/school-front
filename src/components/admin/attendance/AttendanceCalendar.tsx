
"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type { AttendanceRecord } from "@/types/attendance";

type AttendanceCalendarProps = {
  records: AttendanceRecord[];
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(day: number, month: number, year: number) {
  return `${String(day).padStart(2, "0")} ${monthNames[month]} ${year}`;
}

export default function AttendanceCalendar({
  records,
}: AttendanceCalendarProps) {
  const [date, setDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return formatDate(
      today.getDate(),
      today.getMonth(),
      today.getFullYear(),
    );
  });

  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthName = date.toLocaleString("default", {
    month: "long",
  });

  const getRecords = (day: number) =>
    records.filter(
      (record) => record.date === formatDate(day, month, year),
    );

  const selectedRecords = records.filter(
    (record) => record.date === selectedDate,
  );

  const changeMonth = (amount: number) => {
    const nextDate = new Date(year, month + amount, 1);
    setDate(nextDate);

    // Preserve the selected day when possible; otherwise select day 1.
    const selectedParts = selectedDate.match(
      /^(\d{2}) ([A-Za-z]{3}) (\d{4})$/,
    );

    if (selectedParts) {
      const selectedMonth = monthNames.indexOf(selectedParts[2]);
      const selectedYear = Number(selectedParts[3]);

      if (selectedMonth === month && selectedYear === year) {
        setSelectedDate(
          formatDate(1, nextDate.getMonth(), nextDate.getFullYear()),
        );
      }
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#e6f4f2] p-3 text-[#01796f]">
            <CalendarDays size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Attendance Calendar
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="min-w-[150px] text-center text-sm font-semibold">
            {monthName} {year}
          </span>

          <button
            type="button"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">
        <div className="grid grid-cols-7 bg-gray-50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div
                key={day}
                className="py-3 text-center text-xs font-semibold text-gray-500"
              >
                {day}
              </div>
            ),
          )}
        </div>

        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="min-h-[85px] border-r border-t border-gray-100 bg-gray-50/30"
            />
          ))}

          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const dayRecords = getRecords(day);
            const dateString = formatDate(day, month, year);
            const selected = dateString === selectedDate;

            const present = dayRecords.filter(
              (record) => record.status === "Present",
            ).length;

            const late = dayRecords.filter(
              (record) => record.status === "Late",
            ).length;

            const absent = dayRecords.filter(
              (record) => record.status === "Absent",
            ).length;

            const leave = dayRecords.filter(
              (record) => record.status === "Leave",
            ).length;

            return (
              <button
                type="button"
                key={day}
                onClick={() => setSelectedDate(dateString)}
                aria-pressed={selected}
                className={`relative min-h-[85px] border-r border-t border-gray-100 p-2 text-left transition ${
                  selected ? "bg-[#e6f4f2]" : "hover:bg-gray-50"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                    selected
                      ? "bg-[#01796f] font-semibold text-white"
                      : "text-gray-700"
                  }`}
                >
                  {day}
                </span>

                {dayRecords.length > 0 && (
                  <div className="absolute bottom-2 left-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px]">
                    {present > 0 && (
                      <span className="text-green-600">
                        ● {present}
                      </span>
                    )}

                    {late > 0 && (
                      <span className="text-yellow-600">
                        ● {late}
                      </span>
                    )}

                    {absent > 0 && (
                      <span className="text-red-600">
                        ● {absent}
                      </span>
                    )}

                    {leave > 0 && (
                      <span className="text-blue-600">
                        ● {leave}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date */}
      <div className="mt-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-semibold text-gray-900">
            {selectedDate || "Select a date"}
          </h3>

          {selectedDate && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
              {selectedRecords.length} records
            </span>
          )}
        </div>

        {selectedRecords.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {selectedRecords.map((record) => (
              <div
                key={`${record.role}-${record.id}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {record.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {record.role === "Student"
                      ? `${record.className}-${record.section}`
                      : record.department}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    record.status === "Present"
                      ? "bg-green-50 text-green-700"
                      : record.status === "Late"
                        ? "bg-yellow-50 text-yellow-700"
                        : record.status === "Leave"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-red-50 text-red-700"
                  }`}
                >
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 py-7 text-center text-sm text-gray-500">
            No attendance records for this date.
          </div>
        )}
      </div>
    </div>
  );
}
