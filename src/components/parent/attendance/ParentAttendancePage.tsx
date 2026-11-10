"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  Clock3,
  UserCheck,
  UserX,
} from "lucide-react";

import { fetchChildAttendance } from "@/lib/attendance-api";
import { useParentProfile } from "@/lib/useParentProfile";
import type { AttendanceRecord } from "@/types/attendance";

import ParentAttendanceTable from "./ParentAttendanceTable";

export default function ParentAttendancePage() {
  const {
    children,
    loading: profileLoading,
    error: profileError,
  } = useParentProfile();

  const [selectedChildId, setSelectedChildId] = useState<number | null>(
    null
  );

  const selectedStudent = useMemo(
    () =>
      children.find((child) => child.id === selectedChildId) ??
      children[0],
    [children, selectedChildId]
  );

  const selectedStudentId = selectedStudent?.id ?? null;

  const [attendance, setAttendance] = useState<{
    studentId: number | null;
    records: AttendanceRecord[];
    error: string;
  }>({
    studentId: null,
    records: [],
    error: "",
  });

  useEffect(() => {
    if (selectedStudentId === null) return;

    let active = true;

    fetchChildAttendance(selectedStudentId)
      .then((data) => {
        if (!active) return;
        setAttendance({
          studentId: selectedStudentId,
          records: data,
          error: "",
        });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setAttendance({
          studentId: selectedStudentId,
          records: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load attendance records.",
        });
      });

    return () => {
      active = false;
    };
  }, [selectedStudentId]);

  // A stored result belongs to the previously selected child until the new
  // request resolves, so treat that mismatch as loading instead of showing
  // another child's rows.
  const recordsLoading =
    selectedStudentId !== null &&
    attendance.studentId !== selectedStudentId;

  const records = recordsLoading ? [] : attendance.records;
  const recordsError = recordsLoading ? "" : attendance.error;

  const present = records.filter(
    (record) => record.status === "Present"
  ).length;

  const absent = records.filter(
    (record) => record.status === "Absent"
  ).length;

  const late = records.filter(
    (record) => record.status === "Late"
  ).length;

  const percentage =
    records.length > 0
      ? Math.round(((present + late) / records.length) * 100)
      : 0;

  const stats = [
    {
      title: "Attendance Rate",
      value: `${percentage}%`,
      icon: CalendarCheck,
      iconClass: "bg-[#e6f4f2] text-[#01796f]",
    },
    {
      title: "Present",
      value: present,
      icon: UserCheck,
      iconClass: "bg-[#e6f4f2] text-[#01796f]",
    },
    {
      title: "Absent",
      value: absent,
      icon: UserX,
      iconClass: "bg-[#e6f4f2] text-[#01796f]",
    },
    {
      title: "Late",
      value: late,
      icon: Clock3,
      iconClass: "bg-[#e6f4f2] text-[#01796f]",
    },
  ];

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Attendance
      </h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        View your child&apos;s attendance records and attendance
        performance.
      </p>
    </div>
  );

  if (profileLoading) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading attendance...
          </p>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="space-y-5">
        {header}

        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {profileError}
        </div>
      </div>
    );
  }

  if (!selectedStudent) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Child data not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            No attendance information is available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Heading */}
      {header}

      {/* Child Information + Selector */}
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">
            Selected Child
          </p>

          <h2 className="mt-2 text-xl font-bold text-gray-800">
            {selectedStudent.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {selectedStudent.className} - Section{" "}
            {selectedStudent.section}
            {" • "}
            Roll No: {selectedStudent.rollNo}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <label
            htmlFor="child"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select Child
          </label>

          <select
            id="child"
            value={selectedStudent.id}
            onChange={(e) =>
              setSelectedChildId(Number(e.target.value))
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/20"
          >
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconClass}`}
                >
                  <Icon size={20} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-900">
                {recordsLoading ? "-" : stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Attendance Records */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Attendance Records
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Attendance records for {selectedStudent.name}.
          </p>
        </div>

        {recordsError && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {recordsError}
          </div>
        )}

        {recordsLoading ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
            <p className="mt-4 text-sm text-gray-500">
              Loading attendance records...
            </p>
          </div>
        ) : (
          <ParentAttendanceTable records={records} />
        )}
      </div>
    </div>
  );
}
