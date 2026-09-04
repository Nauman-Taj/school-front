"use client";

import Link from "next/link";
import { useState } from "react";
import {
  UserRound,
  Pencil,
  Search,
  UserPlus,
} from "lucide-react";

import { students } from "@/data/students";
import StudentCard from "@/components/students/StudentCard";

export default function StudentTable() {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase().trim();

    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.class.toLowerCase().includes(query) ||
      student.rollNo.toLowerCase().includes(query) ||
      student.parentName.toLowerCase().includes(query) ||
      student.phone.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Students
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage and view all students.
          </p>
        </div>

        <Link
          href="/dashboard/students/add"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
        >
          <UserPlus size={17} />
          Add Student
        </Link>
      </div>

      {/* Search */}
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
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-sm font-semibold text-gray-700">
                  Student
                </th>

                <th className="ps-6 pe-6 py-3.5 text-sm font-semibold text-gray-700">
                  Roll No.
                </th>

                <th className="px-6 py-3.5 text-sm font-semibold text-gray-700">
                  Class
                </th>

                <th className="px-6 py-3.5 text-sm font-semibold text-gray-700">
                  Parent
                </th>

                <th className="px-6 py-3.5 text-sm font-semibold text-gray-700">
                  Phone
                </th>

                <th className="px-6 py-3.5 text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="px-6 py-3.5 text-right text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
                        <UserRound
                          size={19}
                          strokeWidth={1.8}
                        />
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {student.name}
                        </p>

                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-3.5 text-sm text-gray-600">
                    {student.rollNo}
                  </td>

                  <td className="ps-6 py-3.5">
                    <span className="rounded-full bg-[#01796f]/10 px-2 py-1 text-sm font-medium text-[#01796f]">
                      {student.class}
                    </span>
                  </td>

                  <td className="px-6 py-3.5 text-sm text-gray-600">
                    {student.parentName}
                  </td>

                  <td className="px-6 py-3.5 text-sm text-gray-600">
                    {student.phone}
                  </td>

                  <td className="px-6 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${student.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-6 py-3.5">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/students/${student.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#01796f]/10 hover:text-[#01796f]"
                        aria-label={`View ${student.name}`}
                      >
                        <UserRound
                          size={17}
                          strokeWidth={1.8}
                        />
                      </Link>

                      <Link
                        href={`/dashboard/students/${student.id}/edit`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#01796f]/10 hover:text-[#01796f]"
                        aria-label={`Edit ${student.name}`}
                      >
                        <Pencil
                          size={17}
                          strokeWidth={1.8}
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-6 py-3.5 text-sm text-gray-500">
          Showing {filteredStudents.length} student
          {filteredStudents.length !== 1 ? "s" : ""} out of {students.length}
        </div>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="space-y-4 lg:hidden">
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
          />
        ))}

        {filteredStudents.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-10 text-center text-sm text-gray-500 shadow-sm">
            No students found.
          </div>
        )}
      </div>
    </div>
  );
}