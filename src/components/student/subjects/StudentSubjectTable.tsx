"use client";

import {
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
} from "lucide-react";

import { subjects } from "@/data/subjects";
import { students } from "@/data/students";

export default function StudentSubjectTable() {
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

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Enrolled Subjects
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your current subjects and academic information.
        </p>
      </div>

      <div className="space-y-3">
        {studentSubjects.map((subject) => (
          <div
            key={subject.id}
            className="rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Subject */}
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                  <BookOpen size={20} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {subject.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Code: {subject.code}
                  </p>

                  <p className="text-sm text-gray-500">
                    Teacher: {subject.teacher}
                  </p>
                </div>
              </div>

              {/* Class */}
              <div>
                <p className="text-xs font-medium text-gray-400">
                  Class
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {subject.className} - {subject.section}
                </p>
              </div>

              {/* Subject Features */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-gray-50 px-3 py-2 text-center">
                  <BookOpen
                    size={16}
                    className="mx-auto text-[#01796f]"
                    strokeWidth={1.8}
                  />

                  <p className="mt-1 text-xs text-gray-500">
                    Material
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 px-3 py-2 text-center">
                  <ClipboardList
                    size={16}
                    className="mx-auto text-[#01796f]"
                    strokeWidth={1.8}
                  />

                  <p className="mt-1 text-xs text-gray-500">
                    Assignments
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 px-3 py-2 text-center">
                  <FileText
                    size={16}
                    className="mx-auto text-[#01796f]"
                    strokeWidth={1.8}
                  />

                  <p className="mt-1 text-xs text-gray-500">
                    Exams
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <GraduationCap
                  size={17}
                  className="text-[#01796f]"
                  strokeWidth={1.8}
                />

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    subject.status === "Active"
                      ? "bg-[#e6f4f2] text-[#01796f]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {subject.status}
                </span>
              </div>
            </div>
          </div>
        ))}

        {studentSubjects.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No subjects found.
          </div>
        )}
      </div>
    </div>
  );
}