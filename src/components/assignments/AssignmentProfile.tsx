import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Pencil,
  UserRound,
} from "lucide-react";

import { Assignment } from "@/types/assignment";

type AssignmentProfileProps = {
  assignment: Assignment;
};

const statusStyles = {
  Pending: "bg-yellow-50 text-yellow-700",
  Submitted: "bg-green-50 text-green-700",
  Overdue: "bg-red-50 text-red-700",
};

export default function AssignmentProfile({
  assignment,
}: AssignmentProfileProps) {
  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/assignments"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
      >
        <ArrowLeft size={17} />
        Back to Assignments
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f4f2] text-[#01796F]">
              <ClipboardList size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {assignment.title}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Assignment ID: {assignment.id}
              </p>
            </div>
          </div>

          <Link
            href={`/dashboard/assignments/${assignment.id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            <Pencil size={17} />
            Edit Assignment
          </Link>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          Assignment Details
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Subject */}
          <div className="flex items-start gap-3">
            <BookOpen
              size={20}
              className="mt-0.5 text-[#01796F]"
            />

            <div>
              <p className="text-xs text-gray-400">Subject</p>
              <p className="mt-1 font-medium text-gray-800">
                {assignment.subject}
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
                {assignment.className}
              </p>
            </div>
          </div>

          {/* Teacher */}
          <div className="flex items-start gap-3">
            <UserRound
              size={20}
              className="mt-0.5 text-[#01796F]"
            />

            <div>
              <p className="text-xs text-gray-400">Teacher</p>
              <p className="mt-1 font-medium text-gray-800">
                {assignment.teacher}
              </p>
            </div>
          </div>

          {/* Due Date */}
          <div className="flex items-start gap-3">
            <CalendarDays
              size={20}
              className="mt-0.5 text-[#01796F]"
            />

            <div>
              <p className="text-xs text-gray-400">Due Date</p>
              <p className="mt-1 font-medium text-gray-800">
                {assignment.dueDate}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-start gap-3">
            <ClipboardList
              size={20}
              className="mt-0.5 text-[#01796F]"
            />

            <div>
              <p className="text-xs text-gray-400">Status</p>

              <span
                className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[assignment.status]}`}
              >
                {assignment.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}