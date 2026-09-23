"use client";

import { useMemo, useState } from "react";

import { parentAttendance } from "@/data/parentAttendance";
import { getCurrentParentChildren } from "@/lib/parent";
import ParentAttendanceTable from "./ParentAttendanceTable";

export default function ParentAttendancePage() {
  const children = getCurrentParentChildren();

  const [selectedChild, setSelectedChild] = useState(
    children[0]?.id ?? 0
  );

  const selectedChildData = children.find(
    (child) => child.id === selectedChild
  );

  const childAttendance = useMemo(() => {
    return parentAttendance.filter(
      (record) => record.childId === selectedChild
    );
  }, [selectedChild]);

  const stats = useMemo(() => {
    const present = childAttendance.filter(
      (record) => record.status === "Present"
    ).length;

    const absent = childAttendance.filter(
      (record) => record.status === "Absent"
    ).length;

    const late = childAttendance.filter(
      (record) => record.status === "Late"
    ).length;

    const total = childAttendance.length;

    const percentage =
      total > 0 ? Math.round((present / total) * 100) : 0;

    return {
      present,
      absent,
      late,
      percentage,
    };
  }, [childAttendance]);

  if (!children.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">
          No children are associated with this parent account.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Attendance
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View your children's attendance records.
        </p>
      </div>

      {/* Children */}
      <div className="flex flex-wrap gap-3">
        {children.map((child) => (
          <button
            key={child.id}
            type="button"
            onClick={() => setSelectedChild(child.id)}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
              selectedChild === child.id
                ? "border-[#01796F] bg-[#01796F] text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-[#01796F] hover:text-[#01796F]"
            }`}
          >
            {child.name}
          </button>
        ))}
      </div>

      {/* Selected Child */}
      {selectedChildData && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedChildData.name}
          </h2>

          <p className="text-sm text-gray-500">
            {selectedChildData.className}
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">
            Attendance Rate
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {stats.percentage}%
          </h3>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">
            Present
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {stats.present}
          </h3>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">
            Absent
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {stats.absent}
          </h3>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">
            Late
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {stats.late}
          </h3>
        </div>
      </div>

      {/* Attendance Table */}
      <ParentAttendanceTable records={childAttendance} />
    </div>
  );
}
