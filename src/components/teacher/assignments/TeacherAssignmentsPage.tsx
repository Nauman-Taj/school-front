"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { fetchTeacherAssignments } from "@/lib/teacher-api";
import type { TeacherAssignment } from "@/lib/teacher-api";
import {
  teacherAssignmentStatus,
  teacherToday,
} from "@/lib/teacher-api";

import TeacherAssignmentStats from "./TeacherAssignmentStats";
import TeacherAssignmentTable from "./TeacherAssignmentTable";

export default function TeacherAssignmentsPage() {
  const [search, setSearch] = useState("");

  const [state, setState] = useState<{
    loaded: boolean;
    assignments: TeacherAssignment[];
    error: string;
  }>({
    loaded: false,
    assignments: [],
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchTeacherAssignments()
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
        assignment.className.toLowerCase().includes(value) ||
        assignment.section.toLowerCase().includes(value) ||
        assignment.dueDate.toLowerCase().includes(value) ||
        assignment.status.toLowerCase().includes(value)
    );
  }, [search, state.assignments]);

  const today = teacherToday();

  // Seven days from today, counted from UTC midnight so the window does not
  // drift with the local timezone.
  const weekAhead = new Date(
    Date.parse(`${today}T00:00:00.000Z`) + 7 * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .slice(0, 10);

  const dueSoon = state.assignments.filter(
    (assignment) =>
      assignment.status === "Pending" &&
      assignment.dueDate >= today &&
      assignment.dueDate <= weekAhead
  ).length;

  const overdue = state.assignments.filter(
    (assignment) => teacherAssignmentStatus(assignment, today) === "Overdue"
  ).length;

  const submitted = state.assignments.filter(
    (assignment) => assignment.status === "Submitted"
  ).length;

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Assignments
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Create and manage assignments for your students.
        </p>
      </div>

      <Link
        href="/teacher/assignments/add"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
      >
        <Plus size={17} />
        Add Assignment
      </Link>
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

      <TeacherAssignmentStats
        totalAssignments={state.assignments.length}
        dueSoon={dueSoon}
        overdue={overdue}
        submitted={submitted}
      />

      <TeacherAssignmentTable
        assignments={filteredAssignments}
        search={search}
        setSearch={setSearch}
        total={state.assignments.length}
      />
    </div>
  );
}
