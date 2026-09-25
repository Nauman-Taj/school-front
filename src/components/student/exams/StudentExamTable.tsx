"use client";

import { useState } from "react";
import {
  CalendarDays,
  ClipboardList,
  Search,
} from "lucide-react";

import { Exam } from "@/types/exam";

type StudentExamTableProps = {
  exams: Exam[];
};

export default function StudentExamTable({
  exams,
}: StudentExamTableProps) {
  const [search, setSearch] = useState("");

  const filteredExams = exams.filter((exam) =>
    `${exam.name} ${exam.subject} ${exam.className} ${exam.teacher} ${exam.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Examination Schedule
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View your exams, subjects, dates, and marks.
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
            placeholder="Search exam"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
          />
        </div>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Exam
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Subject
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Class
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Teacher
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Exam Date
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                Marks
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredExams.map((exam) => (
              <tr
                key={exam.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                      <ClipboardList
                        size={18}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {exam.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {exam.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {exam.subject}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {exam.className} - {exam.section}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {exam.teacher}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays
                      size={16}
                      className="text-gray-400"
                      strokeWidth={1.8}
                    />
                    {exam.examDate}
                  </div>
                </td>

                <td className="px-5 py-4 text-center text-sm font-medium text-gray-700">
                  {exam.totalMarks}
                </td>

                <td className="px-5 py-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      exam.status === "Completed"
                        ? "bg-green-50 text-green-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {exam.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 p-4 md:hidden">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <ClipboardList
                    size={18}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {exam.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {exam.subject} • {exam.className} -{" "}
                    {exam.section}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs ${
                  exam.status === "Completed"
                    ? "bg-green-50 text-green-600"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                {exam.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
              <div>
                <p className="text-xs text-gray-400">Teacher</p>
                <p className="mt-1 text-sm text-gray-600">
                  {exam.teacher}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Total Marks
                </p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {exam.totalMarks}
                </p>
              </div>

              <div className="col-span-2 flex items-center gap-2 border-t border-gray-100 pt-3">
                <CalendarDays
                  size={16}
                  className="text-gray-400"
                  strokeWidth={1.8}
                />

                <span className="text-sm text-gray-600">
                  {exam.examDate}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredExams.length === 0 && (
          <div className="p-6 text-center text-sm text-gray-500">
            No exams found.
          </div>
        )}
      </div>

      {filteredExams.length === 0 && (
        <div className="hidden p-10 text-center text-sm text-gray-500 md:block">
          No exams found.
        </div>
      )}
    </div>
  );
}