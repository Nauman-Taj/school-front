
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  ClipboardCheck,
  Wallet,
} from "lucide-react";

import StatCard from "@/components/admin/StatCard";
import EnrollmentChart from "@/components/admin/EnrollmentChart";
import AttendanceChart from "@/components/admin/AttendanceChart";
import FeeChart from "@/components/admin/FeeChart";
import UpcomingEvents from "@/components/admin/UpcomingEvents";

import {
  fetchAttendance,
  fetchStudents,
  fetchTeachers,
  type ApiStudent,
  type ApiTeacher,
} from "@/lib/attendance-api";
import type { AttendanceRecord } from "@/types/attendance";

type DashboardData = {
  students: ApiStudent[];
  teachers: ApiTeacher[];
  attendance: AttendanceRecord[];
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>({
    students: [],
    teachers: [],
    attendance: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [students, teachers, attendance] = await Promise.all([
        fetchStudents(),
        fetchTeachers(),
        fetchAttendance(),
      ]);

      setData({ students, teachers, attendance });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const activeStudents = data.students.filter(
    (student) => student.status.toUpperCase() === "ACTIVE"
  ).length;

  const studentAttendance = data.attendance.filter(
    (record) => record.role === "Student"
  );

  const presentOrLate = studentAttendance.filter(
    (record) =>
      record.status === "Present" || record.status === "Late"
  ).length;

  const attendanceRate =
    studentAttendance.length > 0
      ? Number(
          ((presentOrLate / studentAttendance.length) * 100).toFixed(1)
        )
      : 0;

  const statsData = [
    {
      title: "Total Students",
      value: data.students.length.toLocaleString(),
      change: activeStudents.toLocaleString(),
      description: "active students",
      icon: Users,
    },
    {
      title: "Total Teachers",
      value: data.teachers.length.toLocaleString(),
      change: data.teachers.filter(
        (teacher) => teacher.status.toUpperCase() === "ACTIVE"
      ).length.toLocaleString(),
      description: "active teachers",
      icon: GraduationCap,
    },
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      change: `${attendanceRate}%`,
      description: "recorded attendance",
      icon: ClipboardCheck,
    },
    {
      title: "Fee Collection",
      value: "—",
      change: "—",
      description: "Fees API not connected",
      icon: Wallet,
    },
  ];

  return (
    <main className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Welcome back. Here's what's happening at school.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadDashboard()}
          disabled={loading}
          className="w-fit rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void loadDashboard()}
            className="mt-2 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      {loading && (
        <p className="text-sm text-gray-500">
          Loading dashboard data...
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statsData.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <EnrollmentChart students={data.students} />
        <AttendanceChart records={data.attendance} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <FeeChart />
        <UpcomingEvents />
      </div>
    </main>
  );
}
