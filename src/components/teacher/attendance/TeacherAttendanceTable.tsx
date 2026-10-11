
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

export default function TeacherAttendanceTable({
  attendance,
  onStatusChange,
  onSave,
}: Props) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Student
              </th>
              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Class
              </th>
              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Attendance Status
              </th>
            </tr>
          </thead>

          <tbody>
            {attendance.length > 0 ? (
              attendance.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {item.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.className}-{item.section}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      aria-label={`Attendance status for ${item.name}`}
                      value={item.status}
                      onChange={(event) =>
                        onStatusChange(
                          item.id,
                          event.target.value as AttendanceStatus
                        )
                      }
                      className={`rounded-full border-0 px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-[#01796f]/20 ${statusClass(item.status)}`}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-5 py-8 text-center text-sm text-gray-500"
                >
                  No attendance records found for this class and date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end border-t border-gray-200 p-5">
        <button
          type="button"
          onClick={onSave}
          disabled={attendance.length === 0}
          className="rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}
