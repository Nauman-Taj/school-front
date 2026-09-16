import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Pencil,
  BookOpen,
  GraduationCap,
  CalendarDays,
} from "lucide-react";

import { teachers } from "@/data/teachers";
import { Teacher } from "@/types/teacher";
type TeacherDetailsProps = {
  teacherId: string;
};

export default function TeacherDetails({
  teacherId,
}: TeacherDetailsProps) {
  const teacher = teachers.find(
    (teacher) => teacher.id === teacherId
  );

  if (!teacher) {
    return null;
  }
  return (
    <div className="space-y-5">

      {/* Back */}
      <Link
        href="/dashboard/teachers"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
      >
        <ArrowLeft size={17} />
        Back to Teachers
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
                {teacher.name}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Teacher ID {teacher.id} · {teacher.subject}
              </p>
            </div>
          </div>

          <Link
            href={`/dashboard/teachers/${teacher.id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
          >
            <Pencil size={17} />
            Edit Teacher
          </Link>
        </div>
      </div>

      {/* Teacher Information */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Professional Information */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Professional Information
          </h2>

          <div className="mt-5 divide-y divide-gray-100">
            <InfoRow
              label="Teacher ID"
              value={teacher.id}
            />

            <InfoRow
              label="Subject"
              value={teacher.subject}
            />

            <InfoRow
              label="Qualification"
              value={teacher.qualification}
            />

            <InfoRow
              label="Joining Date"
              value={teacher.joiningDate}
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
                  {teacher.email}
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
                  {teacher.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-full bg-gray-50 p-2 text-gray-500">
                <BookOpen size={18} />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Subject
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {teacher.subject}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-full bg-gray-50 p-2 text-gray-500">
                <GraduationCap size={18} />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Qualification
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {teacher.qualification}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-full bg-gray-50 p-2 text-gray-500">
                <CalendarDays size={18} />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Joining Date
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {teacher.joiningDate}
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
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-gray-900">
        {value}
      </span>
    </div>
  );
}