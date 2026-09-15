"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  BookOpen,
  UserRound,
} from "lucide-react";

import { subjects } from "@/data/subjects";

export default function SubjectTable() {
  const [subjectList, setSubjectList] = useState(subjects);
  const [search, setSearch] = useState("");

  const filteredSubjects = subjectList.filter((subject) =>
    `${subject.name} ${subject.code} ${subject.className} ${subject.teacher}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    const subject = subjectList.find((subject) => subject.id === id);

    if (!subject) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${subject.name}?`
    );

    if (!confirmed) return;

    setSubjectList((currentSubjects) =>
      currentSubjects.filter((subject) => subject.id !== id)
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subjects</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage school subjects and their assigned teachers.
          </p>
        </div>

        <Link
          href="/dashboard/subjects/add"
          className="inline-flex items-center gap-2 rounded-full bg-[#01796F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
        >
          <Plus size={17} />
          Add Subject
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
          placeholder="Search subjects"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Subject
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Code
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Teacher
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredSubjects.map((subject) => (
                <tr
                  key={subject.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70"
                >
                  {/* Subject */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                        <BookOpen size={19} />
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {subject.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {subject.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Code */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {subject.code}
                  </td>

                  {/* Class */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {subject.className}
                  </td>

                  {/* Teacher */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <UserRound size={16} className="text-gray-400" />
                      {subject.teacher}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/dashboard/subjects/${subject.id}`}
                        title="View"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
                      >
                        <Eye size={17} />
                      </Link>

                      <Link
                        href={`/dashboard/subjects/${subject.id}/edit`}
                        title="Edit"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
                      >
                        <Pencil size={17} />
                      </Link>

                      <button
                        type="button"
                        title="Delete"
                        onClick={() => handleDelete(subject.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
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

        {/* No results */}
        {filteredSubjects.length === 0 && (
          <div className="px-6 py-12 text-center">
            <BookOpen className="mx-auto mb-3 text-gray-400" size={30} />

            <p className="text-sm font-medium text-gray-700">
              No subjects found
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Try searching with a different keyword.
            </p>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.id}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                <BookOpen size={19} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  {subject.name}
                </h3>

                <p className="text-xs text-gray-500">
                  {subject.code}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Class</span>

                <span className="font-medium text-gray-800">
                  {subject.className}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Teacher</span>

                <span className="text-right font-medium text-gray-800">
                  {subject.teacher}
                </span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="mt-4 flex items-center justify-center gap-2 border-t border-gray-100 pt-4">
              <Link
                href={`/dashboard/subjects/${subject.id}`}
                title="View"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
              >
                <Eye size={17} />
              </Link>

              <Link
                href={`/dashboard/subjects/${subject.id}/edit`}
                title="Edit"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
              >
                <Pencil size={17} />
              </Link>

              <button
                type="button"
                title="Delete"
                onClick={() => handleDelete(subject.id)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}