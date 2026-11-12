"use client";

import Link from "next/link";
import { Search, Users } from "lucide-react";

import { TeacherClassView } from "@/types/class";

type TeacherClassTableProps = {
  classes: TeacherClassView[];
  search: string;
  setSearch: (value: string) => void;
  total: number;
};

export default function TeacherClassTable({
  classes,
  search,
  setSearch,
  total,
}: TeacherClassTableProps) {
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
            placeholder="Search classes"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Class</th>
                <th className="px-5 py-4 font-semibold">Subject</th>
                <th className="px-5 py-4 font-semibold">Room</th>
                <th className="px-5 py-4 font-semibold">Schedule</th>
                <th className="px-5 py-4 text-center font-semibold">
                  Students
                </th>
                <th className="px-5 py-4 text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {classes.map((item) => (
                <tr
                  key={item.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">
                      {item.className} - {item.section}
                    </p>

                    {item.classTeacher && (
                      <span className="mt-1 inline-flex shrink-0 rounded-full bg-[#e6f4f2] px-2.5 py-1 text-xs font-medium text-[#01796f]">
                        Class Teacher
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {item.subject || "-"}
                  </td>

                  <td className="px-5 py-4 text-gray-600">{item.room}</td>

                  <td className="px-5 py-4 text-gray-600">
                    {item.schedule}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={15} className="text-[#01796f]" />
                      {item.students}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <Link
                      href={`/teacher/classes/${item.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 transition hover:border-[#01796f] hover:bg-[#e6f4f2] hover:text-[#01796f]"
                    >
                      View Class
                    </Link>
                  </td>
                </tr>
              ))}

              {classes.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-center text-sm text-gray-500"
                  >
                    No classes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {classes.length} of {total} classes
        </div>
      </div>
    </div>
  );
}
