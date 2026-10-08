"use client";

import { StudentAttendanceRecord } from "@/types/attendance";

type Props = {
  attendance: StudentAttendanceRecord[];
};

export default function TeacherAttendanceCard({
  attendance,
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
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  item.status === "Present"
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
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          No attendance records found.
        </div>
      )}

      {attendance.length > 0 && (
        <button
          type="button"
          className="w-full rounded-full bg-[#01796f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          Save Attendance
        </button>
      )}
    </div>
  );
}