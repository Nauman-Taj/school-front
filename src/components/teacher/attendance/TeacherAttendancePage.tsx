
"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  Plane,
  X,
} from "lucide-react";

import { getSession } from "@/lib/auth";
import { attendance as initialAttendance } from "@/data/attendance";
import { subjects } from "@/data/subjects";
import { teachers } from "@/data/teachers";
import type { StudentAttendanceRecord } from "@/types/attendance";

import TeacherAttendanceTable from "./TeacherAttendanceTable";
import TeacherAttendanceCard from "./TeacherAttendanceCard";

type AttendanceStatus = StudentAttendanceRecord["status"];

export default function TeacherAttendancePage() {
  const session = getSession();

  const currentTeacher = teachers.find(
    (teacher) =>
      (!!session?.email && teacher.email === session.email) ||
      (!!session?.name && teacher.name === session.name)
  );

  const currentTeacherId = currentTeacher?.id;

  const teacherClassKeys = useMemo(() => {
    if (!currentTeacherId) return new Set<string>();

    return new Set(
      subjects
        .filter((subject) => subject.teacherId === currentTeacherId)
        .map((subject) => `${subject.className}-${subject.section}`)
    );
  }, [currentTeacherId]);

  const availableClasses = Array.from(teacherClassKeys);

  const [selectedClass, setSelectedClass] = useState("All");
  const [date, setDate] = useState("2026-09-08");

  // Temporary in-memory state until the attendance API is connected.
  const [attendanceRecords, setAttendanceRecords] =
    useState(initialAttendance);

  const [saveMessage, setSaveMessage] = useState("");

  function getFormattedDate(value: string) {
    const [year, month, day] = value.split("-");
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    return `${day} ${months[Number(month) - 1]} ${year}`;
  }

  const selectedDate = getFormattedDate(date);

  const teacherAttendance = useMemo(() => {
    if (!currentTeacherId) return [];

    return attendanceRecords.filter(
      (item): item is StudentAttendanceRecord =>
        item.role === "Student" &&
        teacherClassKeys.has(`${item.className}-${item.section}`) &&
        item.date === selectedDate
    );
  }, [attendanceRecords, currentTeacherId, teacherClassKeys, selectedDate]);

  const filteredAttendance =
    selectedClass === "All"
      ? teacherAttendance
      : teacherAttendance.filter(
          (item) =>
            `${item.className}-${item.section}` === selectedClass
        );

  function updateStatus(id: StudentAttendanceRecord["id"], status: AttendanceStatus) {
    setAttendanceRecords((current) =>
      current.map((item) =>
        item.id === id && item.role === "Student"
          ? { ...item, status }
          : item
      )
    );
    setSaveMessage("");
  }

  function handleMarkAllPresent() {
    if (filteredAttendance.length === 0) return;

    const ids = new Set(filteredAttendance.map((item) => item.id));

    setAttendanceRecords((current) =>
      current.map((item) =>
        item.role === "Student" && ids.has(item.id)
          ? { ...item, status: "Present" }
          : item
      )
    );

    setSaveMessage("");
  }

  function handleSave() {
    if (filteredAttendance.length === 0) {
      setSaveMessage("There are no attendance records to save.");
      return;
    }

    // This confirms the current in-memory changes only.
    // Connect this handler to the backend API for durable saving.
    setSaveMessage(
      "Attendance updated for this session. Connect the backend API to save it permanently."
    );
  }

  const presentCount = filteredAttendance.filter(
    (item) => item.status === "Present"
  ).length;
  const absentCount = filteredAttendance.filter(
    (item) => item.status === "Absent"
  ).length;
  const lateCount = filteredAttendance.filter(
    (item) => item.status === "Late"
  ).length;
  const leaveCount = filteredAttendance.filter(
    (item) => item.status === "Leave"
  ).length;

  const attendancePercentage =
    filteredAttendance.length > 0
      ? Math.round(
          ((presentCount + lateCount) / filteredAttendance.length) * 100
        )
      : 0;

  if (!currentTeacher) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h1 className="text-xl font-bold text-gray-900">Attendance</h1>
        <p className="mt-2 text-sm text-gray-500">
          We couldn't match your session to a teacher account. Check the
          logged-in user's email or name and the shared teachers data.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Attendance
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Mark attendance for classes assigned to {currentTeacher.name}.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] sm:p-6">
          <div>
            <label htmlFor="attendanceClass" className="mb-2 block text-sm font-medium text-gray-700">
              Class
            </label>
            <select
              id="attendanceClass"
              value={selectedClass}
              onChange={(event) => {
                setSelectedClass(event.target.value);
                setSaveMessage("");
              }}
              className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            >
              <option value="All">All Classes</option>
              {availableClasses.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="attendanceDate" className="mb-2 block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              id="attendanceDate"
              type="date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
                setSaveMessage("");
              }}
              className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleMarkAllPresent}
              disabled={filteredAttendance.length === 0}
              className="w-full whitespace-nowrap rounded-full bg-[#01796f] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Mark All Present
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryCard title="Present" value={presentCount} icon={<Check size={20} />} iconClass="text-[#01796f]" />
        <SummaryCard title="Absent" value={absentCount} icon={<X size={20} />} iconClass="text-red-500" />
        <SummaryCard title="Late" value={lateCount} icon={<Clock3 size={20} />} iconClass="text-yellow-500" />
        <SummaryCard title="Leave" value={leaveCount} icon={<Plane size={20} />} iconClass="text-blue-500" />
        <SummaryCard title="Attendance" value={`${attendancePercentage}%`} icon={<CalendarDays size={20} />} iconClass="text-[#01796f]" />
      </div>

      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Attendance Records
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Select a status for each student, then save your changes.
          </p>
        </div>

        <TeacherAttendanceTable
          attendance={filteredAttendance}
          onStatusChange={updateStatus}
          onSave={handleSave}
        />

        <TeacherAttendanceCard
          attendance={filteredAttendance}
          onStatusChange={updateStatus}
          onSave={handleSave}
        />

        {saveMessage && (
          <p
            role="status"
            className="mt-3 rounded-xl border border-[#01796f]/15 bg-[#e6f4f2] px-4 py-3 text-sm text-[#015f58]"
          >
            {saveMessage}
          </p>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">{value}</h2>
        </div>
        <div className={`rounded-xl bg-[#e6f4f2] p-2.5 ${iconClass}`}>
          {icon}
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-500">Attendance record</p>
    </div>
  );
}
