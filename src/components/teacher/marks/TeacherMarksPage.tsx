"use client";

import { useMemo, useState } from "react";

import { getSession } from "@/lib/auth";

import { exams } from "@/data/exams";
import { students } from "@/data/students";
import { teachers } from "@/data/teachers";

import TeacherMarksTable from "./TeacherMarksTable";

export default function TeacherMarksPage() {
  const session = getSession();

  const [selectedExam, setSelectedExam] = useState("All");

  const currentTeacher =
    teachers.find(
      (teacher) =>
        teacher.email === session?.email ||
        teacher.name === session?.name
    ) ?? teachers[0];

  const teacherExams = useMemo(() => {
    return exams.filter(
      (exam) => exam.teacherId === currentTeacher.id
    );
  }, [currentTeacher.id]);

  const selectedExamData =
    selectedExam === "All"
      ? null
      : teacherExams.find(
          (exam) => exam.id === selectedExam
        );

  const normalizeClass = (value: string) => {
    return value.replace(/^Grade\s*/i, "").trim();
  };

  const marksStudents = useMemo(() => {
    if (!selectedExamData) {
      return [];
    }

    const examClass = normalizeClass(
      selectedExamData.className
    );

    return students.filter((student) => {
      const studentClass = normalizeClass(student.className);

      return (
        studentClass === examClass &&
        student.section === selectedExamData.section
      );
    });
  }, [selectedExamData]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Marks
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Enter and manage marks for students in your assigned exams.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Select Exam
        </label>

        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="w-full max-w-md rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f]"
        >
          <option value="All">Select an exam</option>

          {teacherExams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.name} — {exam.subject} — {exam.className}-
              {exam.section}
            </option>
          ))}
        </select>
      </div>

      {selectedExamData ? (
        <TeacherMarksTable
          students={marksStudents}
          exam={selectedExamData}
        />
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Select an exam to view students and enter marks.
          </p>
        </div>
      )}
    </div>
  );
}