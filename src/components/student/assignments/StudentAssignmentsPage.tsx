"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Clock3,
} from "lucide-react";

import { fetchStudentAssignments } from "@/lib/student-api";
import type { ApiStudentAssignment } from "@/lib/student-api";

import StudentStatCards from "../StudentStatCards";
import StudentAssignmentTable from "./StudentAssignmentTable";

export default function StudentAssignmentsPage() {
  const [search, setSearch] = useState("");

  const [state, setState] = useState<{
    loaded: boolean;
    assignments: ApiStudentAssignment[];
    error: string;
  }>({
    loaded: false,
    assignments: [],
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchStudentAssignments()
      .then((assignments) => {
        if (!active) return;
        setState({ loaded: true, assignments, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          assignments: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load your assignments.",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredAssignments = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return state.assignments;

    return state.assignments.filter(
      (assignment) =>
        assignment.title.toLowerCase().includes(value) ||
        assignment.subject.toLowerCase().includes(value) ||
        assignment.dueDate.toLowerCase().includes(value) ||
        assignment.status.toLowerCase().includes(value)
    );
  }, [search, state.assignments]);

  const pending = state.assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;

  const submitted = state.assignments.filter(
    (assignment) => assignment.status === "Submitted"
  ).length;

  const overdue = state.assignments.filter(
    (assignment) => assignment.status === "Overdue"
  ).length;

  const stats = [
    {
      title: "Total Assignments",
      value: state.assignments.length,
      icon: ClipboardList,
    },
    { title: "Pending", value: pending, icon: Clock3 },
    { title: "Submitted", value: submitted, icon: CheckCircle2 },
    { title: "Overdue", value: overdue, icon: AlertCircle },
  ];

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Assignments
      </h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        The assignments set for your class and their submission status.
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
            Loading your assignments...
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

      <StudentStatCards stats={stats} />

      <StudentAssignmentTable
        assignments={filteredAssignments}
        search={search}
        setSearch={setSearch}
        total={state.assignments.length}
      />
    </div>
  );
}
