"use client";

import Link from "next/link";
import {
  Search,
  UserRound,
} from "lucide-react";

import { Student } from "@/types/student";

type TeacherStudentTableProps = {
  students: Student[];
  search: string;
  setSearch: (value: string) => void;
};

export default function TeacherStudentTable({
  students,
  search,
  setSearch,
}: TeacherStudentTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
      <div className="border-b border-gray-200 p-5">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students"
            className="w-full rounded-full border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#01796f]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Student
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Class
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Roll No
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Parent
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
                        <UserRound size={18} />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {student.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {student.className}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {student.rollNo}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {student.parentName}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${student.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                        }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/teacher/students/${student.id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-[#01796f] hover:bg-[#e6f4f2] hover:text-[#01796f]"
                    >
                      <UserRound size={16} />
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-gray-500"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}