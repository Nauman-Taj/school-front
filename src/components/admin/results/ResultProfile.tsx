import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Pencil,
  UserRound,
} from "lucide-react";

import type { Result } from "@/types/result";

type ResultProfileProps = {
  result: Result;
};

export default function ResultProfile({ result }: ResultProfileProps) {
  const details = [
    { label: "Student", value: result.student, Icon: UserRound },
    { label: "Roll Number", value: result.rollNo ?? "—", Icon: UserRound },
    {
      label: "Class",
      value: `${result.className} · Section ${result.section}`,
      Icon: GraduationCap,
    },
    { label: "Exam", value: result.exam ?? "—", Icon: ClipboardCheck },
    { label: "Subject", value: result.subject, Icon: BookOpen },
    { label: "Teacher", value: result.teacher, Icon: UserRound },
    {
      label: "Marks",
      value: `${result.obtainedMarks} / ${result.totalMarks}`,
      Icon: ClipboardCheck,
    },
    { label: "Percentage", value: `${result.percentage}%`, Icon: Award },
    { label: "Grade", value: result.grade, Icon: Award },
  ];

  return (
    <div className="space-y-5">
      <Link
        href="/admin/results"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
      >
        <ArrowLeft size={17} />
        Back to Results
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f4f2] text-[#01796F]">
              <Award size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {result.student}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Result ID: {result.id}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${result.status === "Pass" ? "bg-[#e6f4f2] text-[#01796F]" : "bg-red-50 text-red-600"}`}
            >
              {result.status}
            </span>
            <Link
              href={`/admin/results/${encodeURIComponent(result.id)}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
            >
              <Pencil size={17} />
              Edit Result
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          Result Details
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {details.map(({ label, value, Icon }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon size={20} className="mt-0.5 text-[#01796F]" />
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="mt-1 font-medium text-gray-800">{value}</p>
              </div>
            </div>
          ))}
          <div className="flex items-start gap-3">
            <ClipboardCheck size={20} className="mt-0.5 text-[#01796F]" />
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <span
                className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium ${result.status === "Pass" ? "bg-[#e6f4f2] text-[#01796F]" : "bg-red-50 text-red-600"}`}
              >
                {result.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
