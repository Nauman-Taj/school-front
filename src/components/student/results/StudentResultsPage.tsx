"use client";

import {
  Award,
  CheckCircle2,
  FileText,
  Percent,
} from "lucide-react";

import { results } from "@/data/results";
import StudentResultsTable from "./StudentResultsTable";

export default function StudentResultsPage() {
  const studentResults = results.filter(
    (result) => result.studentId === 1
  );

  const totalSubjects = studentResults.length;

  const totalObtained = studentResults.reduce(
    (sum, result) => sum + result.obtainedMarks,
    0
  );

  const totalMarks = studentResults.reduce(
    (sum, result) => sum + result.totalMarks,
    0
  );

  const percentage =
    totalMarks > 0
      ? Math.round((totalObtained / totalMarks) * 100)
      : 0;

  const passed = studentResults.filter(
    (result) => result.status === "Pass"
  ).length;

  const averageGrade =
    studentResults.length > 0
      ? studentResults[0].grade
      : "-";

  const stats = [
    {
      title: "Total Subjects",
      value: totalSubjects,
      icon: FileText,
    },
    {
      title: "Obtained Marks",
      value: `${totalObtained}/${totalMarks}`,
      icon: Award,
    },
    {
      title: "Percentage",
      value: `${percentage}%`,
      icon: Percent,
    },
    {
      title: "Passed",
      value: `${passed}/${totalSubjects}`,
      icon: CheckCircle2,
    },
  ];

  return (
    <main className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Results
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your subject-wise examination results and academic performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-800">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <Icon size={21} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <StudentResultsTable />
    </main>
  );
}