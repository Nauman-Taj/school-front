import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  Pencil,
  UserRound,
} from "lucide-react";

import { Exam } from "@/types/exam";

type ExamProfileProps = {
  exam: Exam;
};

const statusStyles = {
  Upcoming: "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
};

export default function ExamProfile({ exam }: ExamProfileProps) {
  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/exams"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
      >
        <ArrowLeft size={17} />
        Back to Exams
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f4f2] text-[#01796F]">
              <ClipboardCheck size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {exam.name}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Exam ID: {exam.id}
              </p>
            </div>
          </div>

          <Link
            href={`/dashboard/exams/${exam.id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#01796F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            <Pencil size={17} />
            Edit Exam
          </Link>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          Exam Details
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Subject */}
          <div className="flex items-start gap-3">
            <BookOpen size={20} className="mt-0.5 text-[#01796F]" />

            <div>
              <p className="text-xs text-gray-400">Subject</p>
              <p className="mt-1 font-medium text-gray-800">
                {exam.subject}
              </p>
            </div>
          </div>

          {/* Class */}
          <div className="flex items-start gap-3">
            <GraduationCap
              size={20}
              className="mt-0.5 text-[#01796F]"
            />

            <div>
              <p className="text-xs text-gray-400">Class</p>
              <p className="mt-1 font-medium text-gray-800">
                {exam.className}
              </p>
            </div>
          </div>

          {/* Teacher */}
          <div className="flex items-start gap-3">
            <UserRound size={20} className="mt-0.5 text-[#01796F]" />

            <div>
              <p className="text-xs text-gray-400">Teacher</p>
              <p className="mt-1 font-medium text-gray-800">
                {exam.teacher}
              </p>
            </div>
          </div>

          {/* Exam Date */}
          <div className="flex items-start gap-3">
            <CalendarDays
              size={20}
              className="mt-0.5 text-[#01796F]"
            />

            <div>
              <p className="text-xs text-gray-400">Exam Date</p>
              <p className="mt-1 font-medium text-gray-800">
                {exam.examDate}
              </p>
            </div>
          </div>

          {/* Total Marks */}
          <div className="flex items-start gap-3">
            <ClipboardCheck
              size={20}
              className="mt-0.5 text-[#01796F]"
            />

            <div>
              <p className="text-xs text-gray-400">Total Marks</p>
              <p className="mt-1 font-medium text-gray-800">
                {exam.totalMarks}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-start gap-3">
            <ClipboardCheck
              size={20}
              className="mt-0.5 text-[#01796F]"
            />

            <div>
              <p className="text-xs text-gray-400">Status</p>

              <span
                className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[exam.status]}`}
              >
                {exam.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}