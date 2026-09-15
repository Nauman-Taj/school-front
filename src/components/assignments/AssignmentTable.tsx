"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";

import { assignments } from "@/data/assignments";

const statusStyles = {
  Pending: "bg-yellow-50 text-yellow-700",
  Submitted: "bg-green-50 text-green-700",
  Overdue: "bg-red-50 text-red-700",
};

export default function AssignmentTable() {
  const [assignmentList, setAssignmentList] = useState(assignments);
  const [search, setSearch] = useState("");

  const filteredAssignments = assignmentList.filter((assignment) =>
    [
      assignment.title,
      assignment.subject,
      assignment.className,
      assignment.teacher,
      assignment.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    const assignment = assignmentList.find(
      (assignment) => assignment.id === id
    );

    if (!assignment) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${assignment.title}?`
    );

    if (!confirmed) return;

    setAssignmentList((currentAssignments) =>
      currentAssignments.filter((assignment) => assignment.id !== id)
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage class assignments and submissions.
          </p>
        </div>

        <Link
          href="/dashboard/assignments/add"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#01796F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
        >
          <Plus size={17} />
          Add Assignment
        </Link>
      </div>

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
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Assignment
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Class
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Teacher
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAssignments.map((assignment) => (
                <tr
                  key={assignment.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                        <ClipboardList size={18} />
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {assignment.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {assignment.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {assignment.subject}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {assignment.className}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {assignment.teacher}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {assignment.dueDate}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[assignment.status]}`}
                    >
                      {assignment.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/dashboard/assignments/${assignment.id}`}
                        title="View"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
                      >
                        <UserRound size={17} />
                      </Link>

                      <Link
                        href={`/dashboard/assignments/${assignment.id}/edit`}
                        title="Edit"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
                      >
                        <Pencil size={17} />
                      </Link>

                      <button
                        type="button"
                        title="Delete"
                        onClick={() => handleDelete(assignment.id)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <ClipboardList size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {assignment.title}
                  </h3>
                  <p className="text-xs text-gray-500">{assignment.id}</p>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[assignment.status]}`}
              >
                {assignment.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-400">Subject</p>
                <p className="mt-1 font-medium text-gray-700">
                  {assignment.subject}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Class</p>
                <p className="mt-1 font-medium text-gray-700">
                  {assignment.className}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Teacher</p>
                <p className="mt-1 font-medium text-gray-700">
                  {assignment.teacher}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Due Date</p>
                <p className="mt-1 font-medium text-gray-700">
                  {assignment.dueDate}
                </p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="mt-5 flex items-center justify-center gap-2 border-t border-gray-100 pt-4">
              <Link
                href={`/dashboard/assignments/${assignment.id}`}
                title="View"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
              >
                <UserRound size={17} />
              </Link>

              <Link
                href={`/dashboard/assignments/${assignment.id}/edit`}
                title="Edit"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
              >
                <Pencil size={17} />
              </Link>

              <button
                type="button"
                title="Delete"
                onClick={() => handleDelete(assignment.id)}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}

        {filteredAssignments.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No assignments found.
          </div>
        )}
      </div>
    </div>
  );
}