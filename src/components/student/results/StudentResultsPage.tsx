"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Trophy,
} from "lucide-react";

import { fetchStudentResults } from "@/lib/student-api";
import type { ApiStudentResult } from "@/lib/student-api";

import StudentStatCards from "../StudentStatCards";
import StudentResultsTable from "./StudentResultsTable";

export default function StudentResultsPage() {
  const [search, setSearch] = useState("");

  const [state, setState] = useState<{
    loaded: boolean;
    results: ApiStudentResult[];
    error: string;
  }>({
    loaded: false,
    results: [],
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchStudentResults()
      .then((results) => {
        if (!active) return;
        setState({ loaded: true, results, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          results: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load your results.",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredResults = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return state.results;

    return state.results.filter(
      (result) =>
        result.exam.toLowerCase().includes(value) ||
        result.subject.toLowerCase().includes(value) ||
        result.teacher.toLowerCase().includes(value) ||
        result.grade.toLowerCase().includes(value) ||
        result.status.toLowerCase().includes(value)
    );
  }, [search, state.results]);

  const obtainedMarks = state.results.reduce(
    (total, result) => total + result.obtainedMarks,
    0
  );

  const totalMarks = state.results.reduce(
    (total, result) => total + result.totalMarks,
    0
  );

  const percentage =
    totalMarks > 0 ? Math.round((obtainedMarks / totalMarks) * 100) : 0;

  const passed = state.results.filter(
    (result) => result.status === "Pass"
  ).length;

  const stats = [
    {
      title: "Total Subjects",
      value: state.results.length,
      icon: BookOpen,
    },
    { title: "Obtained Marks", value: obtainedMarks, icon: Award },
    { title: "Percentage", value: `${percentage}%`, icon: Trophy },
    { title: "Passed", value: passed, icon: CheckCircle2 },
  ];

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Results</h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        Your examination results and academic performance.
      </p>
    </div>
  );

  if (!state.loaded && !state.error) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">Loading your results...</p>
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

      <StudentResultsTable
        results={filteredResults}
        search={search}
        setSearch={setSearch}
        total={state.results.length}
      />
    </div>
  );
}
