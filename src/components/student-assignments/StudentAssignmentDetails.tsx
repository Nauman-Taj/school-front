"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Download,
  FileText,
  Upload,
  UserRound,
} from "lucide-react";

import { studentAssignments } from "@/data/studentAssignments";

type Props = {
  id: string;
};

export default function StudentAssignmentDetails({ id }: Props) {
  const assignment = studentAssignments.find(
    (item) => item.id === Number(id)
  );

  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(
    assignment?.status === "Submitted"
  );

  if (!assignment) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Assignment not found
        </h2>

        <Link
          href="/dashboard/studentassignments"
          className="mt-4 inline-flex rounded-lg bg-[#01796F] px-4 py-2 text-sm font-medium text-white"
        >
          Back to Assignments
        </Link>
      </div>
    );
  }

  const canSubmit =
    assignment.status === "Pending" && !submitted;

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/dashboard/studentassignments"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#01796F]"
      >
        <ArrowLeft size={18} />
        Back to Assignments
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#01796F]">
              {assignment.subject}
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              {assignment.title}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {assignment.className}
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796F]">
            {submitted ? "Submitted" : assignment.status}
          </span>
        </div>
      </div>

      {/* Assignment Information */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Description
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              {assignment.description}
            </p>
          </div>

          {/* Assignment File */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Assignment File
            </h2>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796F]">
                  <FileText size={20} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {assignment.file}
                  </p>
                  <p className="text-xs text-gray-500">
                    Assignment document
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
              >
                <Download size={18} />
              </button>
            </div>
          </div>

          {/* Submission */}
          {assignment.status === "Pending" && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Your Submission
              </h2>

              <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-8 text-center hover:border-[#01796F]">
                <Upload className="text-[#01796F]" size={24} />

                <p className="mt-2 text-sm font-medium text-gray-700">
                  {fileName || "Choose a file to submit"}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  PDF, DOC, DOCX or other supported files
                </p>

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setFileName(e.target.files?.[0]?.name || "")
                  }
                />
              </label>

              <button
                type="button"
                disabled={!canSubmit || !fileName}
                onClick={() => setSubmitted(true)}
                className="mt-4 w-full rounded-lg bg-[#01796F] px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Submit Assignment
              </button>
            </div>
          )}

          {assignment.status === "Submitted" && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Your Submission
              </h2>

              <div className="mt-4 flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                <FileText size={20} className="text-[#01796F]" />
                <span className="text-sm text-gray-700">
                  {assignment.submission}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Assignment Details
            </h2>

            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <CalendarDays size={18} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Due Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {assignment.dueDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UserRound size={18} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Teacher</p>
                  <p className="text-sm font-medium text-gray-900">
                    {assignment.teacher}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Marks & Feedback */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Marks & Feedback
            </h2>

            <div className="mt-4">
              <p className="text-xs text-gray-500">Marks</p>

              <p className="mt-1 text-2xl font-bold text-[#01796F]">
                {assignment.marks}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-xs text-gray-500">
                Teacher Feedback
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {assignment.teacherFeedback}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}