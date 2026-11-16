"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  School,
  Users,
} from "lucide-react";

import { fetchStudentSubjects } from "@/lib/student-api";
import type { ApiStudentSubject } from "@/lib/student-api";
import { useStudentProfile } from "@/lib/useStudentProfile";

import StudentStatCards from "../StudentStatCards";
import StudentSubjectTable from "./StudentSubjectTable";

export default function StudentSubjectsPage() {
  const { profile } = useStudentProfile();

  const [search, setSearch] = useState("");

  const [state, setState] = useState<{
    loaded: boolean;
    subjects: ApiStudentSubject[];
    error: string;
  }>({
    loaded: false,
    subjects: [],
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchStudentSubjects()
      .then((subjects) => {
        if (!active) return;
        setState({ loaded: true, subjects, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          subjects: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load your subjects.",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredSubjects = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return state.subjects;

    return state.subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(value) ||
        subject.code.toLowerCase().includes(value) ||
        subject.teacher.toLowerCase().includes(value) ||
        subject.className.toLowerCase().includes(value) ||
        subject.section.toLowerCase().includes(value)
    );
  }, [search, state.subjects]);

  const teacherCount = new Set(state.subjects.map((s) => s.teacherId)).size;

  const stats = [
    {
      title: "Total Subjects",
      value: state.subjects.length,
      icon: BookOpen,
    },
    {
      title: "Active Subjects",
      value: state.subjects.filter((s) => s.status === "ACTIVE").length,
      icon: GraduationCap,
    },
    {
      title: "Teachers",
      value: teacherCount,
      icon: Users,
    },
    {
      title: "My Class",
      value: profile ? `${profile.className} - ${profile.section}` : "-",
      icon: School,
    },
  ];

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Subjects</h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        The subjects you are enrolled in this term.
      </p>
    </div>
  );

  if (!state.loaded && !state.error) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">Loading your subjects...</p>
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

      <StudentStatCards stats={stats} />

      <StudentSubjectTable
        subjects={filteredSubjects}
        search={search}
        setSearch={setSearch}
        total={state.subjects.length}
      />
    </div>
  );
}
