"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { parentExams } from "@/data/parentExams";
import { getCurrentParentChildren } from "@/lib/parent";
import ParentExamTable from "./ParentExamTable";

export default function ParentExamsPage() {
  const children = getCurrentParentChildren();

  const [selectedChild, setSelectedChild] = useState(
    children[0]?.id ?? 0
  );

  const exams = useMemo(
    () =>
      parentExams.filter(
        (exam) => exam.childId === selectedChild
      ),
    [selectedChild]
  );

  const upcoming = exams.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  const completed = exams.filter(
    (exam) => exam.status === "Completed"
  ).length;

  const stats = [
    {
      title: "Total Exams",
      value: exams.length,
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

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Exams
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View your child's examination schedule and details.
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
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] sm:w-80"
        >
          {children.map((child) => (
            <option key={child.id} value={child.id}>
              {child.name} --- {child.className}
            </option>
          ))}
        </select>
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

      {/* Exam Records */}
      <div>
        {/* <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Exam Schedule
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Examination schedule for the selected child.
          </p>
        </div> */}

        <ParentExamTable exams={exams} />
      </div>
    </div>
  );
}