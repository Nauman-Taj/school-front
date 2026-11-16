"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  GraduationCap,
  UserRound,
} from "lucide-react";

import { fetchStudentAssignments } from "@/lib/student-api";
import type { ApiStudentAssignment } from "@/lib/student-api";

interface StudentAssignmentDetailsProps {
  assignmentId: string;
}

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-50 text-yellow-700",
  Submitted: "bg-green-50 text-green-700",
  Overdue: "bg-red-50 text-red-700",
};

export default function StudentAssignmentDetails({
  assignmentId,
}: StudentAssignmentDetailsProps) {
  const [state, setState] = useState<{
    loaded: boolean;
    assignment: ApiStudentAssignment | null;
    error: string;
  }>({
    loaded: false,
    assignment: null,
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchStudentAssignments()
      .then((assignments) => {
        if (!active) return;

        const assignment =
          assignments.find((item) => item.id === assignmentId) ?? null;

        setState({ loaded: true, assignment, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;

        setState({
          loaded: true,
          assignment: null,
          error:
            err instanceof Error
              ? err.message
              : "Unable to load the assignment.",
        });
      });

    return () => {
      active = false;
    };
  }, [assignmentId]);

  const backLink = (
    <Link
      href="/student/assignments"
      className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
    >
      <ArrowLeft size={17} />
      Back to Assignments
    </Link>
  );

  if (!state.loaded) {
    return (
      <div className="space-y-5">
        {backLink}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading the assignment...
          </p>
        </div>
      </div>
    );
  }

  if (state.error || !state.assignment) {
    return (
      <div className="space-y-5">
        {backLink}

        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <FileText
            size={40}
            className="mx-auto text-gray-300"
            strokeWidth={1.5}
          />

          <h1 className="mt-4 text-lg font-semibold text-gray-900">
            Assignment Not Found
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {state.error || "The requested assignment does not exist."}
          </p>
        </div>
      </div>
    );
  }

  const assignment = state.assignment;

  return (
    <div className="space-y-5">
      {backLink}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {assignment.title}
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            {assignment.subject} · {assignment.className} -{" "}
            {assignment.section}
          </p>
        </div>

        <span
          className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[assignment.status] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {assignment.status}
        </span>
      </div>

      {/* Details */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Detail
          icon={FileText}
          label="Assignment ID"
          value={assignment.id}
        />

        <Detail
          icon={GraduationCap}
          label="Subject"
          value={assignment.subject}
        />

        <Detail
          icon={UserRound}
          label="Teacher"
          value={assignment.teacher}
        />

        <Detail
          icon={CalendarDays}
          label="Due Date"
          value={assignment.dueDate}
        />
      </div>

      {/* Description */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Description</h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          This assignment was set by {assignment.teacher} for the{" "}
          {assignment.className} - {assignment.section} class. The work is due
          on {assignment.dueDate}.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white p-5 text-sm text-gray-500 shadow-sm">
        <Clock3 size={16} className="text-[#01796F]" />

        The submission status is tracked for the whole class, so the status
        above applies to every student of your class.
      </div>
    </div>
  );
}

type DetailProps = {
  icon: typeof FileText;
  label: string;
  value: string;
};

function Detail({ icon: Icon, label, value }: DetailProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{label}</p>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
          <Icon size={18} />
        </div>
      </div>

      <p className="mt-2 text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}
