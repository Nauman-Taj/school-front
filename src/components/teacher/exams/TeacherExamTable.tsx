"use client";

import { Search, FileText } from "lucide-react";

import { Exam } from "@/types/exam";

type TeacherExamTableProps = {
  exams: Exam[];
  search: string;
  setSearch: (value: string) => void;
};

export default function TeacherExamTable({
  exams,
  search,
  setSearch,
}: TeacherExamTableProps) {
  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="relative max-w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exams"
            className="w-full rounded-full border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796f]"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Exam
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Subject
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Class
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Exam Date
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Total Marks
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {exams.length > 0 ? (
                exams.map((exam) => (
                  <tr
                    key={exam.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#01796f]/10 text-[#01796f]">
                          <FileText size={18} />
                        </div>

                        <span className="font-medium text-gray-900">
                          {exam.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {exam.subject}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {exam.className} - {exam.section}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {exam.examDate}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {exam.totalMarks}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          exam.status === "Upcoming"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-green-50 text-green-600"
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
                    colSpan={6}
                    className="px-5 py-8 text-center text-sm text-gray-500"
                  >
                    No exams found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <div
              key={exam.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
                  <FileText size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-gray-900">
                    {exam.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {exam.subject}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    exam.status === "Upcoming"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {exam.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">
                    Class:
                  </span>{" "}
                  {exam.className} - {exam.section}
                </p>

                <p>
                  <span className="font-medium text-gray-900">
                    Exam Date:
                  </span>{" "}
                  {exam.examDate}
                </p>

                <p>
                  <span className="font-medium text-gray-900">
                    Total Marks:
                  </span>{" "}
                  {exam.totalMarks}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No exams found.
          </div>
        )}
      </div>
    </div>
  );
}