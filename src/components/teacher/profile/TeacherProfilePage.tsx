"use client";

import { useMemo } from "react";
import {
  BookOpen,
  Mail,
  Phone,
  GraduationCap,
  UserRound,
  CalendarDays,
  Users,
} from "lucide-react";

import { getSession } from "@/lib/auth";

import { teachers } from "@/data/teachers";
import { subjects } from "@/data/subjects";
import { classes } from "@/data/classes";

export default function TeacherProfilePage() {
  const session = getSession();

  const currentTeacher =
    teachers.find(
      (teacher) =>
        teacher.email === session?.email ||
        teacher.name === session?.name
    ) ?? teachers[0];

  const teacherSubjects = useMemo(() => {
    return subjects.filter(
      (subject) => subject.teacherId === currentTeacher.id
    );
  }, [currentTeacher.id]);

  const teacherClasses = useMemo(() => {
    return classes.filter(
      (schoolClass) =>
        schoolClass.teacherId === currentTeacher.id
    );
  }, [currentTeacher.id]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your personal information, subjects, and assigned classes.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
            <UserRound size={36} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {currentTeacher.name}
            </h2>

            <p className="mt-1 text-sm text-[#01796f]">
              {currentTeacher.subject} Teacher
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {currentTeacher.qualification}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          Personal Information
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 text-[#01796f]" size={19} />

            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Email
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {currentTeacher.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 text-[#01796f]" size={19} />

            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Phone
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {currentTeacher.phone}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <GraduationCap
              className="mt-0.5 text-[#01796f]"
              size={19}
            />

            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Qualification
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {currentTeacher.qualification}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays
              className="mt-0.5 text-[#01796f]"
              size={19}
            />

            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Joining Date
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {currentTeacher.joiningDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Subjects */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796f]">
            <BookOpen size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Assigned Subjects
            </h2>

            <p className="text-sm text-gray-500">
              Subjects currently assigned to you.
            </p>
          </div>
        </div>

        {teacherSubjects.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {teacherSubjects.map((subject) => (
              <div
                key={subject.id}
                className="rounded-xl border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {subject.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {subject.code}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                    {subject.status}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600">
                  {subject.className} - {subject.section}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No subjects assigned.
          </p>
        )}
      </div>

      {/* Assigned Classes */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796f]">
            <Users size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Assigned Classes
            </h2>

            <p className="text-sm text-gray-500">
              Classes where you are the class teacher.
            </p>
          </div>
        </div>

        {teacherClasses.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teacherClasses.map((schoolClass) => (
              <div
                key={schoolClass.id}
                className="rounded-xl border border-gray-200 p-4"
              >
                <p className="font-semibold text-gray-900">
                  {schoolClass.name} - {schoolClass.section}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Room: {schoolClass.room}
                </p>

                <span className="mt-3 inline-block rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                  {schoolClass.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No classes assigned.
          </p>
        )}
      </div>
    </div>
  );
}