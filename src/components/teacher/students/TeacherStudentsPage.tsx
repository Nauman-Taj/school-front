"use client";

import { useEffect, useMemo, useState } from "react";

import { fetchTeacherStudents } from "@/lib/teacher-api";
import type { TeacherStudent } from "@/lib/teacher-api";

import TeacherStudentCard from "./TeacherStudentCard";
import TeacherStudentTable from "./TeacherStudentTable";

export default function TeacherStudentsPage() {
  const [search, setSearch] = useState("");

  const [state, setState] = useState<{
    loaded: boolean;
    students: TeacherStudent[];
    error: string;
  }>({
    loaded: false,
    students: [],
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchTeacherStudents()
      .then((students) => {
        if (!active) return;
        setState({ loaded: true, students, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          students: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load your students.",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredStudents = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return state.students;

    return state.students.filter(
      (student) =>
        student.name.toLowerCase().includes(value) ||
        student.email.toLowerCase().includes(value) ||
        student.className.toLowerCase().includes(value) ||
        student.section.toLowerCase().includes(value) ||
        student.rollNo.toLowerCase().includes(value) ||
        student.parentName.toLowerCase().includes(value) ||
        student.phone.toLowerCase().includes(value)
    );
  }, [search, state.students]);

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Students
      </h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        View students from your assigned classes.
      </p>
    </div>
  );

  if (!state.loaded && !state.error) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading your students...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {header}

      {state.error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {state.error}
        </div>
      )}

      <TeacherStudentTable
        students={filteredStudents}
        search={search}
        setSearch={setSearch}
        total={state.students.length}
      />

      <TeacherStudentCard students={filteredStudents} />
    </div>
  );
}
