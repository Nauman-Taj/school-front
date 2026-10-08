"use client";

import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Users,
} from "lucide-react";

import { students } from "@/data/students";
import { subjects } from "@/data/subjects";

import StudentSubjectTable from "./StudentSubjectTable";

export default function StudentSubjectsPage() {
  const currentStudent = students.find(
    (student) => student.id === 1
  );

  const studentSubjects = currentStudent
    ? subjects.filter(
        (subject) =>
          subject.className === currentStudent.className &&
          subject.section === currentStudent.section
      )
    : [];

  const activeSubjects = studentSubjects.filter(
    (subject) => subject.status === "Active"
  ).length;

  const teachers = new Set(
    studentSubjects.map((subject) => subject.teacher)
  ).size;

  const statsData = [
    {
      title: "Total Subjects",
      value: studentSubjects.length.toString(),
      change: studentSubjects.length.toString(),
      description: "enrolled subjects",
      icon: BookOpen,
    },
    {
      title: "Active Subjects",
      value: activeSubjects.toString(),
      change: activeSubjects.toString(),
      description: "currently active",
      icon: CheckCircle2,
    },
    {
      title: "Teachers",
      value: teachers.toString(),
      change: teachers.toString(),
      description: "subject teachers",
      icon: Users,
    },
    {
      title: "Current Class",
      value: currentStudent
        ? `${currentStudent.className}-${currentStudent.section}`
        : "N/A",
      change: currentStudent
        ? currentStudent.className
        : "N/A",
      description: currentStudent
        ? `${currentStudent.section} section`
        : "class not available",
      icon: GraduationCap,
    },
  ];

  return (
    <main className="space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Subjects
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your enrolled subjects and academic information.
        </p>
      </div>

      {/* Subject Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statsData.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2
                    className={`mt-2 font-bold text-gray-900 ${
                      stat.title === "Current Class"
                        ? "text-xl"
                        : "text-2xl"
                    }`}
                  >
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                  <Icon
                    size={21}
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="font-semibold text-[#01796f]">
                  {stat.change}
                </span>

                <span className="text-gray-500">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subject Cards */}
      <StudentSubjectTable />
    </main>
  );
}