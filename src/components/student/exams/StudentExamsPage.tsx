"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  FileText,
  GraduationCap,
  Trophy,
} from "lucide-react";

import { fetchStudentExams } from "@/lib/student-api";
import type { ApiStudentExam } from "@/lib/student-api";

import StudentStatCards from "../StudentStatCards";
import StudentExamTable from "./StudentExamTable";

export default function StudentExamsPage() {
  const [search, setSearch] = useState("");

  const [state, setState] = useState<{
    loaded: boolean;
    exams: ApiStudentExam[];
    error: string;
  }>({
    loaded: false,
    exams: [],
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchStudentExams()
      .then((exams) => {
        if (!active) return;
        setState({ loaded: true, exams, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          exams: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load your exams.",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredExams = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return state.exams;

    return state.exams.filter(
      (exam) =>
        exam.name.toLowerCase().includes(value) ||
        exam.subject.toLowerCase().includes(value) ||
        exam.examDate.toLowerCase().includes(value) ||
        exam.status.toLowerCase().includes(value)
    );
  }, [search, state.exams]);

  const completed = state.exams.filter(
    (exam) => exam.status === "Completed"
  ).length;

  const upcoming = state.exams.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  const totalMarks = state.exams.reduce(
    (total, exam) => total + exam.totalMarks,
    0
  );

  const stats = [
    { title: "Total Exams", value: state.exams.length, icon: GraduationCap },
    { title: "Completed", value: completed, icon: Trophy },
    { title: "Upcoming", value: upcoming, icon: CalendarCheck },
    { title: "Total Marks", value: totalMarks, icon: FileText },
  ];

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Exams</h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        The exam schedule for your class.
      </p>
    </div>
  );

  if (!state.loaded && !state.error) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">Loading your exams...</p>
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

      <StudentExamTable
        exams={filteredExams}
        search={search}
        setSearch={setSearch}
        total={state.exams.length}
      />
    </div>
  );
}
