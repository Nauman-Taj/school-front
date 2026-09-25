"use client";

import {
  ClipboardList,
  Search,
} from "lucide-react";

import { Assignment } from "@/types/assignment";

type Props = {
  assignments: Assignment[];
  search: string;
  setSearch: (value: string) => void;
};

export default function TeacherAssignmentTable({
  assignments,
  search,
  setSearch,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Search */}
      <div className="border-b border-gray-200 p-5">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796f]"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Assignment
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Subject
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Class
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Due Date
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <tr
                  key={assignment.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796f]">
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

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {assignment.subject}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {assignment.className} - {assignment.section}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {assignment.dueDate}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={assignment.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-sm text-gray-500"
                >
                  No assignments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 p-4 md:hidden">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796f]">
                  <ClipboardList size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {assignment.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {assignment.subject}
                      </p>
                    </div>

                    <StatusBadge status={assignment.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-400">
                        Class
                      </p>

                      <p className="mt-1 text-gray-700">
                        {assignment.className} -{" "}
                        {assignment.section}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Due Date
                      </p>

                      <p className="mt-1 text-gray-700">
                        {assignment.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-sm text-gray-500">
            No assignments found.
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Assignment["status"];
}) {
  const styles = {
    Pending: "bg-yellow-50 text-yellow-600",
    Submitted: "bg-green-50 text-green-600",
    Overdue: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}