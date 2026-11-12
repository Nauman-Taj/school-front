"use client";

import {
  Award,
  CheckCircle2,
  ClipboardList,
  FileText,
} from "lucide-react";

import type {
  ApiTeacherExamDetail,
  TeacherExam,
} from "@/lib/teacher-api";

type Props = {
  exam: TeacherExam | null;
  detail: ApiTeacherExamDetail | null;
  marks: Record<number, string>;
  setMarks: (value: Record<number, string>) => void;
  onSave: () => void;
  saving: boolean;
};

export default function TeacherMarksTable({
  exam,
  detail,
  marks,
  setMarks,
  onSave,
  saving,
}: Props) {
  const students = detail?.students ?? [];

  const entered = students.filter(
    (student) => (marks[student.studentId] ?? "").trim() !== ""
  ).length;

  const average = entered
    ? Math.round(
        students.reduce((total, student) => {
          const value = Number(marks[student.studentId]);

          return total + (Number.isFinite(value) ? value : 0);
        }, 0) / entered
      )
    : 0;

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Students</p>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <ClipboardList size={20} />
            </div>
          </div>

          <p className="mt-2 text-2xl font-bold text-gray-800">
            {students.length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Marked</p>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <CheckCircle2 size={20} />
            </div>
          </div>

          <p className="mt-2 text-2xl font-bold text-gray-800">{entered}</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Average</p>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <Award size={20} />
            </div>
          </div>

          <p className="mt-2 text-2xl font-bold text-gray-800">{average}</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Marks</p>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <FileText size={20} />
            </div>
          </div>

          <p className="mt-2 text-2xl font-bold text-gray-800">
            {exam?.totalMarks ?? "-"}
          </p>
        </div>
      </div>

      {/* Marks sheet */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Student</th>
                <th className="px-5 py-4 font-semibold">Class</th>
                <th className="px-5 py-4 font-semibold">Roll No</th>
                <th className="px-5 py-4 font-semibold">Marks</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {students.length > 0 ? (
                students.map((student) => (
                  <tr
                    key={student.studentId}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {student.name}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.className} - {student.section}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.rollNo}
                    </td>

                    <td className="px-5 py-4">
                      <input
                        type="number"
                        min={0}
                        max={exam?.totalMarks ?? undefined}
                        value={marks[student.studentId] ?? ""}
                        onChange={(event) =>
                          setMarks({
                            ...marks,
                            [student.studentId]: event.target.value,
                          })
                        }
                        placeholder="—"
                        aria-label={`Marks for ${student.name}`}
                        className="w-28 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-8 text-center text-sm text-gray-500"
                  >
                    No students found for this exam.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end border-t border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={onSave}
            disabled={saving || students.length === 0}
            className="rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Marks"}
          </button>
        </div>
      </div>
    </div>
  );
}
