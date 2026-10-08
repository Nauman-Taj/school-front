"use client";

import { StudentAttendanceRecord } from "@/types/attendance";

type Props = {
  attendance: StudentAttendanceRecord[];
};

export default function TeacherAttendanceTable({
  attendance,
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
                Status
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
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${item.status === "Present"
                        ? "bg-green-50 text-green-600"
                        : item.status === "Absent"
                          ? "bg-red-50 text-red-600"
                          : item.status === "Late"
                            ? "bg-yellow-50 text-yellow-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-5 py-8 text-center text-sm text-gray-500"
                >
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 p-5">
        <button
          type="button"
          className="rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}