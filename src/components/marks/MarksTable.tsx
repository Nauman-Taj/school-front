"use client";

import { useState } from "react";
import {
  Search,
  Save,
  Pencil,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { results } from "@/data/results";
import { Result } from "@/types/result";

export default function MarksTable() {
  const [markList, setMarkList] = useState<Result[]>(results);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredMarks = markList.filter((item) =>
    `${item.studentName} ${item.rollNo} ${item.className} ${item.subject} ${item.exam}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleMarksChange = (
    id: string,
    value: string
  ) => {
    const obtainedMarks = Number(value);

    setMarkList((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const percentage =
          item.totalMarks > 0
            ? Number(
              (
                (obtainedMarks / item.totalMarks) *
                100
              ).toFixed(1)
            )
            : 0;

        let grade = "F";

        if (percentage >= 90) {
          grade = "A+";
        } else if (percentage >= 80) {
          grade = "A";
        } else if (percentage >= 70) {
          grade = "B+";
        } else if (percentage >= 60) {
          grade = "B";
        } else if (percentage >= 50) {
          grade = "C";
        } else if (percentage >= 40) {
          grade = "D";
        }

        return {
          ...item,
          obtainedMarks,
          percentage,
          grade,
          status: percentage >= 40 ? "Pass" : "Fail",
        };
      })
    );
  };

  const handleSave = (id: string) => {
    setEditingId(null);
    alert("Marks updated successfully!");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Student Marks
          </h2>

          {/* <p className="mt-1 text-sm text-gray-500">
            Enter and update marks for students
          </p> */}
        </div>

        <div className="relative w-full sm:w-80">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search student, class or subject"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Student
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Class
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Subject
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Exam
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                Marks
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                %
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                Grade
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                Status
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredMarks.map((item) => {
              const isEditing = editingId === item.id;

              return (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800">
                      {item.studentName}
                    </p>

                    <p className="text-xs text-gray-400">
                      Roll No: {item.rollNo}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.className}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.subject}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.exam}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {isEditing ? (
                      <div className="flex items-center justify-center gap-1">
                        <input
                          type="number"
                          min="0"
                          max={item.totalMarks}
                          value={item.obtainedMarks}
                          onChange={(e) =>
                            handleMarksChange(
                              item.id,
                              e.target.value
                            )
                          }
                          className="w-16 rounded-lg border border-gray-200 px-2 py-1.5 text-center text-sm outline-none focus:border-[#01796F]"
                        />

                        <span className="text-xs text-gray-400">
                          / {item.totalMarks}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-gray-700">
                        {item.obtainedMarks} / {item.totalMarks}
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-center text-sm font-medium text-gray-700">
                    {item.percentage}%
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-semibold text-[#01796F]">
                      {item.grade}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center">
                    {item.status === "Pass" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                        <CheckCircle2 size={15} />
                        Pass
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-500">
                        <XCircle size={15} />
                        Fail
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center">
                      {isEditing ? (
                        <button
                          type="button"
                          onClick={() => handleSave(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#01796F] transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                          title="Save"
                        >
                          <Save size={17} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setEditingId(item.id)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                          title="Edit Marks"
                        >
                          <Pencil size={17} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 p-4 md:hidden">
        {filteredMarks.map((item) => {
          const isEditing = editingId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.studentName}
                  </h3>

                  <p className="text-xs text-gray-500">
                    Roll No: {item.rollNo}
                  </p>
                </div>

                {item.status === "Pass" ? (
                  <span className="text-xs font-medium text-green-600">
                    Pass
                  </span>
                ) : (
                  <span className="text-xs font-medium text-red-500">
                    Fail
                  </span>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400">
                    Class
                  </p>
                  <p className="font-medium text-gray-700">
                    {item.className}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Subject
                  </p>
                  <p className="font-medium text-gray-700">
                    {item.subject}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Exam
                  </p>
                  <p className="font-medium text-gray-700">
                    {item.exam}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Grade
                  </p>
                  <p className="font-medium text-gray-700">
                    {item.grade}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <div>
                  <p className="text-xs text-gray-400">
                    Marks
                  </p>

                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      max={item.totalMarks}
                      value={item.obtainedMarks}
                      onChange={(e) =>
                        handleMarksChange(
                          item.id,
                          e.target.value
                        )
                      }
                      className="mt-1 w-20 rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-[#01796F]"
                    />
                  ) : (
                    <p className="font-semibold text-gray-700">
                      {item.obtainedMarks} / {item.totalMarks}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Percentage
                  </p>

                  <p className="font-semibold text-gray-700">
                    {item.percentage}%
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    isEditing
                      ? handleSave(item.id)
                      : setEditingId(item.id)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#01796F] transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                >
                  {isEditing ? (
                    <Save size={17} />
                  ) : (
                    <Pencil size={17} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMarks.length === 0 && (
        <div className="p-10 text-center text-sm text-gray-500">
          No marks found.
        </div>
      )}
    </div>
  );
}