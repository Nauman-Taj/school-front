import Link from "next/link";
import {
  UserRound,
  Pencil,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";

import { Teacher } from "@/types/teacher";

type TeacherCardProps = {
  teacher: Teacher;
};

export default function TeacherCard({
  teacher,
}: TeacherCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:hidden">
      {/* Teacher Info */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {teacher.name}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {teacher.id}
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {teacher.subject}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Mail size={16} className="shrink-0 text-gray-400" />
          <span className="truncate">{teacher.email}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Phone size={16} className="shrink-0 text-gray-400" />
          <span>{teacher.phone}</span>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-400">
            Qualification
          </p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {teacher.qualification}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400">
            Joining Date
          </p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {teacher.joiningDate}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex justify-center gap-2 border-t border-gray-100 pt-4">
        <Link
          href={`/dashboard/teachers/${teacher.id}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#01796f]/10 hover:text-[#01796f]"
          aria-label={`View ${teacher.name}`}
        >
          <UserRound size={17} strokeWidth={1.8} />
        </Link>

        <Link
          href={`/dashboard/teachers/${teacher.id}/edit`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#01796f]/10 hover:text-[#01796f]"
          aria-label={`Edit ${teacher.name}`}
        >
          <Pencil size={17} strokeWidth={1.8} />
        </Link>

        <button
          type="button"
          onClick={() => handleDelete(teacher.id, teacher.name)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          aria-label={`Delete ${teacher.name}`}
        >
          <Trash2 size={17} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}