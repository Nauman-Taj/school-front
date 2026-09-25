"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Users,
} from "lucide-react";

import { getSession } from "@/lib/auth";

import { teachers } from "@/data/teachers";
import { students } from "@/data/students";
import { subjects } from "@/data/subjects";
import { assignments } from "@/data/assignments";
import { exams } from "@/data/exams";
import { timetable } from "@/data/timetable";

export default function TeacherDashboard() {
  const session = getSession();

  const currentTeacher =
    teachers.find(
      (teacher) =>
        teacher.email === session?.email ||
        teacher.name === session?.name
    ) ?? teachers[0];

  const teacherSubjects = subjects.filter(
    (subject) => subject.teacherId === currentTeacher.id
  );

  const teacherAssignments = assignments.filter(
    (assignment) => assignment.teacherId === currentTeacher.id
  );

  const teacherExams = exams.filter(
    (exam) => exam.teacherId === currentTeacher.id
  );

  const teacherTimetable = timetable.filter(
    (entry) => entry.teacherId === currentTeacher.id
  );

  const teacherClassKeys = Array.from(
    new Set(
      teacherSubjects.map(
        (subject) => `${subject.className}-${subject.section}`
      )
    )
  );

  const teacherStudents = students.filter((student) =>
    teacherClassKeys.includes(`${student.className}-${student.section}`)
  );

  const pendingAssignments = teacherAssignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;

  const upcomingExams = teacherExams.filter(
    (exam) => exam.status === "Upcoming"
  );

  const todayClasses = teacherTimetable.slice(0, 4);

  const stats = [
    {
      title: "My Classes",
      value: teacherClassKeys.length,
      change: `${teacherSubjects.length}`,
      description: "subjects assigned",
      icon: BookOpen,
    },
    {
      title: "My Students",
      value: teacherStudents.length,
      change: `${teacherClassKeys.length}`,
      description: "classes",
      icon: Users,
    },
    {
      title: "Pending Assignments",
      value: pendingAssignments,
      change: `${teacherAssignments.length}`,
      description: "total assignments",
      icon: FileText,
    },
    {
      title: "Upcoming Exams",
      value: upcomingExams.length,
      change: `${teacherExams.length}`,
      description: "total exams",
      icon: CalendarDays,
    },
  ];

  const quickActions = [
    {
      title: "Take Attendance",
      description: "Mark today's attendance",
      href: "/teacher/attendance",
      icon: ClipboardCheck,
    },
    {
      title: "Manage Assignments",
      description: "Create and manage assignments",
      href: "/teacher/assignments",
      icon: FileText,
    },
    {
      title: "Enter Marks",
      description: "Record student marks",
      href: "/teacher/marks",
      icon: BookOpen,
    },
  ];

  return (
    <main className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Welcome back, {currentTeacher.name}. Here's what's happening with
          your classes today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                  <Icon size={21} strokeWidth={1.8} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="font-semibold text-[#01796f]">
                  {stat.change}
                </span>

                <span className="text-gray-500">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Quickly access your most common tasks
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-[#01796f] hover:bg-[#e6f4f2]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {action.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {action.description}
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#01796f]"
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Classes + Exams */}
      <div className="grid gap-5 xl:grid-cols-2">
        {/* Today's Classes */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Today's Classes
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your scheduled classes for today
              </p>
            </div>

            <Link
              href="/teacher/classes"
              className="text-sm font-medium text-[#01796f] hover:text-[#015f58]"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {todayClasses.length > 0 ? (
              todayClasses.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl bg-gray-50 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#01796f]/10 text-[#01796f]">
                    <CalendarDays size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.subject}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.className} - {item.section} · {item.room}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-medium text-[#01796f]">
                    {item.startTime} - {item.endTime}
                  </p>
                </div>
              ))
            ) : (
              <p className="py-6 text-center text-sm text-gray-500">
                No classes scheduled.
              </p>
            )}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Upcoming Exams
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Exams coming up for your classes
              </p>
            </div>

            <Link
              href="/teacher/exams"
              className="text-sm font-medium text-[#01796f] hover:text-[#015f58]"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingExams.length > 0 ? (
              upcomingExams.slice(0, 4).map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center gap-4 rounded-xl bg-gray-50 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#01796f]/10 text-[#01796f]">
                    <CalendarDays size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {exam.subject}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {exam.className} - {exam.section}
                    </p>
                  </div>

                  <p className="shrink-0 text-xs font-medium text-[#01796f]">
                    {exam.examDate}
                  </p>
                </div>
              ))
            ) : (
              <p className="py-6 text-center text-sm text-gray-500">
                No upcoming exams.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}