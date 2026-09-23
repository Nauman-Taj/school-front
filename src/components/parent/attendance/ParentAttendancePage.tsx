"use client";

import { useMemo, useState } from "react";
import {
  CalendarCheck,
  Clock3,
  UserCheck,
  UserX,
} from "lucide-react";

import { parentAttendance } from "@/data/parentAttendance";
import { getCurrentParentChildren } from "@/lib/parent";
import ParentAttendanceTable from "./ParentAttendanceTable";

export default function ParentAttendancePage() {
  const children = getCurrentParentChildren();

  const [selectedChild, setSelectedChild] = useState(
    children[0]?.id ?? 0
  );

  const results = useMemo(
    () =>
      parentAttendance.filter(
        (record) => record.childId === selectedChild
      ),
    [selectedChild]
  );

  const present = results.filter(
    (record) => record.status === "Present"
  ).length;

  const absent = results.filter(
    (record) => record.status === "Absent"
  ).length;

  const late = results.filter(
    (record) => record.status === "Late"
  ).length;

  const percentage =
    results.length > 0
      ? Math.round((present / results.length) * 100)
      : 0;

  const stats = [
    {
      title: "Attendance Rate",
      value: `${percentage}%`,
      icon: CalendarCheck,
      iconClass: "bg-[#e6f4f2] text-[#01796f]",
    },
    {
      title: "Present",
      value: present,
      icon: UserCheck,
      iconClass: "bg-green-50 text-green-600",
    },
    {
      title: "Absent",
      value: absent,
      icon: UserX,
      iconClass: "bg-red-50 text-red-600",
    },
    {
      title: "Late",
      value: late,
      icon: Clock3,
      iconClass: "bg-yellow-50 text-yellow-600",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Attendance
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View your child's attendance records and attendance performance.
        </p>
      </div>

      {/* Child Selector */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <label
          htmlFor="child"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Select Child
        </label>

        <select
          id="child"
          value={selectedChild}
          onChange={(e) =>
            setSelectedChild(Number(e.target.value))
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796f] sm:w-80"
        >
          {children.map((child) => (
            <option key={child.id} value={child.id}>
              {child.name} — {child.className}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClass}`}
                >
                  <Icon size={19} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-900">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Attendance */}
      <div>
        {/* <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Attendance Records
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Attendance records for the selected child.
          </p>
        </div> */}

        <ParentAttendanceTable records={results} />
      </div>
    </div>
  );
}

