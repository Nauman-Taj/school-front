"use client";

import { useEffect, useMemo, useState } from "react";

import { fetchTeacherClasses } from "@/lib/teacher-api";
import type { TeacherClassView } from "@/types/class";

import TeacherClassCard from "./TeacherClassCard";
import TeacherClassStats from "./TeacherClassStats";
import TeacherClassTable from "./TeacherClassTable";

export default function TeacherClassesPage() {
  const [search, setSearch] = useState("");

  const [state, setState] = useState<{
    loaded: boolean;
    classes: TeacherClassView[];
    error: string;
  }>({
    loaded: false,
    classes: [],
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchTeacherClasses()
      .then((classes) => {
        if (!active) return;
        setState({ loaded: true, classes, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          classes: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load your classes.",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredClasses = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return state.classes;

    return state.classes.filter(
      (item) =>
        item.className.toLowerCase().includes(value) ||
        item.section.toLowerCase().includes(value) ||
        item.subject.toLowerCase().includes(value) ||
        item.room.toLowerCase().includes(value)
    );
  }, [search, state.classes]);

  const totalStudents = state.classes.reduce(
    (total, item) => total + item.students,
    0
  );

  const totalSubjects = new Set(
    state.classes
      .flatMap((item) => item.subject.split(", "))
      .filter(Boolean)
  ).size;

  const classTeacherCount = state.classes.filter(
    (item) => item.classTeacher
  ).length;

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        My Classes
      </h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        View the classes assigned to you and manage your students.
      </p>
    </div>
  );

  if (!state.loaded && !state.error) {
    return (
      <main className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading your classes...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-5">
      {/* Page Header */}
      {header}

      {state.error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {state.error}
        </div>
      )}

      <TeacherClassStats
        totalClasses={state.classes.length}
        totalStudents={totalStudents}
        totalSubjects={totalSubjects}
        classTeacherCount={classTeacherCount}
      />

      {/* Classes */}
      <TeacherClassTable
        classes={filteredClasses}
        search={search}
        setSearch={setSearch}
        total={state.classes.length}
      />

      <TeacherClassCard classes={filteredClasses} />
    </main>
  );
}
