"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Users,
} from "lucide-react";

import {
  fetchTeacherAssignments,
  fetchTeacherClasses,
  fetchTeacherExams,
  fetchTeacherStudents,
  fetchTeacherTimetable,
} from "@/lib/teacher-api";
import type {
  TeacherAssignment,
  TeacherClassView,
  TeacherExam,
  TeacherStudent,
} from "@/lib/teacher-api";
import type { TimetableEntry } from "@/types/timetable";
import { useTeacherProfile } from "@/lib/useTeacherProfile";

type DashboardData = {
  classes: TeacherClassView[];
  students: TeacherStudent[];
  assignments: TeacherAssignment[];
  exams: TeacherExam[];
  periods: TimetableEntry[];
};

const emptyData: DashboardData = {
  classes: [],
  students: [],
  assignments: [],
  exams: [],
  periods: [],
};

export default function TeacherDashboard() {
  const { profile, loading: profileLoading } = useTeacherProfile();

  const [data, setData] = useState<DashboardData>(emptyData);
  const [loaded, setLoaded] = useState(false);
  const [failures, setFailures] = useState<string[]>([]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const [classes, students, assignments, exams, timetable] =
        await Promise.allSettled([
          fetchTeacherClasses(),
          fetchTeacherStudents(),
          fetchTeacherAssignments(),
          fetchTeacherExams(),
          fetchTeacherTimetable(),
        ]);

      if (!active) return;

      const missing: string[] = [];

      const value = <T,>(
        result: PromiseSettledResult<T>,
        label: string,
        fallback: T
      ): T => {
        if (result.status === "fulfilled") return result.value;

        missing.push(label);

        return fallback;
      };

      const timetableValue =
        timetable.status === "fulfilled" ? timetable.value : null;

      if (!timetableValue) missing.push("Timetable");

      setData({
        classes: value(classes, "Classes", []),
        students: value(students, "Students", []),
        assignments: value(assignments, "Assignments", []),
        exams: value(exams, "Exams", []),
        periods: timetableValue?.periods ?? [],
      });

      setFailures(missing);
      setLoaded(true);
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  const todayName = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", { weekday: "long" }),
    []
  );

  const todayClasses = useMemo(
    () => data.periods.filter((period) => period.day === todayName),
    [data.periods, todayName]
  );

  const pendingAssignments = data.assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;

  const upcomingExams = data.exams.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  const stats = [
    {
      title: "My Classes",
      value: data.classes.length,
      description: "classes assigned",
      icon: GraduationCap,
    },
    {
      title: "My Students",
      value: data.students.length,
      description: "students enrolled",
      icon: Users,
    },
    {
      title: "Pending Assignments",
      value: pendingAssignments,
      description: "total assignments",
      icon: FileText,
    },
    {
      title: "Upcoming Exams",
      value: upcomingExams,
      description: "total exams",
      icon: ClipboardCheck,
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

  if (profileLoading || !loaded) {
    return (
      <main className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Loading your dashboard...
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading your classes...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Welcome back, {profile?.name ?? "teacher"}. Here's what's
          happening with your classes today.
        </p>
      </div>

      {failures.length > 0 && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          Could not load: {failures.join(", ")}.
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-800">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <Icon size={21} strokeWidth={2} />
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
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
                className="group flex items-center gap-4 rounded-xl border border-gray-100 p-4 text-left transition hover:border-[#01796F] hover:bg-[#e6f4f2]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <Icon size={20} strokeWidth={2} />
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
                  strokeWidth={2}
                  className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#01796F]"
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Classes + Exams */}
      <div className="grid gap-5 xl:grid-cols-2">
        {/* Today's Classes */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
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
              className="text-sm font-medium text-[#01796F] hover:text-[#015f58]"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {todayClasses.length > 0 ? (
              todayClasses.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl bg-[#f6f8f8] p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                    <CalendarDays size={19} strokeWidth={2} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.subject}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.className} - {item.section} · {item.room}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-medium text-[#01796F]">
                    {item.startTime} - {item.endTime}
                  </p>
                </div>
              ))
            ) : (
              <p className="py-6 text-center text-sm text-gray-500">
                No classes scheduled for today.
              </p>
            )}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
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
              className="text-sm font-medium text-[#01796F] hover:text-[#015f58]"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingExams > 0 ? (
              data.exams
                .filter((exam) => exam.status === "Upcoming")
                .slice(0, 4)
                .map((exam) => (
                  <div
                    key={exam.id}
                    className="flex items-center gap-4 rounded-xl bg-[#f6f8f8] p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                      <CalendarDays size={19} strokeWidth={2} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {exam.subject}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {exam.className} - {exam.section} · {exam.examDate}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-medium text-[#01796F]">
                      {exam.totalMarks} marks
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
