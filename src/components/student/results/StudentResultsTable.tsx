"use client";

import { useState } from "react";
import {
  Award,
  Search,
} from "lucide-react";

import { results } from "@/data/results";
import { Result } from "@/types/result";

export default function StudentResultsTable() {
  const [resultList] = useState<Result[]>(
    results.filter((result) => result.studentId === 1)
  );

  const [search, setSearch] = useState("");

  const filteredResults = resultList.filter((result) =>
    `${result.subject} ${result.teacher} ${result.grade} ${result.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Subject Results
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View your marks, grades, and examination results.
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
            placeholder="Search result"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Subject
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Teacher
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                Marks
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                Percentage
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                Grade
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredResults.map((result) => (
              <tr
                key={result.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                      <Award size={18} strokeWidth={1.8} />
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {result.subject}
                      </p>

                      <p className="text-xs text-gray-400">
                        {result.className} - {result.section}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {result.teacher}
                </td>

                <td className="px-5 py-4 text-center text-sm font-medium text-gray-700">
                  {result.obtainedMarks}/{result.totalMarks}
                </td>

                <td className="px-5 py-4 text-center text-sm text-gray-600">
                  {result.percentage}%
                </td>

                <td className="px-5 py-4 text-center">
                  <span className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-semibold text-[#01796F]">
                    {result.grade}
                  </span>
                </td>

                <td className="px-5 py-4 text-center">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                    {result.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 p-4 md:hidden">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <Award size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {result.subject}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {result.className} - {result.section}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#e6f4f2] px-2.5 py-1 text-xs font-semibold text-[#01796F]">
                {result.grade}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
              <div>
                <p className="text-xs text-gray-400">Teacher</p>
                <p className="mt-1 text-sm text-gray-600">
                  {result.teacher}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Marks</p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {result.obtainedMarks}/{result.totalMarks}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Percentage</p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {result.percentage}%
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Status</p>
                <span className="mt-1 inline-block rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                  {result.status}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredResults.length === 0 && (
          <div className="p-6 text-center text-sm text-gray-500">
            No results found.
          </div>
        )}
      </div>

      {/* Desktop Empty State */}
      {filteredResults.length === 0 && (
        <div className="hidden p-10 text-center text-sm text-gray-500 md:block">
          No results found.
        </div>
      )}
    </div>
  );
}