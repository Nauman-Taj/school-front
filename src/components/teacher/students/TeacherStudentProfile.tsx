"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  UserRound,
  Users,
  GraduationCap,
} from "lucide-react";

import { getSession } from "@/lib/auth";

import { students } from "@/data/students";
import { subjects } from "@/data/subjects";

export default function TeacherStudentProfile() {
  const params = useParams();
  const session = getSession();

  const studentId = Number(params.id);

  const student = students.find(
    (item) => item.id === studentId
  );

  const currentTeacherId =
    subjects.find(
      (subject) => subject.teacher === session?.name
    )?.teacherId ?? "T001";

  const teacherSubjects = subjects.filter(
    (subject) => subject.teacherId === currentTeacherId
  );

  const teacherClassKeys = new Set(
    teacherSubjects.map(
      (subject) => `${subject.className}-${subject.section}`
    )
  );

  const isAssignedStudent =
    student &&
    teacherClassKeys.has(
      `${student.className}-${student.section}`
    );

  if (!student || !isAssignedStudent) {
    return (
      <div className="space-y-5">
        <Link
          href="/teacher/students"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#01796f]"
        >
          <ArrowLeft size={17} />
          Back to Students
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
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

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <Link
          href="/teacher/students"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#01796f]"
        >
          <ArrowLeft size={17} />
          Back to Students
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
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
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Student Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Basic information about this student.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#01796f]/10 text-[#01796f]">
              <Mail size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-gray-500">Email</p>
              <p className="truncate text-sm font-medium text-gray-900">
                {student.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#01796f]/10 text-[#01796f]">
              <Phone size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-900">
                {student.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#01796f]/10 text-[#01796f]">
              <GraduationCap size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">Class</p>
              <p className="text-sm font-medium text-gray-900">
                {student.className} - {student.section}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#01796f]/10 text-[#01796f]">
              <Users size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">Parent</p>
              <p className="text-sm font-medium text-gray-900">
                {student.parentName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Academic Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Academic details available to you as the student's teacher.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Class</p>
            <p className="mt-1 font-semibold text-gray-900">
              {student.className} - {student.section}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Roll Number</p>
            <p className="mt-1 font-semibold text-gray-900">
              {student.rollNo}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Status</p>
            <p className="mt-1 font-semibold text-gray-900">
              {student.status}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage records related to this student.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </div>
    </div>
  );
}