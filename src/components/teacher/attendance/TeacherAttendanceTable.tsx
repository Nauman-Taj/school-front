"use client";

import {
  CheckCircle2,
  Clock3,
  Plane,
  XCircle,
} from "lucide-react";

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

const statusIcons: Record<AttendanceStatus, typeof CheckCircle2> = {
  Present: CheckCircle2,
  Absent: XCircle,
  Late: Clock3,
  Leave: Plane,
};

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

export default function TeacherAttendanceTable({
  attendance,
  onStatusChange,
  onSave,
  saving,
}: Props) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-5 py-4 font-semibold">Student</th>
              <th className="px-5 py-4 font-semibold">Class</th>
              <th className="px-5 py-4 font-semibold">Roll No</th>
              <th className="px-5 py-4 font-semibold">Attendance Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {attendance.length > 0 ? (
              attendance.map((item) => {
                const StatusIcon =
                  item.status ? statusIcons[item.status] : null;

                return (
                  <tr
                    key={item.studentId}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {item.name}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {item.className}-{item.section}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {item.rollNo}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {StatusIcon && (
                          <StatusIcon size={16} className="text-gray-400" />
                        )}

                        <select
                          aria-label={`Attendance status for ${item.name}`}
                          value={item.status ?? ""}
                          onChange={(event) =>
                            onStatusChange(
                              item.studentId,
                              event.target
                                .value as AttendanceStatus
                            )
                          }
                          className={`rounded-full border-0 px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-[#01796F]/20 ${statusClass(item.status)}`}
                        >
                          <option value="">Not marked</option>

                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-8 text-center text-sm text-gray-500"
                >
                  No attendance records found for this class and date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end border-t border-gray-100 px-5 py-4">
        <button
          type="button"
          onClick={onSave}
          disabled={saving || attendance.length === 0}
          className="rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Attendance"}
        </button>
      </div>
    </div>
  );
}
