"use client";

import { useState } from "react";
import { Save } from "lucide-react";

import { Student } from "@/types/student";
import { Exam } from "@/types/exam";

type TeacherMarksTableProps = {
  students: Student[];
  exam: Exam | null;
};

export default function TeacherMarksTable({
  students,
  exam,
}: TeacherMarksTableProps) {
  const [marks, setMarks] = useState<Record<number, string>>({});

  const handleMarksChange = (
    studentId: number,
    value: string
  ) => {
    setMarks((previous) => ({
      ...previous,
      [studentId]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving marks:", {
      exam,
      marks,
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {exam && (
        <div className="border-b border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900">
            {exam.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {exam.subject} · {exam.className} - {exam.section} ·
            Total Marks: {exam.totalMarks}
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Student
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Roll No
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                Marks
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
                    <p className="font-medium text-gray-900">
                      {student.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {student.className} - {student.section}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {student.rollNo}
                  </td>

                  <td className="px-5 py-4">
                    <input
                      type="number"
                      min="0"
                      max={exam?.totalMarks}
                      value={marks[student.id] ?? ""}
                      onChange={(e) =>
                        handleMarksChange(
                          student.id,
                          e.target.value
                        )
                      }
                      placeholder="Enter marks"
                      className="w-32 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#01796f]"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-5 py-8 text-center text-sm text-gray-500"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {students.length > 0 && (
        <div className="border-t border-gray-200 p-5">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
          >
            <Save size={17} />
            Save Marks
          </button>
        </div>
      )}
    </div>
  );
}