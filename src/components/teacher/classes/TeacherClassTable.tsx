"use client";

import Link from "next/link";
import {
  Search,
  Eye,
  Users,
} from "lucide-react";

import { TeacherClass } from "@/types/teacher/teacherClass";

type TeacherClassTableProps = {
  classes: TeacherClass[];
  search: string;
  setSearch: (value: string) => void;
};

export default function TeacherClassTable({
  classes,
  search,
  setSearch,
}: TeacherClassTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
      {/* Search */}
      <div className="border-b border-gray-200 p-5">
        <div className="relative max-w-full">
          <Search
            size={18}
            strokeWidth={2}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search classes"
            className="w-full rounded-full border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Class
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Subject
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Room
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Schedule
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Students
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Role
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {classes.length > 0 ? (
              classes.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">
                      {item.className} - {item.section}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.subject}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.room}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.schedule}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users
                        size={16}
                        strokeWidth={2}
                        className="text-[#01796f]"
                      />

                      {item.students}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {item.classTeacher ? (
                      <span className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                        Class Teacher
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">
                        Subject Teacher
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/teacher/classes/${item.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#01796f] hover:bg-[#e6f4f2] hover:text-[#01796f]"
                    >
                      <Eye
                        size={16}
                        strokeWidth={2}
                      />
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-sm text-gray-500"
                >
                  No classes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}