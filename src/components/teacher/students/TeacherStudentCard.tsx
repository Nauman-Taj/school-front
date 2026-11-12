"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";

import type { TeacherStudent } from "@/lib/teacher-api";

type TeacherStudentCardProps = {
  students: TeacherStudent[];
};

export default function TeacherStudentCard({
  students,
}: TeacherStudentCardProps) {
  return (
    <div className="space-y-3 md:hidden">
      {students.length > 0 ? (
        students.map((student) => (
          <div
            key={student.id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#0176f]">
                <UserRound size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gray-900">
                  {student.name}
                </h2>

                <p className="mt-1 truncate text-sm text-gray-500">
                  {student.email}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  student.status === "Active"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {student.status}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-900">Class:</span>{" "}
                {student.className} - {student.section}
              </p>

              <p>
                <span className="font-medium text-gray-900">Roll No:</span>{" "}
                {student.rollNo}
              </p>

              <p>
                <span className="font-medium text-gray-900">Parent:</span>{" "}
                {student.parentName || "-"}
              </p>

              <p>
                <span className="font-medium text-gray-900">Phone:</span>{" "}
                {student.phone || "-"}
              </p>
            </div>

            <Link
              href={`/teacher/students/${student.id}`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-[#0176f] hover:bg-[#e6f4f2] hover:text-[#0176f]"
            >
              View Student
            </Link>
          </div>
        ))
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
          No students found.
        </div>
      )}
    </div>
  );
}
