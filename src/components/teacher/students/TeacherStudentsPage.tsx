"use client";

import { useMemo, useState } from "react";

import { getSession } from "@/lib/auth";

import { subjects } from "@/data/subjects";
import { students } from "@/data/students";

import TeacherStudentTable from "./TeacherStudentTable";
import TeacherStudentCard from "./TeacherStudentCard";

export default function TeacherStudentsPage() {
  const [search, setSearch] = useState("");

  const session = getSession();

  const currentTeacherId =
    subjects.find(
      (subject) => subject.teacher === session?.name
    )?.teacherId ?? "T001";

  const teacherStudents = useMemo(() => {
    const teacherSubjects = subjects.filter(
      (subject) => subject.teacherId === currentTeacherId
    );

    const teacherClassKeys = new Set(
      teacherSubjects.map(
        (subject) => `${subject.className}-${subject.section}`
      )
    );

    return students.filter((student) =>
      teacherClassKeys.has(
        `${student.className}-${student.section}`
      )
    );
  }, [currentTeacherId]);

  const filteredStudents = teacherStudents.filter((student) => {
    const value = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(value) ||
      student.email.toLowerCase().includes(value) ||
      student.className.toLowerCase().includes(value) ||
      student.section.toLowerCase().includes(value) ||
      student.rollNo.toLowerCase().includes(value) ||
      student.parentName.toLowerCase().includes(value) ||
      student.phone.toLowerCase().includes(value)
    );
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Students
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View students from your assigned classes.
        </p>
      </div>

      <TeacherStudentTable
        students={filteredStudents}
        search={search}
        setSearch={setSearch}
      />

      <TeacherStudentCard
        students={filteredStudents}
      />
    </div>
  );
}