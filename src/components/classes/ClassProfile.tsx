import Link from "next/link";
import {
  ArrowLeft,
  DoorOpen,
  Pencil,
  UserRound,
  Users,
} from "lucide-react";

import { SchoolClass } from "@/types/class";
import { students } from "@/data/students";

type ClassProfileProps = {
  schoolClass: SchoolClass;
};

export default function ClassProfile({
  schoolClass,
}: ClassProfileProps) {
  const className = `${schoolClass.name}-${schoolClass.section}`;

  const classStudents = students.filter(
    (student) => student.class === className
  );

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/dashboard/classes"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
      >
        <ArrowLeft size={18} />
        Back to Classes
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Grade {schoolClass.name}-{schoolClass.section}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View class information and enrolled students.
          </p>
        </div>

        <Link
          href={`/dashboard/classes/${schoolClass.id}/edit`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
        >
          <Pencil size={17} />
          Edit Class
        </Link>
      </div>

      {/* Class Information */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
              <Users size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Students</p>
              <p className="text-xl font-bold text-gray-900">
                {classStudents.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
              <UserRound size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Class Teacher</p>
              <p className="text-base font-semibold text-gray-900">
                {schoolClass.teacher}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
              <DoorOpen size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Room</p>
              <p className="text-xl font-bold text-gray-900">
                {schoolClass.room}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Status</p>

          <span
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
              schoolClass.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {schoolClass.status}
          </span>
        </div>
      </div>

      {/* Students */}
      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Students
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Students currently enrolled in this class.
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {classStudents.map((student) => (
            <div
              key={student.id}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-gray-900">
                  {student.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {student.email}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm font-medium text-gray-700">
                  Roll No: {student.rollNo}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {student.phone}
                </p>
              </div>
            </div>
          ))}

          {classStudents.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500">
              No students found in this class.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}