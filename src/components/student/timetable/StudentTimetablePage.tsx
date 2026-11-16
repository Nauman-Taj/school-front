"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  Clock3,
  School,
} from "lucide-react";

import { fetchStudentTimetable } from "@/lib/student-api";
import type { TimetableEntry } from "@/types/timetable";

import TimetableGrid from "@/components/timetable/TimetableGrid";

import StudentStatCards from "../StudentStatCards";

const weekDays: TimetableEntry["day"][] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export default function StudentTimetablePage() {
  const [selectedDay, setSelectedDay] = useState<"All" | TimetableEntry["day"]>(
    "All"
  );

  const [state, setState] = useState<{
    loaded: boolean;
    timetable: TimetableEntry[];
    error: string;
  }>({
    loaded: false,
    timetable: [],
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchStudentTimetable()
      .then((timetable) => {
        if (!active) return;
        setState({ loaded: true, timetable, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          timetable: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load your timetable.",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const times = useMemo(
    () => Array.from(new Set(state.timetable.map((e) => e.startTime))),
    [state.timetable]
  );

  const classCount = new Set(
    state.timetable.map((entry) => `${entry.className}-${entry.section}`)
  ).size;

  const subjectCount = new Set(state.timetable.map((entry) => entry.subjectId)).size;

  const stats = [
    {
      title: "Periods per Week",
      value: state.timetable.length,
      icon: Clock3,
    },
    { title: "Classes", value: classCount, icon: School },
    { title: "Subjects", value: subjectCount, icon: BookOpen },
    { title: "Teaching Days", value: times.length, icon: CalendarDays },
  ];

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Timetable</h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        View your weekly class timetable and schedule.
      </p>
    </div>
  );

  if (!state.loaded && !state.error) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading your timetable...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {header}

      {state.error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {state.error}
        </div>
      )}

      <StudentStatCards stats={stats} />

      {/* Day filter */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <label
          htmlFor="timetableDay"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Day
        </label>

        <select
          id="timetableDay"
          value={selectedDay}
          onChange={(event) =>
            setSelectedDay(event.target.value as "All" | TimetableEntry["day"])
          }
          className="w-full max-w-md rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/20"
        >
          <option value="All">All Days</option>

          {weekDays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <TimetableGrid
        entries={state.timetable}
        days={selectedDay === "All" ? weekDays : [selectedDay]}
      />
    </div>
  );
}
