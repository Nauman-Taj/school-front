"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Users,
  BookOpen,
  CalendarDays,
  UserRound,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react";

import { fetchTeacherStudent } from "@/lib/teacher-api";
import type { TeacherStudent } from "@/lib/teacher-api";

export default function TeacherStudentProfile() {
  const params = useParams();
  const studentId = Number(params.id);

  const invalidStudentId = !Number.isFinite(studentId);

  const [state, setState] = useState<{
    loaded: boolean;
    student: TeacherStudent | null;
    error: string;
  }>({
    loaded: false,
    student: null,
    error: "",
  });

  useEffect(() => {
    if (invalidStudentId) return;

    let active = true;

    fetchTeacherStudent(studentId)
      .then((student) => {
        if (!active) return;
        setState({ loaded: true, student, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          student: null,
          error:
            err instanceof Error
              ? err.message
              : "This student is not assigned to your classes.",
        });
      });

    return () => {
      active = false;
    };
  }, [studentId, invalidStudentId]);

  const backLink = (
    <Link
      href="/teacher/students"
      className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
    >
      <ArrowLeft size={17} />

      Back to Students
    </Link>
  );

  if (invalidStudentId) {
    return (
      <div className="space-y-5">
        {backLink}

        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900">
            Student not found
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            This student is not assigned to your classes.
          </p>
        </div>
      </div>
    );
  }

  if (!state.loaded) {
    return (
      <div className="space-y-5">
        {backLink}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#0176F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading the student...
          </p>
        </div>
      </div>
    );
  }

  const student = state.student;

  if (!student) {
    return (
      <div className="space-y-5">
        {backLink}

        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900">
            Student not found
          </h1>

          <p className="mt-1 text-sm text-gray-500">{state.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <Link
          href="/teacher/students"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
        >
          <ArrowLeft size={17} />

          Back to Students
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F]">
              <UserRound size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {student.name}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {student.className} - {student.section} · Roll No.{" "}
                {student.rollNo}
              </p>
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-medium ${
              student.status === "Active"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {student.status}
          </span>
        </div>
      </div>

      {/* Basic Information */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Student Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Basic information about this student.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-[#f6f8f8] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <Mail size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-gray-500">Email</p>
              <p className="truncate text-sm font-medium text-gray-900">
                {student.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#f6f8f8] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <Phone size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-900">
                {student.phone || "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#f6f8f8] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <GraduationCap size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">Class</p>
              <p className="text-sm font-medium text-gray-900">
                {student.className} - {student.section}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#f6f8f8] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <Users size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">Parent</p>
              <p className="text-sm font-medium text-gray-900">
                {student.parentName || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Academic Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Academic details available to you as the student&apos;s teacher.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Class</p>
            <p className="mt-1 font-semibold text-gray-900">
              {student.className} - {student.section}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Roll Number</p>
            <p className="mt-1 font-semibold text-gray-900">
              {student.rollNo}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Status</p>
            <p className="mt-1 font-semibold text-gray-900">
              {student.status}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage records related to this student.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/teacher/attendance", label: "Attendance", icon: CalendarDays },
            { href: "/teacher/assignments", label: "Assignments", icon: BookOpen },
            { href: "/teacher/exams", label: "Exams", icon: GraduationCap },
            { href: "/teacher/marks", label: "Marks", icon: BookOpen },
          ].map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-2 rounded-xl border border-gray-100 p-4 text-sm font-medium text-gray-700 transition hover:border-[#01796F] hover:bg-[#e6f4f2] hover:text-[#01796F]"
              >
                <Icon size={16} className="text-[#01796F]" />

                {action.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
