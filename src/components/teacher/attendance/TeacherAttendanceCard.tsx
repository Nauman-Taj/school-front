
"use client";

import type { StudentAttendanceRecord } from "@/types/attendance";

type AttendanceStatus = StudentAttendanceRecord["status"];

type Props = {
  attendance: StudentAttendanceRecord[];
  onStatusChange: (
    id: StudentAttendanceRecord["id"],
    status: AttendanceStatus
  ) => void;
  onSave: () => void;
};

const statuses: AttendanceStatus[] = [
  "Present",
  "Absent",
  "Late",
  "Leave",
];

function statusClass(status: AttendanceStatus) {
  switch (status) {
    case "Present":
      return "bg-green-50 text-green-600";
    case "Absent":
      return "bg-red-50 text-red-600";
    case "Late":
      return "bg-yellow-50 text-yellow-600";
    default:
      return "bg-blue-50 text-blue-600";
  }
}

export default function TeacherAttendanceCard({
  attendance,
  onStatusChange,
  onSave,
}: Props) {
  return (
    <div className="space-y-5 md:hidden">
      {attendance.length > 0 ? (
        attendance.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-semibold text-gray-900">
                  {item.name}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {item.className}-{item.section}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusClass(item.status)}`}
              >
                {item.status}
              </span>
            </div>

            <div className="mt-4">
              <label
                htmlFor={`attendance-${item.id}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Change status
              </label>

              <select
                id={`attendance-${item.id}`}
                value={item.status}
                onChange={(event) =>
                  onStatusChange(
                    item.id,
                    event.target.value as AttendanceStatus
                  )
                }
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          No attendance records found for this class and date.
        </div>
      )}

      {attendance.length > 0 && (
        <div className="flex justify-end border-t border-gray-200 p-5">
          <button
            type="button"
            onClick={onSave}
            className="rounded-full bg-[#01796f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#015f58]"
          >
            Save Attendance
          </button>
        </div>
      )}
    </div>
  );
}
