"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Users,
  BookOpen,
  CalendarDays,
  UserRound,
} from "lucide-react";

import { getSession } from "@/lib/auth";

import { teachers } from "@/data/teachers";
import { classes } from "@/data/classes";
import { subjects } from "@/data/subjects";
import { students } from "@/data/students";
import { timetable } from "@/data/timetable";

export default function TeacherClassProfile() {
  const params = useParams();
  const session = getSession();

  const classId = Number(params.id);

  const currentTeacher =
    teachers.find(
      (teacher) =>
        teacher.email === session?.email ||
        teacher.name === session?.name
    ) ?? teachers[0];

  const currentTeacherId = currentTeacher.id;

  const schoolClass = classes.find(
    (item) => item.id === classId
  );

  const classSubjects = schoolClass
    ? subjects.filter(
        (subject) =>
          subject.teacherId === currentTeacherId &&
          subject.className === schoolClass.name &&
          subject.section === schoolClass.section
      )
    : [];

  const classTimetable = schoolClass
    ? timetable.find(
        (item) =>
          item.teacherId === currentTeacherId &&
          item.className === schoolClass.name &&
          item.section === schoolClass.section
      )
    : undefined;

  const classStudents = schoolClass
    ? students.filter(
        (student) =>
          student.className === schoolClass.name &&
          student.section === schoolClass.section
      )
    : [];

  const classKey = schoolClass
    ? `${schoolClass.name}-${schoolClass.section}`
    : "";

  const subjectsText =
    classSubjects.length > 0
      ? classSubjects
          .map((subject) => subject.name)
          .join(", ")
      : "No subjects";

  const scheduleText = classTimetable
    ? `${classTimetable.day} · ${classTimetable.startTime} - ${classTimetable.endTime}`
    : "No schedule";

  if (!schoolClass || classSubjects.length === 0) {
    return (
      <main className="space-y-5">
        <Link
          href="/teacher/classes"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
        >
          <ArrowLeft
            size={17}
            strokeWidth={2}
          />

          Back to My Classes
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
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

  return (
    <main className="space-y-5">
      {/* Header */}
      <div>
        <Link
          href="/teacher/classes"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
        >
          <ArrowLeft
            size={17}
            strokeWidth={2}
          />

          Back to My Classes
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {classKey}
            </h1>

            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              {subjectsText} · Room {schoolClass.room}
            </p>
          </div>

          {schoolClass.teacherId === currentTeacherId && (
            <span className="w-fit rounded-full bg-[#e6f4f2] px-4 py-2 text-sm font-medium text-[#01796f]">
              Class Teacher
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <Users
                size={20}
                strokeWidth={2}
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Students
              </p>

              <p className="text-xl font-bold text-gray-900">
                {classStudents.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <BookOpen
                size={20}
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-500">
                Subject
              </p>

              <p className="truncate text-xl font-bold text-gray-900">
                {subjectsText}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <CalendarDays
                size={20}
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-500">
                Schedule
              </p>

              <p className="text-sm font-bold text-gray-900">
                {scheduleText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Students */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Students
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Students enrolled in {classKey}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-[#e6f4f2] px-3 py-1 text-sm font-medium text-[#01796f]">
            {classStudents.length} Students
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {classStudents.length > 0 ? (
            classStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center gap-3 rounded-xl bg-gray-50 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
                  <UserRound
                    size={18}
                    strokeWidth={2}
                  />
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
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#01796f] hover:bg-[#e6f4f2] hover:text-[#01796f]"
                >
                  View
                </Link>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-gray-500">
              No students found.
            </p>
          )}
        </div>
      </div>

      {/* Class Management */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Class Management
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage activities and records for this class.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/teacher/students"
            className="rounded-xl border border-gray-200 p-4 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:bg-[#e6f4f2] hover:text-[#01796f]"
          >
            View Students
          </Link>

          <Link
            href="/teacher/attendance"
            className="rounded-xl border border-gray-200 p-4 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:bg-[#e6f4f2] hover:text-[#01796f]"
          >
            Attendance
          </Link>

          <Link
            href="/teacher/assignments"
            className="rounded-xl border border-gray-200 p-4 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:bg-[#e6f4f2] hover:text-[#01796f]"
          >
            Assignments
          </Link>

          <Link
            href="/teacher/exams"
            className="rounded-xl border border-gray-200 p-4 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:bg-[#e6f4f2] hover:text-[#01796f]"
          >
            Exams
          </Link>

          <Link
            href="/teacher/marks"
            className="rounded-xl border border-gray-200 p-4 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:bg-[#e6f4f2] hover:text-[#01796f]"
          >
            Marks
          </Link>

          <Link
            href="/teacher/study-material"
            className="rounded-xl border border-gray-200 p-4 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:bg-[#e6f4f2] hover:text-[#01796f]"
          >
            Study Material
          </Link>
        </div>
      </div>
    </main>
  );
}