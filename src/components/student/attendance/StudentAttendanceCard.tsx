import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import { attendance } from "@/data/attendance";
import { students } from "@/data/students";

export default function StudentAttendanceCard() {
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

  const latestAttendance = studentAttendance[0];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Attendance Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your current attendance summary
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
          <CalendarDays size={21} strokeWidth={1.8} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Attendance
              </p>

              <h3 className="mt-1 text-3xl font-bold text-gray-900">
                {attendancePercentage}%
              </h3>
            </div>

            <span className="text-sm font-medium text-[#01796f]">
              Overall attendance
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-[#01796f] transition-all"
              style={{
                width: `${attendancePercentage}%`,
              }}
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Based on {totalRecords} attendance records
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 p-4">
          <p className="text-sm font-medium text-gray-500">
            Latest Status
          </p>

          {latestAttendance ? (
            <>
              <div className="mt-3 flex items-center gap-2">
                {latestAttendance.status === "Present" && (
                  <CheckCircle2
                    size={20}
                    className="text-[#01796f]"
                    strokeWidth={1.8}
                  />
                )}

                {latestAttendance.status === "Absent" && (
                  <XCircle
                    size={20}
                    className="text-red-500"
                    strokeWidth={1.8}
                  />
                )}

                {latestAttendance.status === "Late" && (
                  <Clock3
                    size={20}
                    className="text-yellow-500"
                    strokeWidth={1.8}
                  />
                )}

                {latestAttendance.status === "Leave" && (
                  <CalendarDays
                    size={20}
                    className="text-blue-500"
                    strokeWidth={1.8}
                  />
                )}

                <span className="font-semibold text-gray-900">
                  {latestAttendance.status}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                {latestAttendance.date}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-gray-500">
              No attendance records available.
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <AttendanceStat
          title="Present"
          value={presentCount}
          icon={
            <CheckCircle2
              size={17}
              className="text-[#01796f]"
              strokeWidth={1.8}
            />
          }
        />

        <AttendanceStat
          title="Absent"
          value={absentCount}
          icon={
            <XCircle
              size={17}
              className="text-red-500"
              strokeWidth={1.8}
            />
          }
        />

        <AttendanceStat
          title="Late"
          value={lateCount}
          icon={
            <Clock3
              size={17}
              className="text-yellow-500"
              strokeWidth={1.8}
            />
          }
        />

        <AttendanceStat
          title="Leave"
          value={leaveCount}
          icon={
            <CalendarDays
              size={17}
              className="text-blue-500"
              strokeWidth={1.8}
            />
          }
        />
      </div>
    </div>
  );
}

function AttendanceStat({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="flex items-center gap-2">
        {icon}

        <span className="text-xs font-medium text-gray-500">
          {title}
        </span>
      </div>

      <p className="mt-2 text-lg font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}