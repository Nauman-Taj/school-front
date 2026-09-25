import { students } from "@/data/students";
import { subjects } from "@/data/subjects";
import { assignments } from "@/data/assignments";
import { exams } from "@/data/exams";
import { results } from "@/data/results";
import { notifications } from "@/data/notifications";

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

  const totalMarks = studentResults.reduce(
    (total, result) => total + result.totalMarks,
    0
  );

  const obtainedMarks = studentResults.reduce(
    (total, result) => total + result.obtainedMarks,
    0
  );

  const currentGPA =
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

  const pendingAssignments = studentAssignments.length;

  const upcomingExams = studentExams.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  const unreadNotifications = currentStudent
    ? notifications.filter(
      (notification) =>
        notification.role === "Student" &&
        notification.userId === (currentStudent.id) &&
        !notification.read
    ).length
    : 0;

  return (
    <div className="space-y-5">
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
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* Attendance */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Attendance
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            92%
          </h2>

          <p className="mt-4 text-sm text-[#01796f]">
            Good attendance
          </p>
        </div>

        {/* Current GPA */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Current GPA
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {currentGPA}
          </h2>

          <p className="mt-4 text-sm text-[#01796f]">
            {overallPercentage}% overall performance
          </p>
        </div>

        {/* Pending Assignments */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Pending Assignments
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {pendingAssignments}
          </h2>

          <p className="mt-4 text-sm text-gray-500">
            Assignments for your class
          </p>
        </div>

        {/* Upcoming Exams */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Upcoming Exams
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {upcomingExams}
          </h2>

          <p className="mt-4 text-sm text-gray-500">
            Exams scheduled for your class
          </p>
        </div>

        {/* Current Courses */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Current Courses
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {studentSubjects.length}
          </h2>

          <p className="mt-4 text-sm text-gray-500">
            Your enrolled subjects
          </p>
        </div>

        {/* Unread Notifications */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Unread Notifications
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {unreadNotifications}
          </h2>

          <p className="mt-4 text-sm text-gray-500">
            Notifications to review
          </p>
        </div>
      </div>

      {/* Attendance */}
      <StudentAttendanceCard />
    </div>
  );
}