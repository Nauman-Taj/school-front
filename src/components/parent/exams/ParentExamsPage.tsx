"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { exams } from "@/data/exams";
import { students } from "@/data/students";
import { getCurrentParentChildren } from "@/lib/parent";

import ParentExamTable from "./ParentExamTable";

export default function ParentExamsPage() {
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
        ? exams.filter(
            (exam) =>
              exam.className === selectedStudent.className &&
              exam.section === selectedStudent.section
          )
        : [],
    [selectedStudent]
  );

  const upcoming = results.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  const completed = results.filter(
    (exam) => exam.status === "Completed"
  ).length;

  const stats = [
    {
      title: "Total Exams",
      value: results.length,
      icon: CalendarDays,
      iconClass: "bg-[#e6f4f2] text-[#01796F]",
    },
    {
      title: "Upcoming",
      value: upcoming,
      icon: Clock3,
      iconClass: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      iconClass: "bg-green-50 text-green-600",
    },
  ];

  if (!selectedStudent) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Child data not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          No exam information is available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Exams
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your child's examination schedule and details.
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
      <div className="grid gap-4 sm:grid-cols-3">
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

      {/* Exam Records */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Exam Records
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Examination records for {selectedStudent.name}.
          </p>
        </div>

        <ParentExamTable exams={results} />
      </div>
    </div>
  );
}