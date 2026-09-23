"use client";

import { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

import { parentResults } from "@/data/parentResults";
import ParentResultsTable from "./ParentResultsTable";

const children = [
  {
    id: 1,
    name: "Ali Asif",
    className: "Grade 8 - A",
  },
  {
    id: 2,
    name: "Hassan Asif",
    className: "Grade 6 - B",
  },
];

export default function ParentResultsPage() {
  const [selectedChild, setSelectedChild] = useState(1);

  const results = useMemo(
    () =>
      parentResults.filter(
        (result) => result.childId === selectedChild
      ),
    [selectedChild]
  );

  const average =
    results.length > 0
      ? Math.round(
          results.reduce(
            (sum, result) => sum + result.percentage,
            0
          ) / results.length
        )
      : 0;

  const highest = results.length
    ? Math.max(...results.map((result) => result.percentage))
    : 0;

  const passed = results.filter(
    (result) => result.percentage >= 40
  ).length;

  const stats = [
    {
      title: "Average",
      value: `${average}%`,
      icon: TrendingUp,
      iconClass: "bg-[#e6f4f2] text-[#01796f]",
    },
    {
      title: "Highest",
      value: `${highest}%`,
      icon: Award,
      iconClass: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Subjects",
      value: results.length,
      icon: BookOpen,
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "Passed",
      value: `${passed}/${results.length}`,
      icon: GraduationCap,
      iconClass: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Results
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View your child's examination results and academic performance.
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

      {/* Results */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Examination Results
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Mid Term results for the selected child.
          </p>
        </div>

        <ParentResultsTable results={results} />
      </div>
    </div>
  );
}
