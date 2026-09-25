"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Pencil,
  Search,
  XCircle,
} from "lucide-react";

import { Assignment } from "@/types/assignment";

function StatusBadge({
  status,
}: {
  status: Assignment["status"];
}) {
  const styles = {
    Pending: "bg-yellow-50 text-yellow-700",
    Submitted: "bg-green-50 text-green-700",
    Overdue: "bg-red-50 text-red-700",
  };

  const icons = {
    Pending: <Clock3 size={14} />,
    Submitted: <CheckCircle2 size={14} />,
    Overdue: <XCircle size={14} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

type StudentAssignmentTableProps = {
  assignments: Assignment[];
};

export default function StudentAssignmentTable({
  assignments,
}: StudentAssignmentTableProps) {
  const [search, setSearch] = useState("");

  const filteredAssignments = assignments.filter((assignment) => {
    const query = search.toLowerCase();

    return (
      assignment.title.toLowerCase().includes(query) ||
      assignment.subject.toLowerCase().includes(query) ||
      assignment.teacher.toLowerCase().includes(query) ||
      assignment.status.toLowerCase().includes(query)
    );
  });

  const pendingCount = assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;

  const submittedCount = assignments.filter(
    (assignment) => assignment.status === "Submitted"
  ).length;

  const overdueCount = assignments.filter(
    (assignment) => assignment.status === "Overdue"
  ).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Assignments"
          value={assignments.length}
          icon={<FileText size={20} />}
          iconClass="text-[#01796f]"
        />

        <SummaryCard
          title="Pending"
          value={pendingCount}
          icon={<Clock3 size={20} />}
          iconClass="text-yellow-500"
        />

        <SummaryCard
          title="Submitted"
          value={submittedCount}
          icon={<CheckCircle2 size={20} />}
          iconClass="text-green-500"
        />

        <SummaryCard
          title="Overdue"
          value={overdueCount}
          icon={<XCircle size={20} />}
          iconClass="text-red-500"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Assignment List
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your current assignments and submission status.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                strokeWidth={1.8}
              />

              <input
                type="text"
                placeholder="Search assignments"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Assignment
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Subject
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Teacher
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Due Date
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredAssignments.map((assignment) => (
                <tr
                  key={assignment.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {assignment.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {assignment.id}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {assignment.subject}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {assignment.teacher}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays
                        size={16}
                        className="text-[#01796f]"
                        strokeWidth={1.8}
                      />

                      {assignment.dueDate}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={assignment.status} />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/student/assignments/${assignment.id}`}
                        className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-[#e6f4f2] hover:text-[#01796f]"
                        title="View Assignment"
                      >
                        <Eye size={17} strokeWidth={1.8} />
                      </Link>

                      {assignment.status !== "Submitted" && (
                        <Link
                          href={`/student/assignments/${assignment.id}`}
                          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-[#e6f4f2] hover:text-[#01796f]"
                          title="Submit Assignment"
                        >
                          <Pencil size={17} strokeWidth={1.8} />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredAssignments.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div
          className={`rounded-xl bg-[#e6f4f2] p-2.5 ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Assignment record
      </p>
    </div>
  );
}