"use client";

import Link from "next/link";
import {
  UserRound, GraduationCap, Pencil, Trash2, UserPlus, Search,
} from "lucide-react";
import { useState } from "react";

import { teachers } from "@/data/teachers";
import TeacherCard from "./TeacherCard";

export default function TeacherTable() {
  const [search, setSearch] = useState("");

  const filteredTeachers = teachers.filter((teacher) => {
    const searchTerm = search.toLowerCase();

    return (
      teacher.name.toLowerCase().includes(searchTerm) ||
      teacher.email.toLowerCase().includes(searchTerm) ||
      teacher.phone.toLowerCase().includes(searchTerm) ||
      teacher.subject.toLowerCase().includes(searchTerm) ||
      teacher.qualification.toLowerCase().includes(searchTerm) ||
      teacher.id.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Teachers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage teachers and their information.
          </p>
        </div>

        <Link
          href="/dashboard/teachers/add"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
        >
          <UserPlus size={17} />
          Add Teacher
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
          placeholder="Search teachers"
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white md:block">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3.5 text-sm font-semibold text-gray-700">
                Teacher
              </th>

              <th className="px-6 py-3.5 text-sm font-semibold text-gray-700">
                ID
              </th>

              <th className="px-6 py-3.5 text-sm font-semibold text-gray-700">
                Phone
              </th>

              <th className="px-6 py-3.5 text-sm font-semibold text-gray-700">
                Subject
              </th>

              <th className="px-6 py-3.5 text-sm font-semibold text-gray-700">
                Qualification
              </th>

              <th className="px-6 py-3.5 text-sm font-semibold text-gray-700">
                Joining Date
              </th>

              <th className="px-6 py-3.5 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredTeachers.map((teacher) => (
              <tr
                key={teacher.id}
                className="transition hover:bg-gray-50"
              >
                {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
                      <GraduationCap size={19} strokeWidth={1.8} />
                    </div> */}
                <td className="px-6 py-3.5">
                  <div>
                    <p className="font-medium text-gray-900">
                      {teacher.name}
                    </p>
                  </div>
                </td>

                <td>
                  <p className="px-6 py-3.5 text-sm text-gray-600">
                    {teacher.id}
                  </p>
                </td>

                <td className="px-6 py-3.5 text-sm text-gray-600">
                  {teacher.phone}
                </td>

                <td className="px-6 py-3.5 text-sm text-gray-600">
                  {teacher.subject}
                </td>

                <td className="px-6 py-3.5 text-sm text-gray-600">
                  {teacher.qualification}
                </td>

                <td className="px-6 py-3.5 text-sm text-gray-600">
                  {teacher.joiningDate}
                </td>

                <td className="px-6 py-3.5">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/dashboard/teachers/${teacher.id}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#01796f]/10 hover:text-[#01796f]"
                      aria-label={`View ${teacher.name}`}
                    >
                      <UserRound size={17} strokeWidth={1.8} />
                    </Link>

                    <Link
                      href={`/dashboard/teachers/${teacher.id}/edit`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#01796f]/10 hover:text-[#01796f]"
                      aria-label={`Edit ${teacher.name}`}
                    >
                      <Pencil size={17} strokeWidth={1.8} />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(teacher.id, teacher.name)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${teacher.name}`}
                    >
                      <Trash2 size={17} strokeWidth={1.8} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-gray-100 px-6 py-3.5 text-sm text-gray-500">
          Showing {filteredTeachers.length} teacher
          {filteredTeachers.length !== 1 ? "s" : ""} out of{" "}
          {teachers.length}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {filteredTeachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
          />
        ))}
      </div>

      {/* No Results */}
      {
        filteredTeachers.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white py-12 text-center">
            <p className="text-sm text-gray-500">
              No teachers found.
            </p>
          </div>
        )
      }
    </div >
  );
}