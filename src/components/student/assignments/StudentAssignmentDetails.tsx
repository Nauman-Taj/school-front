"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  UserRound,
  XCircle,
} from "lucide-react";

import { students } from "@/data/students";
import { assignments } from "@/data/assignments";
import { assignmentSubmissions } from "@/data/assignmentSubmissions";
import { AssignmentSubmission } from "@/types/assignmentSubmission";

interface StudentAssignmentDetailsProps {
  assignmentId: string;
}

export default function StudentAssignmentDetails({
  assignmentId,
}: StudentAssignmentDetailsProps) {
  const currentStudent = students.find(
    (student) => student.id === 1
  );

  const assignment = currentStudent
    ? assignments.find(
      (item) =>
        item.id === assignmentId &&
        item.className === currentStudent.className &&
        item.section === currentStudent.section
    )
    : undefined;

  const submission = assignmentSubmissions.find(
    (item) => item.assignmentId === assignmentId
  );

  if (!assignment) {
    return (
      <main className="space-y-5">
        <Link
          href="/student/assignments"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#01796f]"
        >
          <ArrowLeft size={17} />
          Back to Assignments
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <FileText
            size={40}
            className="mx-auto text-gray-300"
            strokeWidth={1.5}
          />

          <h1 className="mt-4 text-lg font-semibold text-gray-900">
            Assignment Not Found
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            The requested assignment does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-5">
      <Link
        href="/student/assignments"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#01796f]"
      >
        <ArrowLeft size={17} />
        Back to Assignments
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Assignment Details
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View assignment information and submission details.
        </p>
      </div>

      {/* Assignment Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 border-b border-gray-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <FileText size={22} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {assignment.title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Assignment ID: {assignment.id}
              </p>
            </div>
          </div>

          <StatusBadge status={submission?.status ?? "Not Submitted"} />
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem
            icon={<GraduationCap size={18} />}
            label="Subject"
            value={assignment.subject}
          />

          <InfoItem
            icon={<UserRound size={18} />}
            label="Teacher"
            value={assignment.teacher}
          />

          <InfoItem
            icon={<CalendarDays size={18} />}
            label="Due Date"
            value={assignment.dueDate}
          />

          <InfoItem
            icon={<FileText size={18} />}
            label="Class"
            value={`${assignment.className} - ${assignment.section}`}
          />
        </div>
      </div>

      {/* Assignment Information + Submission */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Assignment Information
          </h2>

          <div className="mt-4 space-y-5">
            <DetailRow
              label="Title"
              value={assignment.title}
            />

            <DetailRow
              label="Subject"
              value={assignment.subject}
            />

            <DetailRow
              label="Teacher"
              value={assignment.teacher}
            />

            <DetailRow
              label="Class"
              value={`${assignment.className} - ${assignment.section}`}
            />

            <DetailRow
              label="Due Date"
              value={assignment.dueDate}
            />

            <DetailRow
              label="Assignment Status"
              value={assignment.status}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Submission
          </h2>

          {submission ? (
            <div className="mt-4 space-y-5">
              <DetailRow
                label="Student"
                value={submission.student}
              />

              <DetailRow
                label="Status"
                value={submission.status}
              />

              <DetailRow
                label="Submitted Date"
                value={submission.submittedDate ?? "Not submitted"}
              />

              <DetailRow
                label="Marks"
                value={
                  submission.marks !== undefined
                    ? `${submission.marks} / ${submission.totalMarks}`
                    : `Not graded / ${submission.totalMarks}`
                }
              />

              {submission.file && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796f]">
                        <FileText size={18} strokeWidth={1.8} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-500">
                          Submitted File
                        </p>

                        <p className="truncate text-sm font-semibold text-gray-900">
                          {submission.file}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 rounded-lg p-2 text-gray-500 transition-colors hover:bg-[#e6f4f2] hover:text-[#01796f]"
                      title="Download File"
                    >
                      <Download size={17} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <Clock3
                  size={22}
                  className="text-yellow-500"
                  strokeWidth={1.8}
                />

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Not Submitted
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    No submission record is available.
                  </p>
                </div>
              </div>
            </div>
          )}

          {submission?.teacherFeedback && (
            <div className="mt-4 rounded-xl border border-gray-100 p-4">
              <p className="text-xs font-medium text-gray-500">
                Teacher Feedback
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                {submission.teacherFeedback}
              </p>
            </div>
          )}

          {submission?.status === "Not Submitted" && (
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-[#01796f] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#015f58]"
            >
              Submit Assignment
            </button>
          )}
        </div>
      </div>

      {/* Marks */}
      {submission?.marks !== undefined && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Result
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your marks for this assignment.
              </p>
            </div>

            <div className="rounded-xl bg-[#e6f4f2] px-5 py-3 text-center">
              <p className="text-xs font-medium text-gray-500">
                Marks
              </p>

              <p className="mt-1 text-2xl font-bold text-[#01796f]">
                {submission.marks} / {submission.totalMarks}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function StatusBadge({
  status,
}: {
  status: AssignmentSubmission["status"];
}) {
  const styles = {
    "Not Submitted": "bg-gray-100 text-gray-600",
    Submitted: "bg-green-50 text-green-700",
    Checked: "bg-[#e6f4f2] text-[#01796f]",
    Late: "bg-red-50 text-red-700",
  };

  const icons = {
    "Not Submitted": <Clock3 size={14} />,
    Submitted: <CheckCircle2 size={14} />,
    Checked: <CheckCircle2 size={14} />,
    Late: <XCircle size={14} />,
  };

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <div className="flex items-center gap-2 text-[#01796f]">
        {icon}
        <span className="text-xs font-medium text-gray-500">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-gray-900">
        {value}
      </span>
    </div>
  );
}