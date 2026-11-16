"use client";

import { Award, Search } from "lucide-react";

import type { ApiStudentResult } from "@/lib/student-api";

type Props = {
  results: ApiStudentResult[];
  search: string;
  setSearch: (value: string) => void;
  total: number;
};

const statusStyles: Record<string, string> = {
  Pass: "bg-green-50 text-green-700",
  Fail: "bg-red-50 text-red-700",
};

export default function StudentResultsTable({
  results,
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
            placeholder="Search results"
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
                <th className="px-5 py-4 font-semibold">Exam</th>
                <th className="px-5 py-4 font-semibold">Subject</th>
                <th className="px-5 py-4 font-semibold">Marks</th>
                <th className="px-5 py-4 font-semibold">Percentage</th>
                <th className="px-5 py-4 font-semibold">Grade</th>
                <th className="px-5 py-4 font-semibold">Result</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {results.length > 0 ? (
                results.map((result) => (
                  <tr key={result.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                          <Award size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">
                            {result.exam}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {result.teacher}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {result.subject}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {result.obtainedMarks} / {result.totalMarks}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {result.percentage}%
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex shrink-0 rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796F]">
                        {result.grade}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                          statusStyles[result.status] ??
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {result.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {results.length} of {total} results
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {results.length > 0 ? (
          results.map((result) => (
            <div
              key={result.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                    <Award size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{result.exam}</p>

                    <p className="mt-1 text-xs text-gray-500">
                      {result.subject} · {result.obtainedMarks}/
                      {result.totalMarks}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    statusStyles[result.status] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {result.status}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-600">
                <span>{result.percentage}%</span>
                <span className="font-medium text-[#01796F]">
                  {result.grade}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            No results found.
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 md:hidden">
        Showing {results.length} of {total} results
      </p>
    </div>
  );
}
