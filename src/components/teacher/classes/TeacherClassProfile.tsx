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
} from "lucide-react";

import { fetchTeacherClass, mapTeacherSchedule } from "@/lib/teacher-api";
import type { ApiTeacherClassDetail } from "@/lib/teacher-api";

export default function TeacherClassProfile() {
  const params = useParams();
  const classId = Number(params.id);

  const [state, setState] = useState<{
    loaded: boolean;
    detail: ApiTeacherClassDetail | null;
    error: string;
  }>({
    loaded: false,
    detail: null,
    error: "",
  });

  const invalidClassId = !Number.isFinite(classId);

  useEffect(() => {
    if (invalidClassId) return;

    let active = true;

    fetchTeacherClass(classId)
      .then((detail) => {
        if (!active) return;
        setState({ loaded: true, detail, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          detail: null,
          error:
            err instanceof Error
              ? err.message
              : "This class is not assigned to you.",
        });
      });

    return () => {
      active = false;
    };
  }, [classId, invalidClassId]);

  const backLink = (
    <Link
      href="/teacher/classes"
      className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
    >
      <ArrowLeft size={17} strokeWidth={2} />

      Back to My Classes
    </Link>
  );

  if (invalidClassId) {
    return (
      <main className="space-y-5">
        {backLink}

        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900">
            Class not found
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            This class is not assigned to you.
          </p>
        </div>
      </main>
    );
  }

  if (!state.loaded) {
    return (
      <main className="space-y-5">
        {backLink}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading the class...
          </p>
        </div>
      </main>
    );
  }

  const detail = state.detail;

  if (!detail) {
    return (
      <main className="space-y-5">
        {backLink}

        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900">
            Class not found
          </h1>

          <p className="mt-1 text-sm text-gray-500">{state.error}</p>
        </div>
      </main>
    );
  }

  const classKey = `${detail.className}-${detail.section}`;
  const subjectsText =
    detail.subjects.length > 0 ? detail.subjects.join(", ") : "No subjects";
  const scheduleText = detail.schedule
    ? mapTeacherSchedule(detail.schedule)
    : "No schedule";

  return (
    <main className="space-y-5">
      {/* Header */}
      <div>
        <Link
          href="/teacher/classes"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
        >
          <ArrowLeft size={17} strokeWidth={2} />

          Back to My Classes
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {classKey}
            </h1>

            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              {subjectsText} · Room {detail.room}
            </p>
          </div>

          {detail.isClassTeacher && (
            <span className="w-fit rounded-full bg-[#e6f4f2] px-4 py-2 text-sm font-medium text-[#01796F]">
              Class Teacher
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <Users size={20} strokeWidth={2} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Students</p>

              <p className="text-xl font-bold text-gray-800">
                {detail.students.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <BookOpen size={20} strokeWidth={2} />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-500">Subject</p>

              <p className="truncate text-xl font-bold text-gray-800">
                {subjectsText}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <CalendarDays size={20} strokeWidth={2} />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-500">Schedule</p>

              <p className="text-sm font-bold text-gray-800">
                {scheduleText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Students */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Students
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Students enrolled in {classKey}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-[#e6f4f2] px-3 py-1 text-sm font-medium text-[#01796F]">
            {detail.students.length} Students
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {detail.students.length > 0 ? (
            detail.students.map((student) => (
              <div
                key={student.id}
                className="flex items-center gap-3 rounded-xl bg-[#f6f8f8] p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F]">
                  <UserRound size={18} strokeWidth={2} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900">
                    {student.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Roll No: {student.rollNo}
                  </p>
                </div>

                <Link
                  href={`/teacher/students/${student.id}`}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#01796F] hover:bg-[#e6f4f2] hover:text-[#01796F]"
                >
                  View
                </Link>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
              No students enrolled in this class.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
