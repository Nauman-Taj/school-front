"use client";

import { useMemo, useState } from "react";
import {
  CalendarCheck,
  Clock3,
  UserCheck,
  UserX,
} from "lucide-react";

import { attendance } from "@/data/attendance";
import { students } from "@/data/students";
import { getCurrentParentChildren } from "@/lib/parent";

import ParentAttendanceTable from "./ParentAttendanceTable";

export default function ParentAttendancePage() {
  const parentChildren = getCurrentParentChildren();

  const children = parentChildren
    .map((relation) =>
      students.find((student) => student.id === relation.studentId)
    )
    .filter(
      (student): student is (typeof students)[number] =>
        Boolean(student)
    );

  const [selectedChild, setSelectedChild] = useState(
    children[0]?.id ?? 0
  );

  const results = useMemo(
    () =>
      attendance.filter(
        (record) =>
          record.role === "Student" &&
          record.studentId === selectedChild
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

  const leave = results.filter(
    (record) => record.status === "Leave"
  ).length;

  const percentage =
    results.length > 0
      ? Math.round(
          ((present + late) / results.length) * 100
        )
      : 0;

  const selectedStudent = children.find(
    (child) => child.id === selectedChild
  );

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

  if (!selectedStudent) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Child data not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          No attendance information is available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Attendance
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your child's attendance records and attendance performance.
        </p>
      </div>

      {/* Child Information + Selector */}
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">
            Selected Child
          </p>

          <h2 className="mt-2 text-xl font-bold text-gray-800">
            {selectedStudent.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {selectedStudent.className} - Section{" "}
            {selectedStudent.section}
            {" • "}
            Roll No: {selectedStudent.rollNo}
          </p>
        </div>

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
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/20"
          >
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
        </div>
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
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconClass}`}
                >
                  <Icon size={20} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-900">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Attendance Records */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Attendance Records
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Attendance records for {selectedStudent.name}.
          </p>
        </div>

        <ParentAttendanceTable records={results} />
      </div>
    </div>
  );
}