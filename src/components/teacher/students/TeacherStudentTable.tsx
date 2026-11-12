"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import type { TeacherStudent } from "@/lib/teacher-api";

type TeacherStudentTableProps = {
  students: TeacherStudent[];
  search: string;
  setSearch: (value: string) => void;
  total: number;
};

export default function TeacherStudentTable({
  students,
  search,
  setSearch,
  total,
}: TeacherStudentTableProps) {
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
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students"
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Student</th>
                <th className="px-5 py-4 font-semibold">Class</th>
                <th className="px-5 py-4 font-semibold">Roll No</th>
                <th className="px-5 py-4 font-semibold">Parent</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-center font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">
                      {student.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {student.email}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {student.className} - {student.section}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {student.rollNo}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {student.parentName || "-"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        student.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <Link
                      href={`/teacher/students/${student.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 transition hover:border-[#01796f] hover:bg-[#e6f4f2] hover:text-[#01796f]"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-center text-sm text-gray-500"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {students.length} of {total} students
        </div>
      </div>
    </div>
  );
}
