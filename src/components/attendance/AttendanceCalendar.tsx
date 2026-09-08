"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { attendanceData } from "@/data/attendance";

export default function AttendanceCalendar() {
  const [date, setDate] = useState(new Date(2026, 8, 1));
  const [selectedDate, setSelectedDate] = useState("08 Sep 2026");

  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthName = date.toLocaleString("default", {
    month: "long",
  });

  const formatDate = (day: number) => {
    const months = [
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

    return `${String(day).padStart(2, "0")} ${months[month]} ${year}`;
  };

  const getRecords = (day: number) =>
    attendanceData.filter(
      (record) => record.date === formatDate(day)
    );

  const selectedRecords = attendanceData.filter(
    (record) => record.date === selectedDate
  );

  const changeMonth = (amount: number) => {
    setDate(new Date(year, month + amount, 1));
    setSelectedDate("");
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
            onClick={() => changeMonth(-1)}
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="min-w-[130px] text-center text-sm font-semibold">
            {monthName} {year}
          </span>

          <button
            onClick={() => changeMonth(1)}
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">

        {/* Weekdays */}
        <div className="grid grid-cols-7 bg-gray-50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div
                key={day}
                className="py-3 text-center text-xs font-semibold text-gray-500"
              >
                {day}
              </div>
            )
          )}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="min-h-[85px] border-t border-r border-gray-100 bg-gray-50/30"
            />
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const records = getRecords(day);
            const dateString = formatDate(day);
            const selected = dateString === selectedDate;

            const present = records.filter(
              (r) => r.status === "Present"
            ).length;

            const late = records.filter(
              (r) => r.status === "Late"
            ).length;

            const absent = records.filter(
              (r) => r.status === "Absent"
            ).length;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(dateString)}
                className={`relative min-h-[85px] border-t border-r border-gray-100 p-2 text-left transition ${selected
                  ? "bg-[#e6f4f2]"
                  : "hover:bg-gray-50"
                  }`}
              >
                {/* Date */}
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${selected
                    ? "bg-[#01796f] font-semibold text-white"
                    : "text-gray-700"
                    }`}
                >
                  {day}
                </span>

                {/* Attendance Indicators */}
                {records.length > 0 && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-3 text-[10px]">
                    {present > 0 && (
                      <p className="text-green-600">
                        ● {present}
                      </p>
                    )}

                    {late > 0 && (
                      <p className="text-yellow-600">
                        ● {late}
                      </p>
                    )}

                    {absent > 0 && (
                      <p className="text-red-600">
                        ● {absent}
                      </p>
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
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {selectedDate || "Select a date"}
            </h3>

          </div>

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
                key={record.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {record.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {record.role === "Student"
                      ? record.class
                      : record.department}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${record.status === "Present"
                    ? "bg-green-50 text-green-700"
                    : record.status === "Late"
                      ? "bg-yellow-50 text-yellow-700"
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

