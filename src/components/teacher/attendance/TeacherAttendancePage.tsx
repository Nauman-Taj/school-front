"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  Plane,
  X,
} from "lucide-react";

import {
  fetchTeacherAttendanceSheet,
  markTeacherAttendance,
  updateTeacherAttendance,
} from "@/lib/teacher-api";
import type { TeacherAttendanceRow } from "@/lib/teacher-api";
import type { AttendanceStatus } from "@/types/attendance";

import TeacherAttendanceTable from "./TeacherAttendanceTable";
import TeacherAttendanceCard from "./TeacherAttendanceCard";

type SaveState = {
  type: "success" | "error";
  message: string;
} | null;

export default function TeacherAttendancePage() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedClass, setSelectedClass] = useState("All");

  const [sheet, setSheet] = useState<{
    classes: { className: string; section: string }[];
    students: TeacherAttendanceRow[];
  }>({
    classes: [],
    students: [],
  });

  const [overrides, setOverrides] = useState<
    Record<number, AttendanceStatus>
  >({});

  const [loadedDate, setLoadedDate] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>(null);

  const reloadSheet = useCallback(async (day: string) => {
    try {
      const data = await fetchTeacherAttendanceSheet(day);

      setSheet({ classes: data.classes, students: data.students });
      setOverrides({});
      setSaveState(null);
      setLoadedDate(day);
    } catch (err: unknown) {
      setSheet({ classes: [], students: [] });
      setLoadedDate(day);
      setSaveState({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Unable to load the attendance sheet.",
      });
    }
  }, []);

  useEffect(() => {
    let active = true;

    fetchTeacherAttendanceSheet(date)
      .then((data) => {
        if (!active) return;
        setSheet({ classes: data.classes, students: data.students });
        setOverrides({});
        setSaveState(null);
        setLoadedDate(date);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setSheet({ classes: [], students: [] });
        setLoadedDate(date);
        setSaveState({
          type: "error",
          message:
            err instanceof Error
              ? err.message
              : "Unable to load the attendance sheet.",
        });
      });

    return () => {
      active = false;
    };
  }, [date]);

  const loading = loadedDate !== date;

  const rows = useMemo(
    () =>
      sheet.students.map((student) => ({
        ...student,
        status: overrides[student.studentId] ?? student.status,
      })),
    [sheet.students, overrides]
  );

  const filteredRows = useMemo(
    () =>
      selectedClass === "All"
        ? rows
        : rows.filter(
            (row) =>
              `${row.className}-${row.section}` === selectedClass
          ),
    [rows, selectedClass]
  );

  const handleStatusChange = (
    studentId: number,
    status: AttendanceStatus
  ) => {
    setOverrides((current) => ({ ...current, [studentId]: status }));
    setSaveState(null);
  };

  const handleMarkAllPresent = () => {
    if (filteredRows.length === 0) return;

    setOverrides((current) => {
      const next = { ...current };

      for (const row of filteredRows) {
        next[row.studentId] = "Present";
      }

      return next;
    });

    setSaveState(null);
  };

  const handleSave = async () => {
    const changed = Object.entries(overrides);

    if (changed.length === 0) {
      setSaveState({
        type: "error",
        message: "There are no attendance changes to save.",
      });
      return;
    }

    setSaving(true);

    try {
      for (const [studentId, status] of changed) {
        const row = sheet.students.find(
          (student) => student.studentId === Number(studentId)
        );

        if (!row) continue;

        if (row.recordId) {
          await updateTeacherAttendance(row.recordId, status);
        } else {
          await markTeacherAttendance(row.studentId, date, status);
        }
      }

      await reloadSheet(date);

      setSaveState({
        type: "success",
        message: `Attendance saved for ${changed.length} student(s).`,
      });
    } catch (err: unknown) {
      setSaveState({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Could not save the attendance. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const presentCount = filteredRows.filter(
    (row) => row.status === "Present"
  ).length;

  const absentCount = filteredRows.filter(
    (row) => row.status === "Absent"
  ).length;

  const lateCount = filteredRows.filter(
    (row) => row.status === "Late"
  ).length;

  const leaveCount = filteredRows.filter(
    (row) => row.status === "Leave"
  ).length;

  const markedCount = filteredRows.filter(
    (row) => row.status !== null
  ).length;

  const attendancePercentage =
    filteredRows.length > 0
      ? Math.round(
          ((presentCount + lateCount) / filteredRows.length) * 100
        )
      : 0;

  const formatDate = (value: string) =>
    new Date(`${value}T00:00:00.000Z`).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Attendance
      </h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        Mark attendance for the classes assigned to you.
      </p>
    </div>
  );

  return (
    <div className="space-y-5">
      {header}

      {/* Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
          <div>
            <label
              htmlFor="attendanceClass"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Class
            </label>

            <select
              id="attendanceClass"
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/20"
            >
              <option value="All">All Classes</option>

              {sheet.classes.map((schoolClass) => {
                const key = `${schoolClass.className}-${schoolClass.section}`;

                return (
                  <option key={key} value={key}>
                    {key}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label
              htmlFor="attendanceDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Date
            </label>

            <input
              id="attendanceDate"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/20"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleMarkAllPresent}
              disabled={filteredRows.length === 0}
              className="w-full whitespace-nowrap rounded-full bg-[#01796f] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Mark All Present
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryCard
          title="Present"
          value={presentCount}
          loading={loading}
          icon={<Check size={20} />}
          iconClass="text-[#01796f]"
        />
        <SummaryCard
          title="Absent"
          value={absentCount}
          loading={loading}
          icon={<X size={20} />}
          iconClass="text-[#01796F]"
        />
        <SummaryCard
          title="Late"
          value={lateCount}
          loading={loading}
          icon={<Clock3 size={20} />}
          iconClass="text-[#01796F]"
        />
        <SummaryCard
          title="Leave"
          value={leaveCount}
          loading={loading}
          icon={<Plane size={20} />}
          iconClass="text-[#01796F]"
        />
        <SummaryCard
          title="Attendance"
          value={`${attendancePercentage}%`}
          loading={loading}
          icon={<CalendarDays size={20} />}
          iconClass="text-[#01796f]"
        />
      </div>

      {/* Records */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Attendance Records
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {markedCount === 0 ? (
              <>
                No attendance has been marked for {formatDate(date)} yet.
                Select a status for each student below and save your changes.
              </>
            ) : (
              <>
                Select a status for each student, then save your changes.
                {markedCount} of {filteredRows.length} student(s) marked for
                this date.
              </>
            )}
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
            <p className="mt-4 text-sm text-gray-500">
              Loading the attendance sheet...
            </p>
          </div>
        ) : (
          <>
            <TeacherAttendanceTable
              attendance={filteredRows}
              onStatusChange={handleStatusChange}
              onSave={handleSave}
              saving={saving}
            />

            <TeacherAttendanceCard
              attendance={filteredRows}
              onStatusChange={handleStatusChange}
              onSave={handleSave}
              saving={saving}
            />
          </>
        )}

        {saveState && (
          <p
            role="status"
            className={`mt-3 rounded-xl border px-4 py-3 text-sm ${
              saveState.type === "success"
                ? "border-[#01796f]/15 bg-[#e6f4f2] text-[#015f58]"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {saveState.message}
          </p>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  loading,
  icon,
  iconClass,
}: {
  title: string;
  value: string | number;
  loading: boolean;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          {loading ? (
            <div className="mt-2 h-7 w-12 animate-pulse rounded-lg bg-gray-100" />
          ) : (
            <h2 className="mt-2 text-2xl font-bold text-gray-800">{value}</h2>
          )}
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
