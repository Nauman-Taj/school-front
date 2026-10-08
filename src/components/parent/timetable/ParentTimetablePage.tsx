"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

import { timetable } from "@/data/timetable";
import { students } from "@/data/students";
import { getCurrentParentChildren } from "@/lib/parent";

import ParentTimetableTable from "./ParentTimetableTable";

export default function ParentTimetablePage() {
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

  const selectedStudent = children.find(
    (child) => child.id === selectedChild
  );

  const results = useMemo(
    () =>
      selectedStudent
        ? timetable.filter(
            (item) =>
              item.className === selectedStudent.className &&
              item.section === selectedStudent.section
          )
        : [],
    [selectedStudent]
  );

  if (!selectedStudent) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Child data not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          No timetable information is available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Timetable
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your child's weekly class timetable.
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

      {/* Timetable Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
          <CalendarDays size={19} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Weekly Timetable
          </h2>

          <p className="text-sm text-gray-500">
            Class schedule for {selectedStudent.name}.
          </p>
        </div>
      </div>

      {/* Timetable */}
      <ParentTimetableTable timetable={results} />
    </div>
  );
}