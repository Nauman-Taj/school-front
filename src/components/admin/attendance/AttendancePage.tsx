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
import { attendance } from "@/data/attendance";

export default function AttendancePage() {
  const present = attendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absent = attendance.filter(
    (record) => record.status === "Absent"
  ).length;

  const late = attendance.filter(
    (record) => record.status === "Late"
  ).length;

  const leave = attendance.filter(
    (record) => record.status === "Leave"
  ).length;

  const totalRecords = attendance.length;

  const attendanceRate =
    totalRecords > 0
      ? Math.round((present / totalRecords) * 100)
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
      description: "Based on current records",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Attendance
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Monitor student and teacher attendance.
        </p>
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
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    {stat.value}
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
          {/* Student Attendance */}
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
              </div>
            </div>
          </Link>

          {/* Teacher Attendance */}
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
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Calendar */}
      <AttendanceCalendar />

      {/* Recent Attendance */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Attendance
          </h2>
        </div>

        <AttendanceTable records={attendance} />
      </div>
    </div>
  );
}