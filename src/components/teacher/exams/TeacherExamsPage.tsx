"use client";

import { useMemo, useState } from "react";

import { getSession } from "@/lib/auth";

import { exams } from "@/data/exams";
import { teachers } from "@/data/teachers";

import TeacherExamTable from "./TeacherExamTable";

export default function TeacherExamsPage() {
  const [search, setSearch] = useState("");

  const session = getSession();

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

  const filteredExams = teacherExams.filter((exam) => {
    const value = search.toLowerCase();

    return (
      exam.name.toLowerCase().includes(value) ||
      exam.subject.toLowerCase().includes(value) ||
      exam.className.toLowerCase().includes(value) ||
      exam.section.toLowerCase().includes(value) ||
      exam.examDate.toLowerCase().includes(value) ||
      exam.status.toLowerCase().includes(value)
    );
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Exams
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View exams assigned to your classes and subjects.
        </p>
      </div>

      <TeacherExamTable
        exams={filteredExams}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}