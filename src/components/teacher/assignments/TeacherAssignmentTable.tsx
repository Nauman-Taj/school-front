"use client";

import Link from "next/link";
import { ClipboardList, Eye, Search } from "lucide-react";

import type { TeacherAssignment } from "@/lib/teacher-api";

type Props = {
  assignments: TeacherAssignment[];
  search: string;
  setSearch: (value: string) => void;
  total: number;
};

const statusStyles: Record<TeacherAssignment["status"], string> = {
  Pending: "bg-yellow-50 text-yellow-700",
  Submitted: "bg-green-50 text-green-700",
  Overdue: "bg-red-50 text-red-700",
};

export default function TeacherAssignmentTable({
  assignments,
  search,
  setSearch,
  total,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
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
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Assignment</th>
                <th className="px-5 py-4 font-semibold">Subject</th>
                <th className="px-5 py-4 font-semibold">Class</th>
                <th className="px-5 py-4 font-semibold">Due Date</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-center font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {assignments.length > 0 ? (
                assignments.map((assignment) => (
                  <tr
                    key={assignment.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                          <ClipboardList size={18} />
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {assignment.title}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {assignment.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {assignment.subject}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {assignment.className} - {assignment.section}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {assignment.dueDate}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[assignment.status]}`}
                      >
                        {assignment.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <Link
                        href={`/teacher/assignments/${encodeURIComponent(String(assignment.id))}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 transition hover:border-[#01796F] hover:bg-[#e6f4f2] hover:text-[#01796F]"
                      >
                        <Eye size={16} />
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-center text-sm text-gray-500"
                  >
                    No assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {assignments.length} of {total} assignments
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <ClipboardList size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900">
                    {assignment.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {assignment.subject} ·{" "}
                    {assignment.className} - {assignment.section}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[assignment.status]}`}
                >
                  {assignment.status}
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Due: {assignment.dueDate}
              </p>

              <Link
                href={`/teacher/assignments/${encodeURIComponent(String(assignment.id))}`}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#01796F] hover:bg-[#e6f4f2] hover:text-[#01796F]"
              >
                <Eye size={16} />
                Edit Assignment
              </Link>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
            No assignments found.
          </div>
        )}
      </div>
    </div>
  );
}
