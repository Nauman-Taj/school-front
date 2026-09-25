"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { getSession } from "@/lib/auth";

import { assignments } from "@/data/assignments";
import { teachers } from "@/data/teachers";

import TeacherAssignmentTable from "./TeacherAssignmentTable";

export default function TeacherAssignmentsPage() {
  const session = getSession();

  const [search, setSearch] = useState("");

  const currentTeacher =
    teachers.find(
      (teacher) =>
        teacher.email === session?.email ||
        teacher.name === session?.name
    ) ?? teachers[0];

  const teacherAssignments = useMemo(() => {
    return assignments.filter(
      (assignment) =>
        assignment.teacherId === currentTeacher.id
    );
  }, [currentTeacher.id]);

  const filteredAssignments = teacherAssignments.filter(
    (assignment) => {
      const value = search.toLowerCase();

      return (
        assignment.title.toLowerCase().includes(value) ||
        assignment.subject.toLowerCase().includes(value) ||
        assignment.className.toLowerCase().includes(value) ||
        assignment.section.toLowerCase().includes(value) ||
        assignment.dueDate.toLowerCase().includes(value) ||
        assignment.status.toLowerCase().includes(value)
      );
    }
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          <Plus size={18} />
          Add Assignment
        </Link>
      </div>

      {/* Assignment Table */}
      <TeacherAssignmentTable
        assignments={filteredAssignments}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}