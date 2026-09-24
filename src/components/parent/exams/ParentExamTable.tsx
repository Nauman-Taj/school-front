"use client";

import { useState } from "react";
import {
  Search,
  Clock3,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { ParentExam } from "@/types/parentExam";

type ParentExamTableProps = {
  exams: ParentExam[];
};

export default function ParentExamTable({
  exams,
}: ParentExamTableProps) {
  const [search, setSearch] = useState("");

  const filteredExams = exams.filter((exam) => {
    const searchTerm = search.toLowerCase();

    return (
      exam.examName.toLowerCase().includes(searchTerm) ||
      exam.subject.toLowerCase().includes(searchTerm) ||
      exam.room.toLowerCase().includes(searchTerm) ||
      exam.status.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="space-y-4">
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

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Exam
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Subject
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Time
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Room
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
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
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    {exam.examName}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {exam.subject}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {exam.date}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {exam.time}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {exam.room}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        exam.status === "Upcoming"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-green-50 text-green-700"
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
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {exam.examName}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {exam.subject}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  exam.status === "Upcoming"
                    ? "bg-yellow-50 text-yellow-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {exam.status}
              </span>
            </div>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-[#01796F]" />
                <span>{exam.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-[#01796F]" />
                <span>{exam.time}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#01796F]" />
                <span>{exam.room}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredExams.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No exams found.
          </div>
        )}
      </div>

      {/* Desktop Empty State */}
      {filteredExams.length === 0 && (
        <div className="hidden rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 md:block">
          No exams found.
        </div>
      )}
    </div>
  );
}