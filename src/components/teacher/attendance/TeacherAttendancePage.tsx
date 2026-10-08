"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  Plane,
  Users,
  X,
} from "lucide-react";

import { getSession } from "@/lib/auth";

import { attendance as initialAttendance } from "@/data/attendance";
import { subjects } from "@/data/subjects";
import { StudentAttendanceRecord } from "@/types/attendance";

import TeacherAttendanceTable from "./TeacherAttendanceTable";
import TeacherAttendanceCard from "./TeacherAttendanceCard";

export default function TeacherAttendancePage() {
  const session = getSession();

  const currentTeacherId =
    subjects.find(
      (subject) => subject.teacher === session?.name
    )?.teacherId ?? "T001";

  const teacherClassKeys = useMemo(() => {
    return new Set(
      subjects
        .filter((subject) => subject.teacherId === currentTeacherId)
        .map(
          (subject) =>
            `${subject.className}-${subject.section}`
        )
    );
  }, [currentTeacherId]);

  const availableClasses = Array.from(teacherClassKeys);

  const [selectedClass, setSelectedClass] = useState("All");
  const [date, setDate] = useState("2026-09-08");

  const getFormattedDate = (value: string) => {
    const [year, month, day] = value.split("-");

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${day} ${months[Number(month) - 1]} ${year}`;
  };

  const selectedDate = getFormattedDate(date);

  const teacherAttendance = useMemo(() => {
    return initialAttendance.filter(
      (item): item is StudentAttendanceRecord =>
        item.role === "Student" &&
        teacherClassKeys.has(
          `${item.className}-${item.section}`
        ) &&
        item.date === selectedDate
    );
  }, [teacherClassKeys, selectedDate]);

  const filteredAttendance =
    selectedClass === "All"
      ? teacherAttendance
      : teacherAttendance.filter(
          (item) =>
            `${item.className}-${item.section}` === selectedClass
        );

  const presentCount = filteredAttendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = filteredAttendance.filter(
    (record) => record.status === "Absent"
  ).length;

  const lateCount = filteredAttendance.filter(
    (record) => record.status === "Late"
  ).length;

  const leaveCount = filteredAttendance.filter(
    (record) => record.status === "Leave"
  ).length;

  const totalRecords = filteredAttendance.length;

  const attendedCount = presentCount + lateCount;

  const attendancePercentage =
    totalRecords > 0
      ? Math.round((attendedCount / totalRecords) * 100)
      : 0;

  const handleMarkAllPresent = () => {
    console.log(
      "Marking attendance as present:",
      filteredAttendance
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Attendance
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage attendance for students in your assigned classes.
        </p>
      </div>

      {/* Attendance Controls */}
      <div className="overflow rounded-2xl border border-gray-200 bg-white shadow-sm">
        
        <div className="p-5 sm:p-6">

          <div className="mt- grid gap-4 border-gray-100 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
            {/* Class */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Class
              </label>

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
              >
                <option value="All">All Classes</option>

                {availableClasses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
              />
            </div>

            {/* Action */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleMarkAllPresent}
                className="w-full whitespace-nowrap rounded-full bg-[#01796f] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58] sm:w-auto"
              >
                Mark All Present
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryCard
          title="Present"
          value={presentCount}
          icon={<Check size={20} />}
          iconClass="text-[#01796f]"
        />

        <SummaryCard
          title="Absent"
          value={absentCount}
          icon={<X size={20} />}
          iconClass="text-red-500"
        />

        <SummaryCard
          title="Late"
          value={lateCount}
          icon={<Clock3 size={20} />}
          iconClass="text-yellow-500"
        />

        <SummaryCard
          title="Leave"
          value={leaveCount}
          icon={<Plane size={20} />}
          iconClass="text-blue-500"
        />

        <SummaryCard
          title="Attendance"
          value={`${attendancePercentage}%`}
          icon={<CalendarDays size={20} />}
          iconClass="text-[#01796f]"
        />
      </div>

      {/* Attendance Records */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Attendance Records
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View and manage attendance for your assigned students.
          </p>
        </div>

        <TeacherAttendanceTable
          attendance={filteredAttendance}
        />

        <TeacherAttendanceCard
          attendance={filteredAttendance}
        />
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
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div
          className={`rounded-xl bg-[#e6f4f2] p-2.5 ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Attendance record
      </p>
    </div>
  );
}