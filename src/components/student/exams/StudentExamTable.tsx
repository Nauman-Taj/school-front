"use client";

import { FileText, Search } from "lucide-react";

import type { ApiStudentExam } from "@/lib/student-api";

type Props = {
  exams: ApiStudentExam[];
  search: string;
  setSearch: (value: string) => void;
  total: number;
};

const statusStyles: Record<string, string> = {
  Completed: "bg-green-50 text-green-700",
  Upcoming: "bg-yellow-50 text-yellow-700",
};

export default function StudentExamTable({
  exams,
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
            placeholder="Search exams"
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
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold">Total Marks</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {exams.length > 0 ? (
                exams.map((exam) => (
                  <tr key={exam.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                          <FileText size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">
                            {exam.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {exam.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">{exam.subject}</td>

                    <td className="px-5 py-4 text-gray-600">{exam.examDate}</td>

                    <td className="px-5 py-4 text-gray-600">
                      {exam.totalMarks}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                          statusStyles[exam.status] ??
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {exam.status}
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
                    No exams found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {exams.length} of {total} exams
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <div
              key={exam.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                    <FileText size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{exam.name}</p>

                    <p className="mt-1 text-xs text-gray-500">
                      {exam.subject} · {exam.examDate}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    statusStyles[exam.status] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {exam.status}
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Total marks: {exam.totalMarks}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            No exams found.
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 md:hidden">
        Showing {exams.length} of {total} exams
      </p>
    </div>
  );
}
