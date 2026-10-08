import {
  BookOpen,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  Bell,
  Trophy,
} from "lucide-react";

import { students } from "@/data/students";
import { subjects } from "@/data/subjects";
import { assignments } from "@/data/assignments";
import { exams } from "@/data/exams";
import { results } from "@/data/results";
import { notifications } from "@/data/notifications";
import { attendance } from "@/data/attendance";

import StudentAttendanceCard from "./attendance/StudentAttendanceCard";

export default function StudentDashboard() {
  const currentStudent = students.find(
    (student) => student.id === 1
  );

  const studentSubjects = currentStudent
    ? subjects.filter(
        (subject) =>
          subject.className === currentStudent.className &&
          subject.section === currentStudent.section
      )
    : [];

  const studentAssignments = currentStudent
    ? assignments.filter(
        (assignment) =>
          assignment.className === currentStudent.className &&
          assignment.section === currentStudent.section
      )
    : [];

  const studentExams = currentStudent
    ? exams.filter(
        (exam) =>
          exam.className === currentStudent.className &&
          exam.section === currentStudent.section
      )
    : [];

  const studentResults = currentStudent
    ? results.filter(
        (result) => result.studentId === currentStudent.id
      )
    : [];

  const studentAttendance = currentStudent
    ? attendance.filter(
        (record) =>
          record.role === "Student" &&
          record.studentId === currentStudent.id
      )
    : [];

  const totalMarks = studentResults.reduce(
    (total, result) => total + result.totalMarks,
    0
  );

  const obtainedMarks = studentResults.reduce(
    (total, result) => total + result.obtainedMarks,
    0
  );

  const currentPerformance =
    studentResults.length > 0
      ? (
          studentResults.reduce(
            (total, result) => total + result.percentage,
            0
          ) / studentResults.length
        ).toFixed(2)
      : "0.00";

  const overallPercentage =
    totalMarks > 0
      ? Math.round((obtainedMarks / totalMarks) * 100)
      : 0;

  const presentOrLate = studentAttendance.filter(
    (record) =>
      record.status === "Present" ||
      record.status === "Late"
  ).length;

  const attendanceRate =
    studentAttendance.length > 0
      ? Number(
          (
            (presentOrLate / studentAttendance.length) *
            100
          ).toFixed(1)
        )
      : 0;

  const pendingAssignments = studentAssignments.length;

  const upcomingExams = studentExams.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  const unreadNotifications = currentStudent
    ? notifications.filter(
        (notification) =>
          notification.role === "Student" &&
          notification.userId === currentStudent.id &&
          !notification.read
      ).length
    : 0;

  const statsData = [
    {
      title: "Attendance",
      value: `${attendanceRate}%`,
      change: `${attendanceRate}%`,
      description: "current attendance",
      icon: CalendarCheck,
    },
    {
      title: "Current Performance",
      value: currentPerformance,
      change: `${overallPercentage}%`,
      description: "overall performance",
      icon: Trophy,
    },
    {
      title: "Pending Assignments",
      value: pendingAssignments.toString(),
      change: pendingAssignments.toString(),
      description: "assignments to complete",
      icon: ClipboardList,
    },
    {
      title: "Upcoming Exams",
      value: upcomingExams.toString(),
      change: upcomingExams.toString(),
      description: "exams scheduled",
      icon: GraduationCap,
    },
    {
      title: "Current Courses",
      value: studentSubjects.length.toString(),
      change: studentSubjects.length.toString(),
      description: "enrolled subjects",
      icon: BookOpen,
    },
    {
      title: "Unread Notifications",
      value: unreadNotifications.toString(),
      change: unreadNotifications.toString(),
      description: "notifications to review",
      icon: Bell,
    },
  ];

  return (
    <main className="space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Welcome back. Here's what's happening with your studies.
        </p>
      </div>

      {/* Student Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {statsData.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
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
                  <Icon
                    size={21}
                    strokeWidth={1.8}
                  />
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

      {/* Attendance */}
      <StudentAttendanceCard />
    </main>
  );
}