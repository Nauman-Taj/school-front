
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import type { Subject } from "@/types/subject";

type SubjectCardProps = {
  subject: Subject;
  onDelete: (id: string, name: string) => void;
};

export default function SubjectCard({
  subject,
  onDelete,
}: SubjectCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:hidden">
      {/* Subject Info */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-gray-900">
              {subject.name}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {subject.id}
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {subject.code}
          </span>
        </div>
      </div>

      {/* Subject Details */}
      <div className="space-y-2 border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-400">Assigned Class</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {subject.className}-{subject.section}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Assigned Teacher</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {subject.teacher}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <p className="text-xs text-gray-400">Status</p>

        <span
          className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            subject.status === "Active"
              ? "bg-[#e6f4f2] text-[#01796F]"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {subject.status}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-5 flex justify-center gap-2 border-t border-gray-100 pt-4">
        <Link
          href={`/admin/subjects/${encodeURIComponent(subject.id)}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
          aria-label={`View ${subject.name}`}
        >
          <Eye size={17} strokeWidth={1.8} />
        </Link>

        <Link
          href={`/admin/subjects/${encodeURIComponent(subject.id)}/edit`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
          aria-label={`Edit ${subject.name}`}
        >
          <Pencil size={17} strokeWidth={1.8} />
        </Link>

        <button
          type="button"
          onClick={() => onDelete(subject.id, subject.name)}
          className="flex items-center justify-center rounded-xl border-gray-200 px-3 py-2.5 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          aria-label={`Delete ${subject.name}`}
        >
          <Trash2 size={17} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
