"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  Clock3,
  GraduationCap,
  MapPin,
  Trophy,
  UserRound,
} from "lucide-react";

import {
  fetchStudentAssignments,
  fetchStudentAttendance,
  fetchStudentExams,
  fetchStudentResults,
  fetchStudentTimetable,
} from "@/lib/student-api";
import type {
  ApiStudentAssignment,
  ApiStudentExam,
  ApiStudentResult,
} from "@/lib/student-api";
import type { AttendanceStatus } from "@/types/attendance";
import type { TimetableEntry } from "@/types/timetable";

import StudentStatCards from "./StudentStatCards";

type AttendanceEntry = {
  id: number;
  date: string;
  status: AttendanceStatus;
};

export default function StudentDashboard() {
  const [state, setState] = useState<{
    loaded: boolean;
    attendance: AttendanceEntry[];
    assignments: ApiStudentAssignment[];
    exams: ApiStudentExam[];
    results: ApiStudentResult[];
    timetable: TimetableEntry[];
    failures: string[];
  }>({
    loaded: false,
    attendance: [],
    assignments: [],
    exams: [],
    results: [],
    timetable: [],
    failures: [],
  });

  useEffect(() => {
    let active = true;

    // Every section settles on its own, so one failing endpoint cannot blank
    // the dashboard.
    const load = async () => {
      const failures: string[] = [];

      const value = async <T,>(
        label: string,
        promise: Promise<T>,
        fallback: T
      ): Promise<T> => {
        try {
          return await promise;
        } catch {
          failures.push(label);
          return fallback;
        }
      };

      const [attendance, assignments, exams, results, timetable] =
        await Promise.all([
          value("Attendance", fetchStudentAttendance(), [] as AttendanceEntry[]),
          value(
            "Assignments",
            fetchStudentAssignments(),
            [] as ApiStudentAssignment[]
          ),
          value("Exams", fetchStudentExams(), [] as ApiStudentExam[]),
          value("Results", fetchStudentResults(), [] as ApiStudentResult[]),
          value("Timetable", fetchStudentTimetable(), [] as TimetableEntry[]),
        ]);

      if (!active) return;

      setState({
        loaded: true,
        attendance,
        assignments,
        exams,
        results,
        timetable,
        failures,
      });
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  const todayName = useMemo(
    () => new Date().toLocaleDateString("en-US", { weekday: "long" }),
    []
  );

  const todayClasses = useMemo(
    () => state.timetable.filter((entry) => entry.day === todayName),
    [state.timetable, todayName]
  );

  const pendingAssignments = state.assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;

  const upcomingExams = state.exams.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  const obtainedMarks = state.results.reduce(
    (total, result) => total + result.obtainedMarks,
    0
  );

  const totalMarks = state.results.reduce(
    (total, result) => total + result.totalMarks,
    0
  );

  const resultsPercentage =
    totalMarks > 0 ? Math.round((obtainedMarks / totalMarks) * 100) : 0;

  const presentOrLate = state.attendance.filter(
    (record) => record.status === "Present" || record.status === "Late"
  ).length;

  const attendanceRate =
    state.attendance.length > 0
      ? Math.round((presentOrLate / state.attendance.length) * 100)
      : 0;

  const quickActions = [
    {
      title: "My Results",
      description: "Check your marks and grades",
      href: "/student/results",
      icon: Trophy,
    },
    {
      title: "My Assignments",
      description: "See the work set for your class",
      href: "/student/assignments",
      icon: ClipboardList,
    },
    {
      title: "My Attendance",
      description: "Review your attendance record",
      href: "/student/attendance",
      icon: CalendarCheck,
    },
    {
      title: "Exam Schedule",
      description: "Upcoming exams for your class",
      href: "/student/exams",
      icon: GraduationCap,
    },
  ];

  const stats = [
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      icon: CalendarCheck,
    },
    {
      title: "Results Average",
      value: `${resultsPercentage}%`,
      icon: Trophy,
    },
    {
      title: "Pending Assignments",
      value: pendingAssignments,
      icon: ClipboardList,
    },
    {
      title: "Upcoming Exams",
      value: upcomingExams,
      icon: GraduationCap,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Welcome back. Here&apos;s what&apos;s happening with your studies.
        </p>
      </div>

      {state.failures.length > 0 && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          Some sections could not be loaded: {state.failures.join(", ")}.
        </div>
      )}

      {!state.loaded ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading your dashboard...
          </p>
        </div>
      ) : (
        <>
          {/* Summary */}
          <StudentStatCards stats={stats} />

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

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

          <div className="grid gap-5 lg:grid-cols-2">
            {/* Today's Classes */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Today&apos;s Classes
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your scheduled classes for today.
                  </p>
                </div>

                <Link
                  href="/student/timetable"
                  className="text-sm font-medium text-[#01796F] transition hover:text-[#015f58]"
                >
                  View all
                </Link>
              </div>

              {todayClasses.length > 0 ? (
                <div className="space-y-3">
                  {todayClasses.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                          <BookOpen size={18} />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {entry.subject}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {entry.teacher}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="flex items-center justify-end gap-1.5 text-xs text-gray-500">
                          <Clock3 size={13} className="text-[#01796F]" />
                          {entry.startTime} - {entry.endTime}
                        </p>

                        <p className="mt-1 flex items-center justify-end gap-1.5 text-xs text-gray-500">
                          <MapPin size={13} className="text-[#01796F]" />
                          {entry.room}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-[#f6f8f8] px-4 py-8 text-center">
                  <p className="text-sm text-gray-500">
                    No classes scheduled for today.
                  </p>
                </div>
              )}
            </div>

            {/* Upcoming Exams */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Upcoming Exams
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Exams coming up for your class.
                  </p>
                </div>

                <Link
                  href="/student/exams"
                  className="text-sm font-medium text-[#01796F] transition hover:text-[#015f58]"
                >
                  View all
                </Link>
              </div>

              {state.exams.length > 0 ? (
                <div className="space-y-3">
                  {state.exams.slice(0, 4).map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                          <GraduationCap size={18} />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {exam.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {exam.subject} · {exam.totalMarks} marks
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-500">{exam.examDate}</p>

                        <p className="mt-1 flex items-center justify-end gap-1.5 text-xs text-gray-500">
                          <UserRound size={13} className="text-[#01796F]" />
                          {exam.teacher}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-[#f6f8f8] px-4 py-8 text-center">
                  <p className="text-sm text-gray-500">No upcoming exams.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
