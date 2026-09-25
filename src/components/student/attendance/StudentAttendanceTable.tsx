"use client";

import {
  CalendarDays,
  Check,
  Clock3,
  Plane,
  X,
} from "lucide-react";

import { attendance } from "@/data/attendance";
import { students } from "@/data/students";
import { AttendanceRecord } from "@/types/attendance";

function StatusBadge({
  status,
}: {
  status: AttendanceRecord["status"];
}) {
  const styles = {
    Present: "bg-green-50 text-green-700",
    Absent: "bg-red-50 text-red-700",
    Late: "bg-yellow-50 text-yellow-700",
    Leave: "bg-blue-50 text-blue-700",
  };

  const icons = {
    Present: <Check size={14} />,
    Absent: <X size={14} />,
    Late: <Clock3 size={14} />,
    Leave: <Plane size={14} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

export default function StudentAttendanceTable() {
  const currentStudent = students.find(
    (student) => student.id === 1
  );

  const studentAttendance = currentStudent
    ? attendance.filter(
        (record) =>
          record.role === "Student" &&
          record.studentId === currentStudent.id
      )
    : [];

  const presentCount = studentAttendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = studentAttendance.filter(
    (record) => record.status === "Absent"
  ).length;

  const lateCount = studentAttendance.filter(
    (record) => record.status === "Late"
  ).length;

  const leaveCount = studentAttendance.filter(
    (record) => record.status === "Leave"
  ).length;

  const totalRecords = studentAttendance.length;
  const attendedCount = presentCount + lateCount;

  const attendancePercentage =
    totalRecords > 0
      ? Math.round((attendedCount / totalRecords) * 100)
      : 0;

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryCard
          title="Present"
          value={presentCount}
          icon={<Check size={20} />}
          iconClass="text-[#01796f]"
        />

        <SummaryCard
          title="Absent"
          value={absentCount}
          icon={<X size={20} />}
          iconClass="text-red-500"
        />

        <SummaryCard
          title="Late"
          value={lateCount}
          icon={<Clock3 size={20} />}
          iconClass="text-yellow-500"
        />

        <SummaryCard
          title="Leave"
          value={leaveCount}
          icon={<Plane size={20} />}
          iconClass="text-blue-500"
        />

        <SummaryCard
          title="Attendance"
          value={`${attendancePercentage}%`}
          icon={<CalendarDays size={20} />}
          iconClass="text-[#01796f]"
        />
      </div>

      {/* Attendance Records */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Attendance Records
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your attendance history.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Class
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {studentAttendance.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.date}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.class}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={record.status} />
                    </td>
                  </tr>
                ))}

                {studentAttendance.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-sm text-gray-500"
                    >
                      No attendance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div
          className={`rounded-xl bg-[#e6f4f2] p-2.5 ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Attendance record
      </p>
    </div>
  );
}