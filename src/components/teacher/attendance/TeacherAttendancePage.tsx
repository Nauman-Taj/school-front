"use client";

import { useMemo, useState } from "react";

import { getSession } from "@/lib/auth";

import { attendance as initialAttendance } from "@/data/attendance";
import { subjects } from "@/data/subjects";

import TeacherAttendanceTable from "./TeacherAttendanceTable";
import TeacherAttendanceCard from "./TeacherAttendanceCard";

export default function TeacherAttendancePage() {
  const session = getSession();

  const currentTeacherId =
    subjects.find(
      (subject) => subject.teacher === session?.name
    )?.teacherId ?? "T001";

  const teacherClassKeys = useMemo(() => {
    return new Set(
      subjects
        .filter((subject) => subject.teacherId === currentTeacherId)
        .map(
          (subject) =>
            `${subject.className.replace("Grade ", "")}-${subject.section}`
        )
    );
  }, [currentTeacherId]);

  const availableClasses = Array.from(teacherClassKeys);

  const [selectedClass, setSelectedClass] = useState("All");
  const [date, setDate] = useState("2026-09-08");

  const getFormattedDate = (value: string) => {
    const [year, month, day] = value.split("-");

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

    return `${day} ${months[Number(month) - 1]} ${year}`;
  };

  const selectedDate = getFormattedDate(date);

  const teacherAttendance = useMemo(() => {
    return initialAttendance.filter(
      (item) =>
        item.role === "Student" &&
        item.class &&
        teacherClassKeys.has(item.class) &&
        item.date === selectedDate
    );
  }, [teacherClassKeys, selectedDate]);

  const filteredAttendance =
    selectedClass === "All"
      ? teacherAttendance
      : teacherAttendance.filter(
          (item) => item.class === selectedClass
        );

  const handleMarkAllPresent = () => {
    console.log(
      "Marking attendance as present:",
      filteredAttendance
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Attendance
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Mark attendance for students in your assigned classes.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Class
            </label>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f]"
            >
              <option value="All">All</option>

              {availableClasses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleMarkAllPresent}
              className="w-full rounded-xl bg-[#01796f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
            >
              Mark All Present
            </button>
          </div>
        </div>
      </div>

      <TeacherAttendanceTable
        attendance={filteredAttendance}
      />

      <TeacherAttendanceCard
        attendance={filteredAttendance}
      />
    </div>
  );
}