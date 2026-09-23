"use client";

import { ParentResult } from "@/types/parentResult";

type ParentResultsTableProps = {
  results: ParentResult[];
};

export default function ParentResultsTable({
  results,
}: ParentResultsTableProps) {
  return (
    <>
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
            {results.map((result) => (
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
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {results.map((result) => (
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
      </div>
    </>
  );
}

