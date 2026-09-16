"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { results } from "@/data/results";
import { Result } from "@/types/result";

export default function ResultTable() {
  const [resultList, setResultList] = useState<Result[]>(results);
  const [search, setSearch] = useState("");

  const filteredResults = resultList.filter((result) =>
    [
      result.studentName,
      result.rollNo,
      result.className,
      result.exam,
      result.subject,
      result.teacher,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (!confirmed) return;

    setResultList((current) =>
      current.filter((result) => result.id !== id)
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
            placeholder="Search results"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-5 py-4 font-semibold text-gray-600">
                  Student
                </th>

                <th className="px-5 py-4 font-semibold text-gray-600">
                  Class
                </th>

                <th className="px-5 py-4 font-semibold text-gray-600">
                  Exam
                </th>

                <th className="px-5 py-4 font-semibold text-gray-600">
                  Marks
                </th>

                <th className="px-5 py-4 font-semibold text-gray-600">
                  Percentage
                </th>

                <th className="px-5 py-4 font-semibold text-gray-600">
                  Grade
                </th>

                <th className="px-5 py-4 text-center font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-5 py-4 text-center font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredResults.map((result) => (
                <tr
                  key={result.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {result.studentName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {result.rollNo}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {result.className}
                  </td>

                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-gray-700">
                        {result.exam}
                      </p>
                      <p className="text-xs text-gray-400">
                        {result.subject}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-medium text-gray-700">
                    {result.obtainedMarks}/{result.totalMarks}
                  </td>

                  <td className="px-5 py-4 font-medium text-gray-700">
                    {result.percentage}%
                  </td>

                  <td className="px-5 py-4 font-semibold text-gray-700">
                    {result.grade}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${result.status === "Pass"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                        }`}
                    >
                      {result.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/dashboard/results/${result.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                        title="View"
                      >
                        <Eye size={17} />
                      </Link>

                      <Link
                        href={`/dashboard/results/${result.id}/edit`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(result.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete"
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
      <div className="space-y-3 md:hidden">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="rounded-2xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {result.studentName}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  {result.rollNo} • {result.className}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${result.status === "Pass"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
                  }`}
              >
                {result.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-400">Exam</p>
                <p className="mt-1 font-medium text-gray-700">
                  {result.exam}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Subject</p>
                <p className="mt-1 font-medium text-gray-700">
                  {result.subject}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Marks</p>
                <p className="mt-1 font-medium text-gray-700">
                  {result.obtainedMarks}/{result.totalMarks}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Result</p>
                <p className="mt-1 font-semibold text-gray-700">
                  {result.percentage}% • {result.grade}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 border-t border-gray-100 pt-3">
              <Link
                href={`/dashboard/results/${result.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                title="View"
              >
                <Eye size={17} />
              </Link>

              <Link
                href={`/dashboard/results/${result.id}/edit`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                title="Edit"
              >
                <Pencil size={17} />
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(result.id)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                title="Delete"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredResults.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white py-12 text-center">
          <p className="text-sm text-gray-500">
            No results found.
          </p>
        </div>
      )}
    </div>
  );
}