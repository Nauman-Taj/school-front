import Link from "next/link";
import {
  GraduationCap,
  Users,
} from "lucide-react";

import AttendanceCalendar from "@/components/attendance/AttendanceCalendar";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import { attendanceData } from "@/data/attendance";

export default function AttendancePage() {
  const stats = [
    {
      title: "Present",
      value: "360",
      description: "Students & teachers",
    },
    {
      title: "Absent",
      value: "40",
      description: "Students & teachers",
    },
    {
      title: "Late",
      value: "15",
      description: "Students & teachers",
    },
    {
      title: "Attendance Rate",
      value: "90%",
      description: "Overall attendance",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Attendance
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor student and teacher attendance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <p className="text-sm font-medium text-gray-500">
              {stat.title}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {stat.value}
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Attendance Type */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Attendance Records
          </h2>

          {/* <p className="text-sm text-gray-500">
            View attendance for students and teachers.
          </p> */}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          {/* Student Attendance */}
          <Link
            href="/dashboard/attendance/students"
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

                {/* <p className="mt-1 text-sm text-gray-500">
                  View and manage student attendance records.
                </p> */}
              </div>
            </div>
          </Link>

          {/* Teacher Attendance */}
          <Link
            href="/dashboard/attendance/teachers"
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

                {/* <p className="mt-1 text-sm text-gray-500">
                  View and manage teacher attendance records.
                </p> */}
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

          {/* <p className="text-sm text-gray-500">
            Latest attendance records.
          </p> */}
        </div>

        <AttendanceTable records={attendanceData} />
      </div>

    </div>
  );
}
