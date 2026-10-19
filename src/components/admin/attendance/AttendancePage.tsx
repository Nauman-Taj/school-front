
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  CheckCircle2,
  XCircle,
  Clock3,
  TrendingUp,
} from "lucide-react";

import AttendanceCalendar from "@/components/admin/attendance/AttendanceCalendar";
import AttendanceTable from "@/components/admin/attendance/AttendanceTable";
import { fetchAttendance } from "@/lib/attendance-api";
import type { AttendanceRecord } from "@/types/attendance";

export default function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAttendance = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const records = await fetchAttendance();
      setAttendanceRecords(records);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load attendance records.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAttendance();
  }, [loadAttendance]);

  const present = attendanceRecords.filter(
    (record) => record.status === "Present",
  ).length;

  const absent = attendanceRecords.filter(
    (record) => record.status === "Absent",
  ).length;

  const late = attendanceRecords.filter(
    (record) => record.status === "Late",
  ).length;

  const leave = attendanceRecords.filter(
    (record) => record.status === "Leave",
  ).length;

  const totalRecords = attendanceRecords.length;

  // Attendance rate excludes approved leave from the denominator.
  const countedRecords = totalRecords - leave;
  const attendanceRate =
    countedRecords > 0
      ? Math.round(((present + late) / countedRecords) * 100)
      : 0;

  const stats = [
    {
      title: "Present",
      value: present,
      description: "Students & teachers",
      icon: CheckCircle2,
    },
    {
      title: "Absent",
      value: absent,
      description: "Students & teachers",
      icon: XCircle,
    },
    {
      title: "Late",
      value: late,
      description: "Students & teachers",
      icon: Clock3,
    },
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      ispercentage: true,
      description: "Based on loaded records",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Attendance
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Monitor student and teacher attendance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadAttendance()}
          disabled={loading}
          className="w-fit rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            Unable to load attendance
          </p>
          <p className="mt-1 text-sm text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => void loadAttendance()}
            className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    {loading ? "0" : stat.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Attendance Type */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Attendance Records
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/attendance/students"
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-[#01796f] hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-[#e6f4f2] p-3 text-[#01796f]">
                <GraduationCap size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#01796f]">
                  Student Attendance
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Mark and review student attendance
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/attendance/teachers"
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-[#01796f] hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-[#e6f4f2] p-3 text-[#01796f]">
                <Users size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#01796f]">
                  Teacher Attendance
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Mark and review teacher attendance
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Database-backed calendar */}
      <AttendanceCalendar records={attendanceRecords} />

      {/* Recent Attendance */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Attendance
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Records retrieved from the backend.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            Loading attendance records...
          </div>
        ) : (
          <AttendanceTable
            records={attendanceRecords}
            onDeleted={() => void loadAttendance()}
          />
        )}
      </div>
    </div>
  );
}
