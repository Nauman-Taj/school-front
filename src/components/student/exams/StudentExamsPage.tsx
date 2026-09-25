"use client";

import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
} from "lucide-react";

import { exams } from "@/data/exams";
import { students } from "@/data/students";
import StudentExamTable from "./StudentExamTable";

export default function StudentExamsPage() {
  const currentStudent = students.find(
    (student) => student.id === 1
  );

  const studentExams = currentStudent
    ? exams.filter(
        (exam) =>
          exam.className === currentStudent.className &&
          exam.section === currentStudent.section
      )
    : [];

  const total = studentExams.length;

  const completed = studentExams.filter(
    (exam) => exam.status === "Completed"
  ).length;

  const upcoming = studentExams.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  const totalMarks = studentExams.reduce(
    (sum, exam) => sum + exam.totalMarks,
    0
  );

  const stats = [
    {
      title: "Total Exams",
      value: total,
      icon: ClipboardList,
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
    },
    {
      title: "Upcoming",
      value: upcoming,
      icon: CalendarDays,
    },
    {
      title: "Total Marks",
      value: totalMarks,
      icon: FileText,
    },
  ];

  return (
    <main className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Exams
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your examination schedule and exam information.
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

      <StudentExamTable exams={studentExams} />
    </main>
  );
}