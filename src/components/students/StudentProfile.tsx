import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Pencil,
} from "lucide-react";

import { Student } from "@/types/student";

type StudentProfileProps = {
  student: Student;
};

export default function StudentProfile({
  student,
}: StudentProfileProps) {
  return (
    <div className="space-y-6">

      {/* Back */}
      <Link
        href="/dashboard/students"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
      >
        <ArrowLeft size={17} />
        Back to Students
      </Link>

      {/* Profile Header */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
              <User size={30} strokeWidth={1.7} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {student.name}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Roll No. {student.rollNo} · Class {student.class}
              </p>
            </div>
          </div>

          <Link
            href={`/dashboard/students/${student.id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
          >
            <Pencil size={17} />
            Edit Student
          </Link>
        </div>
      </div>

      {/* Student Information */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Academic Information */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Academic Information
          </h2>

          <div className="mt-5 divide-y divide-gray-100">
            <InfoRow
              label="Roll Number"
              value={student.rollNo}
            />

            <InfoRow
              label="Class"
              value={student.class}
            />

            <InfoRow
              label="Status"
              value={student.status}
              status
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Contact Information
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex items-start gap-3">
              <div className="rounded-full bg-gray-50 p-2 text-gray-500">
                <Mail size={18} />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {student.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-full bg-gray-50 p-2 text-gray-500">
                <Phone size={18} />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Phone
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {student.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-full bg-gray-50 p-2 text-gray-500">
                <User size={18} />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Parent / Guardian
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {student.parentName}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  status = false,
}: {
  label: string;
  value: string;
  status?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      {status ? (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            value === "Active"
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {value}
        </span>
      ) : (
        <span className="text-sm font-medium text-gray-900">
          {value}
        </span>
      )}
    </div>
  );
}