"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserRound,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

import { classes } from "@/data/classes";
import { students } from "@/data/students";
import { SchoolClass } from "@/types/class";

export default function ClassTable() {
  const [search, setSearch] = useState("");
  const [classList, setClassList] = useState(classes);

  const getStudentCount = (schoolClass: SchoolClass) => {
    const className = `${schoolClass.name}-${schoolClass.section}`;

    return students.filter(
      (student) => student.class === className
    ).length;
  };

  const filteredClasses = classList.filter((schoolClass) =>
    `${schoolClass.name} ${schoolClass.section} ${schoolClass.teacher} ${schoolClass.room}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmed) return;

    setClassList((prev) =>
      prev.filter((schoolClass) => schoolClass.id !== id)
    );
  };

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
          placeholder="Search classes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-5 py-4 text-left font-semibold text-gray-600">
                  Class
                </th>

                <th className="px-5 py-4 text-left font-semibold text-gray-600">
                  Section
                </th>

                <th className="px-5 py-4 text-left font-semibold text-gray-600">
                  Class Teacher
                </th>

                <th className="px-5 py-4 text-left font-semibold text-gray-600">
                  Students
                </th>

                <th className="px-5 py-4 text-left font-semibold text-gray-600">
                  Room
                </th>

                <th className="px-5 py-4 text-left font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-5 py-4 text-center font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredClasses.map((schoolClass) => (
                <tr
                  key={schoolClass.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70"
                >
                  {/* Class */}
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {schoolClass.name}
                  </td>

                  {/* Section */}
                  <td className="px-5 py-4 text-gray-600">
                    {schoolClass.section}
                  </td>

                  {/* Teacher */}
                  <td className="px-5 py-4 text-gray-600">
                    {schoolClass.teacher}
                  </td>

                  {/* Students */}
                  <td className="px-5 py-4 text-gray-600">
                    {getStudentCount(schoolClass)}
                  </td>

                  {/* Room */}
                  <td className="px-5 py-4 text-gray-600">
                    {schoolClass.room}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        schoolClass.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {schoolClass.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/dashboard/classes/${schoolClass.id}`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                        title="View class"
                      >
                        <UserRound size={17} />
                      </Link>

                      <Link
                        href={`/dashboard/classes/${schoolClass.id}/edit`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                        title="Edit class"
                      >
                        <Pencil size={17} />
                      </Link>

                      <button
                        onClick={() => handleDelete(schoolClass.id)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete class"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {filteredClasses.map((schoolClass) => (
          <div
            key={schoolClass.id}
            className="rounded-2xl border border-gray-200 bg-white p-4"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {schoolClass.name} - {schoolClass.section}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {schoolClass.teacher}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  schoolClass.status === "Active"
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {schoolClass.status}
              </span>
            </div>

            {/* Details */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-400">
                  Students
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {getStudentCount(schoolClass)}
                </p>
              </div>

              <div>
                <p className="text-gray-400">
                  Room
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {schoolClass.room}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-center gap-2 border-t border-gray-100 pt-3">
              <Link
                href={`/dashboard/classes/${schoolClass.id}`}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                title="View class"
              >
                <UserRound size={17} />
              </Link>

              <Link
                href={`/dashboard/classes/${schoolClass.id}/edit`}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                title="Edit class"
              >
                <Pencil size={17} />
              </Link>

              <button
                onClick={() => handleDelete(schoolClass.id)}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                title="Delete class"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredClasses.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-10 text-center text-sm text-gray-500">
          No classes found.
        </div>
      )}
    </div>
  );
}