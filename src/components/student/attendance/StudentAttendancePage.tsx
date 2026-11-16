"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  X,
} from "lucide-react";

import { fetchStudentAttendance } from "@/lib/student-api";
import type { AttendanceStatus } from "@/types/attendance";

import StudentStatCards from "../StudentStatCards";
import StudentAttendanceTable from "./StudentAttendanceTable";

type AttendanceEntry = {
  id: number;
  date: string;
  status: AttendanceStatus;
};

export default function StudentAttendancePage() {
  const [search, setSearch] = useState("");

  const [state, setState] = useState<{
    loaded: boolean;
    records: AttendanceEntry[];
    error: string;
  }>({
    loaded: false,
    records: [],
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchStudentAttendance()
      .then((records) => {
        if (!active) return;
        setState({ loaded: true, records, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          records: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load your attendance.",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredRecords = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return state.records;

    return state.records.filter(
      (record) =>
        record.date.toLowerCase().includes(value) ||
        record.status.toLowerCase().includes(value)
    );
  }, [search, state.records]);

  const presentCount = state.records.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = state.records.filter(
    (record) => record.status === "Absent"
  ).length;

  const lateCount = state.records.filter(
    (record) => record.status === "Late"
  ).length;

  const attendancePercentage =
    state.records.length > 0
      ? Math.round(
          ((presentCount + lateCount) / state.records.length) * 100
        )
      : 0;

  const stats = [
    { title: "Present", value: presentCount, icon: CheckCircle2 },
    { title: "Absent", value: absentCount, icon: X },
    { title: "Late", value: lateCount, icon: Clock3 },
    { title: "Attendance Rate", value: `${attendancePercentage}%`, icon: CalendarCheck },
  ];

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Attendance</h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        View your attendance records and attendance summary.
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
            Loading your attendance...
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

      <StudentAttendanceTable
        records={filteredRecords}
        search={search}
        setSearch={setSearch}
        total={state.records.length}
      />
    </div>
  );
}
