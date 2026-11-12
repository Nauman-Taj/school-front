"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  CalendarDays,
  ClipboardList,
  FileText,
  Percent,
  Users,
} from "lucide-react";

import { fetchTeacherExamDetail } from "@/lib/teacher-api";
import type { ApiTeacherExamDetail } from "@/lib/teacher-api";

type Props = {
  examId: string;
};

const gradeStyles: Record<string, string> = {
  "A+": "bg-[#e6f4f2] text-[#01796F]",
  A: "bg-[#e6f4f2] text-[#01796F]",
  B: "bg-blue-50 text-blue-700",
  C: "bg-yellow-50 text-yellow-700",
  D: "bg-orange-50 text-orange-700",
  F: "bg-red-50 text-red-700",
};

export default function TeacherExamDetail({ examId }: Props) {
  const [detail, setDetail] = useState<ApiTeacherExamDetail | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchTeacherExamDetail(examId)
      .then((data) => {
        if (!active) return;
        setDetail(data);
        setLoaded(true);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load the exam."
        );
        setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [examId]);

  const students = useMemo(() => detail?.students ?? [], [detail]);

  const marked = useMemo(
    () => students.filter((student) => student.obtainedMarks !== null).length,
    [students]
  );

  if (!loaded) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
        <p className="mt-4 text-sm text-gray-500">Loading the exam...</p>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="space-y-5">
        <Link
          href="/teacher/exams"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
        >
          <ArrowLeft size={17} />
          Back to Exams
        </Link>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error || "That exam could not be found."}
        </div>
      </div>
    );
  }

  const { exam } = detail;

  const tiles = [
    { title: "Subject", value: exam.subject, icon: FileText },
    {
      title: "Class",
      value: `${exam.className} - ${exam.section}`,
      icon: Users,
    },
    { title: "Exam Date", value: exam.examDate, icon: CalendarDays },
    { title: "Total Marks", value: String(exam.totalMarks), icon: Award },
    { title: "Students", value: String(students.length), icon: ClipboardList },
    {
      title: "Marked",
      value: `${marked} of ${students.length}`,
      icon: Percent,
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <Link
          href="/teacher/exams"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
        >
          <ArrowLeft size={17} />
          Back to Exams
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {exam.name}
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          {exam.subject} · {exam.className} - {exam.section} · {exam.id}
        </p>
      </div>

      {/* Summary tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => {
          const Icon = tile.icon;

          return (
            <div
              key={tile.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{tile.title}</p>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-2 text-2xl font-bold text-gray-800">
                {tile.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Students */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Roll No</th>
                <th className="px-5 py-4 font-semibold">Student</th>
                <th className="px-5 py-4 font-semibold">Class</th>
                <th className="px-5 py-4 font-semibold">Marks</th>
                <th className="px-5 py-4 font-semibold">Percentage</th>
                <th className="px-5 py-4 font-semibold">Grade</th>
                <th className="px-5 py-4 font-semibold">Result</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {students.length > 0 ? (
                students.map((student) => (
                  <tr
                    key={student.studentId}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 text-gray-600">
                      {student.rollNo}
                    </td>

                    <td className="px-5 py-4 font-medium text-gray-900">
                      {student.name}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.className} - {student.section}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.obtainedMarks === null
                        ? "Not recorded"
                        : `${student.obtainedMarks} / ${exam.totalMarks}`}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.percentage === null
                        ? "-"
                        : `${student.percentage}%`}
                    </td>

                    <td className="px-5 py-4">
                      {student.grade === null ? (
                        <span className="text-gray-400">-</span>
                      ) : (
                        <span
                          className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                            gradeStyles[student.grade] ??
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {student.grade}
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      {student.status === null ? (
                        <span className="text-gray-400">-</span>
                      ) : (
                        <span
                          className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                            student.status === "Pass"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {student.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-8 text-center text-sm text-gray-500"
                  >
                    No students found for this exam.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {students.length} of {students.length} students
        </div>
      </div>
    </div>
  );
}
