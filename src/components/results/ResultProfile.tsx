import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  GraduationCap,
  UserRound,
} from "lucide-react";

import { Result } from "@/types/result";

type ResultProfileProps = {
  result: Result;
};

export default function ResultProfile({
  result,
}: ResultProfileProps) {
  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/dashboard/results"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
      >
        <ArrowLeft size={17} />
        Back to Results
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <UserRound size={26} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {result.studentName}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {result.rollNo} • {result.className}
              </p>
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1.5 text-sm font-medium ${
              result.status === "Pass"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {result.status}
          </span>
        </div>
      </div>

      {/* Result Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <BookOpen size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-400">Exam</p>
              <p className="mt-1 font-semibold text-gray-800">
                {result.exam}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <GraduationCap size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-400">Subject</p>
              <p className="mt-1 font-semibold text-gray-800">
                {result.subject}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-xs text-gray-400">Marks</p>

          <p className="mt-1 text-xl font-bold text-gray-900">
            {result.obtainedMarks}
            <span className="text-sm font-medium text-gray-400">
              {" "}
              / {result.totalMarks}
            </span>
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <Award size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-400">Grade</p>
              <p className="mt-1 text-xl font-bold text-gray-900">
                {result.grade}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Result Details
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs text-gray-400">Student</p>
            <p className="mt-1 font-medium text-gray-800">
              {result.studentName}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Roll Number</p>
            <p className="mt-1 font-medium text-gray-800">
              {result.rollNo}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Class</p>
            <p className="mt-1 font-medium text-gray-800">
              {result.className}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Teacher</p>
            <p className="mt-1 font-medium text-gray-800">
              {result.teacher}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Percentage</p>
            <p className="mt-1 font-medium text-gray-800">
              {result.percentage}%
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Status</p>
            <p className="mt-1 font-medium text-gray-800">
              {result.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}