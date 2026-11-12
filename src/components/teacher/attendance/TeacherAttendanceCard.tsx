"use client";

import type { TeacherAttendanceRow } from "@/lib/teacher-api";
import type { AttendanceStatus } from "@/types/attendance";

type Props = {
  attendance: TeacherAttendanceRow[];
  onStatusChange: (
    studentId: number,
    status: AttendanceStatus
  ) => void;
  onSave: () => void;
  saving: boolean;
};

const statuses: AttendanceStatus[] = [
  "Present",
  "Absent",
  "Late",
  "Leave",
];

function statusClass(status: AttendanceStatus | null) {
  switch (status) {
    case "Present":
      return "bg-green-50 text-green-600";
    case "Absent":
      return "bg-red-50 text-red-600";
    case "Late":
      return "bg-yellow-50 text-yellow-600";
    case "Leave":
      return "bg-blue-50 text-blue-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function TeacherAttendanceCard({
  attendance,
  onStatusChange,
  onSave,
  saving,
}: Props) {
  return (
    <div className="space-y-3 md:hidden">
      {attendance.length > 0 ? (
        <>
          {attendance.map((item) => (
            <div
              key={item.studentId}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-semibold text-gray-900">
                    {item.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.className}-{item.section} · Roll No.{" "}
                    {item.rollNo}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusClass(item.status)}`}
                >
                  {item.status ?? "Not marked"}
                </span>
              </div>

              <div className="mt-4">
                <label
                  htmlFor={`attendance-${item.studentId}`}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Change status
                </label>

                <select
                  id={`attendance-${item.studentId}`}
                  value={item.status ?? ""}
                  onChange={(event) =>
                    onStatusChange(
                      item.studentId,
                      event.target.value as AttendanceStatus
                    )
                  }
                  className={`w-full rounded-full border-0 px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-[#0176f]/20 ${statusClass(item.status)}`}
                >
                  <option value="">Not marked</option>

                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onSave}
              disabled={saving || attendance.length === 0}
              className="rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
          No attendance records found for this class and date.
        </div>
      )}
    </div>
  );
}
