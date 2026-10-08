"use client";

import { useState } from "react";
import {
  Search,
  CalendarDays,
  Check,
  Clock3,
} from "lucide-react";

import { Exam } from "@/types/exam";

type ParentExamTableProps = {
  exams: Exam[];
};

const statusStyles = {
  Upcoming: {
    className: "bg-yellow-50 text-yellow-700",
    icon: Clock3,
  },
  Completed: {
    className: "bg-green-50 text-green-700",
    icon: Check,
  },
};

export default function ParentExamTable({
  exams,
}: ParentExamTableProps) {
  const [search, setSearch] = useState("");

  const filteredExams = exams.filter((exam) => {
    const searchTerm = search.toLowerCase();

    return (
      exam.name.toLowerCase().includes(searchTerm) ||
      exam.subject.toLowerCase().includes(searchTerm) ||
      exam.teacher.toLowerCase().includes(searchTerm) ||
      exam.examDate.toLowerCase().includes(searchTerm) ||
      exam.status.toLowerCase().includes(searchTerm)
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
          placeholder="Search exams"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
        />
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white md:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200 text-left">
              <th className="px-6 py-4 font-semibold text-gray-600">
                Exam
              </th>

              <th className="px-6 py-4 font-semibold text-gray-600">
                Subject
              </th>

              <th className="px-6 py-4 font-semibold text-gray-600">
                Date
              </th>

              <th className="px-6 py-4 font-semibold text-gray-600">
                Teacher
              </th>

              <th className="px-6 py-4 font-semibold text-gray-600">
                Total Marks
              </th>

              <th className="px-6 py-4 font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredExams.map((exam) => {
              const status = statusStyles[exam.status];
              const Icon = status.icon;

              return (
                <tr
                  key={exam.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {exam.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {exam.subject}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(
                      exam.examDate
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {exam.teacher}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {exam.totalMarks}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                    >
                      <Icon size={14} />
                      {exam.status}
                    </span>
                  </td>
                </tr>
              );
            })}

            {filteredExams.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  No exam records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {filteredExams.map((exam) => {
          const status = statusStyles[exam.status];
          const Icon = status.icon;

          return (
            <div
              key={exam.id}
              className="rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    {exam.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {exam.subject}
                  </p>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                >
                  <Icon size={14} />
                  {exam.status}
                </span>
              </div>

              <div className="mt-4 space-y-3 border-t border-gray-100 pt-4 text-sm">
                <div className="flex items-center gap-3 text-gray-600">
                  <CalendarDays
                    size={16}
                    className="text-gray-400"
                  />

                  {new Date(
                    exam.examDate
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Teacher</span>
                  <span>{exam.teacher}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Total Marks</span>
                  <span className="font-medium text-gray-900">
                    {exam.totalMarks}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredExams.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
            No exam records found.
          </div>
        )}
      </div>
    </div>
  );
}