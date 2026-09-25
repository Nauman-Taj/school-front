"use client";

import { useMemo, useState } from "react";

import { getSession } from "@/lib/auth";

import { teachers } from "@/data/teachers";
import { timetable } from "@/data/timetable";

import TeacherTimetableTable from "./TeacherTimetableTable";

const days = [
  "All",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

export default function TeacherTimetablePage() {
  const session = getSession();

  const [selectedDay, setSelectedDay] = useState("All");

  const currentTeacher =
    teachers.find(
      (teacher) =>
        teacher.email === session?.email ||
        teacher.name === session?.name
    ) ?? teachers[0];

  const teacherTimetable = useMemo(() => {
    return timetable.filter(
      (item) => item.teacherId === currentTeacher.id
    );
  }, [currentTeacher.id]);

  const filteredTimetable =
    selectedDay === "All"
      ? teacherTimetable
      : teacherTimetable.filter(
          (item) => item.day === selectedDay
        );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Timetable
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your teaching schedule and assigned classes.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Day
        </label>

        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="w-full max-w-md rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f]"
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <TeacherTimetableTable
        timetable={filteredTimetable}
      />
    </div>
  );
}