import Link from "next/link";
import {
  UserRound,
  Mail,
  Pencil,
  Phone,
} from "lucide-react";

import { Student } from "@/types/student";

type StudentCardProps = {
  student: Student;
};

export default function StudentCard({
  student,
}: StudentCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
            <UserRound size={21} strokeWidth={1.8} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {student.name}
            </h3>

            <p className="mt-0.5 text-sm text-gray-500">
              Roll No. {student.rollNo}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            student.status === "Active"
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {student.status}
        </span>
      </div>

      {/* Information */}
      <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Class
          </span>

          <span className="rounded-full bg-[#01796f]/10 px-2.5 py-1 text-sm font-medium text-[#01796f]">
            {student.class}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Mail size={16} className="shrink-0 text-gray-400" />
          <span className="truncate">{student.email}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Phone size={16} className="shrink-0 text-gray-400" />
          <span>{student.phone}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Parent / Guardian
          </span>

          <span className="font-medium text-gray-900">
            {student.parentName}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">
        <Link
          href={`/dashboard/students/${student.id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:bg-[#01796f]/10 hover:text-[#01796f]"
        >
          <UserRound size={17} strokeWidth={1.8} />
          View Profile
        </Link>

        <Link
          href={`/dashboard/students/${student.id}/edit`}
          className="flex items-center justify-center rounded-full border border-gray-200 px-3 py-2.5 text-gray-500 transition hover:border-[#01796f] hover:bg-[#01796f]/10 hover:text-[#01796f]"
          aria-label={`Edit ${student.name}`}
        >
          <Pencil size={17} strokeWidth={1.8} />
        </Link>
      </div>
    </div>
  );
}