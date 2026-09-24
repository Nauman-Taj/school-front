"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Eye,
  Search,
  XCircle,
} from "lucide-react";

import { ParentAssignment } from "@/types/parentAssignment";

type ParentAssignmentTableProps = {
  assignments: ParentAssignment[];
};

const statusStyles = {
  Pending: {
    className: "bg-yellow-50 text-yellow-700",
    icon: Clock3,
  },
  Submitted: {
    className: "bg-green-50 text-green-700",
    icon: CheckCircle2,
  },
  Overdue: {
    className: "bg-red-50 text-red-700",
    icon: XCircle,
  },
};

export default function ParentAssignmentTable({
  assignments,
}: ParentAssignmentTableProps) {
  const [search, setSearch] = useState("");

  const filteredAssignments = assignments.filter((assignment) => {
    const searchTerm = search.toLowerCase();

    return (
      assignment.title.toLowerCase().includes(searchTerm) ||
      assignment.childName.toLowerCase().includes(searchTerm) ||
      assignment.subject.toLowerCase().includes(searchTerm) ||
      assignment.teacher.toLowerCase().includes(searchTerm) ||
      assignment.dueDate.toLowerCase().includes(searchTerm) ||
      assignment.status.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search assignments"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
        />
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white md:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="px-6 py-4 font-semibold text-gray-600">Assignment</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Subject</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Teacher</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Due Date</th>
              <th className="px-6 py-4 text-center font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-center font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredAssignments.map((assignment) => {
              const status = statusStyles[assignment.status];
              const Icon = status.icon;

              return (
                <tr
                  key={assignment.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">
                      {assignment.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {assignment.childName}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {assignment.subject}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {assignment.teacher}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(
                      assignment.dueDate
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                    >
                      <Icon size={14} />
                      {assignment.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Assignment: ${assignment.title}\nSubject: ${assignment.subject}\nTeacher: ${assignment.teacher}`
                        )
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                      aria-label="View assignment"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredAssignments.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  No assignments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {filteredAssignments.map((assignment) => {
          const status = statusStyles[assignment.status];
          const Icon = status.icon;

          return (
            <div
              key={assignment.id}
              className="rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    {assignment.title}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {assignment.childName}
                  </p>
                </div>

                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                >
                  <Icon size={14} />
                  {assignment.status}
                </span>
              </div>

              <div className="mt-4 space-y-1.5 text-sm">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">
                    Subject:
                  </span>{" "}
                  {assignment.subject}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">
                    Teacher:
                  </span>{" "}
                  {assignment.teacher}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">
                    Due:
                  </span>{" "}
                  {new Date(
                    assignment.dueDate
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.alert(
                    `Assignment: ${assignment.title}\nSubject: ${assignment.subject}\nTeacher: ${assignment.teacher}`
                  )
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
              >
                <Eye size={16} />
                View Assignment
              </button>
            </div>
          );
        })}

        {filteredAssignments.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
            No assignments found.
          </div>
        )}
      </div>
    </div>
  );
}
