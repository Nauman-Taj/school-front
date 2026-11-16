"use client";

import { BookOpen, Search } from "lucide-react";

import type { ApiStudentSubject } from "@/lib/student-api";

type Props = {
  subjects: ApiStudentSubject[];
  search: string;
  setSearch: (value: string) => void;
  total: number;
};

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-[#e6f4f2] text-[#01796F]",
  INACTIVE: "bg-gray-100 text-gray-600",
};

export default function StudentSubjectTable({
  subjects,
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
            type="search"
            placeholder="Search subjects"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Subject</th>
                <th className="px-5 py-4 font-semibold">Code</th>
                <th className="px-5 py-4 font-semibold">Teacher</th>
                <th className="px-5 py-4 font-semibold">Class</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <tr
                    key={subject.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                          <BookOpen size={18} />
                        </div>

                        <p className="font-medium text-gray-900">
                          {subject.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">{subject.code}</td>

                    <td className="px-5 py-4 text-gray-600">
                      {subject.teacher}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {subject.className} - {subject.section}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                          statusStyles[subject.status] ??
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {subject.status === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No subjects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {subjects.length} of {total} subjects
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <div
              key={subject.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                    <BookOpen size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">
                      {subject.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {subject.code} · {subject.teacher}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    statusStyles[subject.status] ??
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {subject.status === "ACTIVE" ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                {subject.className} - {subject.section}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            No subjects found.
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 md:hidden">
        Showing {subjects.length} of {total} subjects
      </p>
    </div>
  );
}
