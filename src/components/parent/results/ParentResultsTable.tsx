"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { ParentResult } from "@/types/parentResult";

type ParentResultsTableProps = {
  results: ParentResult[];
};

export default function ParentResultsTable({
  results,
}: ParentResultsTableProps) {
  const [search, setSearch] = useState("");

  const filteredResults = results.filter((result) => {
    const searchTerm = search.toLowerCase();

    return (
      result.subject.toLowerCase().includes(searchTerm) ||
      result.exam.toLowerCase().includes(searchTerm) ||
      result.grade.toLowerCase().includes(searchTerm) ||
      result.percentage.toString().includes(searchTerm) ||
      result.obtainedMarks.toString().includes(searchTerm) ||
      result.totalMarks.toString().includes(searchTerm)
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
          placeholder="Search results"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
        />
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="px-6 py-4 font-medium">Subject</th>
              <th className="px-6 py-4 font-medium">Exam</th>
              <th className="px-6 py-4 font-medium">Marks</th>
              <th className="px-6 py-4 font-medium">Percentage</th>
              <th className="px-6 py-4 text-center font-medium">
                Grade
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredResults.map((result) => (
              <tr
                key={result.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {result.subject}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {result.exam}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {result.obtainedMarks} / {result.totalMarks}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {result.percentage}%
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="inline-flex min-w-10 justify-center rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-semibold text-[#01796f]">
                    {result.grade}
                  </span>
                </td>
              </tr>
            ))}

            {filteredResults.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="rounded-2xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900">
                  {result.subject}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {result.exam}
                </p>
              </div>

              <span className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-semibold text-[#01796f]">
                {result.grade}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Marks</p>
                <p className="mt-1 font-medium text-gray-900">
                  {result.obtainedMarks} / {result.totalMarks}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Percentage</p>
                <p className="mt-1 font-medium text-gray-900">
                  {result.percentage}%
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredResults.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}
