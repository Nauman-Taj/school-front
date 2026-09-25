"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Clock,
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { studentAssignments } from "@/data/studentAssignments";
import { StudentAssignmentStatus } from "@/types/studentAssignment";

const statusStyles: Record<StudentAssignmentStatus, string> = {
  Pending: "bg-yellow-50 text-yellow-700",
  Submitted: "bg-green-50 text-green-700",
  Overdue: "bg-red-50 text-red-700",
};

export default function StudentAssignmentsPage() {
  const [search, setSearch] = useState("");

  const filteredAssignments = studentAssignments.filter((assignment) =>
    `${assignment.title} ${assignment.subject} ${assignment.teacher}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sections: StudentAssignmentStatus[] = [
    "Pending",
    "Submitted",
    "Overdue",
  ];

  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Assignments
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your assignments.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Assignments",
            value: studentAssignments.length,
            icon: FileText,
          },
          {
            title: "Pending",
            value: studentAssignments.filter(
              (assignment) => assignment.status === "Pending"
            ).length,
            icon: Clock,
          },
          {
            title: "Submitted",
            value: studentAssignments.filter(
              (assignment) => assignment.status === "Submitted"
            ).length,
            icon: CheckCircle2,
          },
          {
            title: "Overdue",
            value: studentAssignments.filter(
              (assignment) => assignment.status === "Overdue"
            ).length,
            icon: AlertCircle,
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <Icon size={20} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-900">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
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

      {/* Assignment Sections */}
      {sections.map((status) => {
        const assignments = filteredAssignments.filter(
          (assignment) => assignment.status === status
        );

        return (
          <section key={status} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {status}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
              >
                {assignments.length}
              </span>
            </div>

            {assignments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
                No {status.toLowerCase()} assignments found.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {assignments.map((assignment) => (
                  <Link
                    key={assignment.id}
                    href={`/dashboard/studentassignments/${assignment.id}`}
                    className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-[#01796F] hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                        <BookOpen size={20} />
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[assignment.status]}`}
                      >
                        {assignment.status}
                      </span>
                    </div>

                    <h3 className="mt-4 font-semibold text-gray-900">
                      {assignment.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {assignment.subject}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        {assignment.dueDate}
                      </div>

                      <div className="flex items-center gap-2">
                        <FileText size={16} />
                        {assignment.teacher}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {assignment.className}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}