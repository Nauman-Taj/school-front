import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import type { Assignment } from "@/types/assignment";

type AssignmentCardProps = {
  assignment: Assignment;
  onDelete: (id: string, title: string) => void;
  deleting?: boolean;
};

const statusStyles: Record<Assignment["status"], string> = {
  Pending: "bg-yellow-50 text-yellow-700",
  Submitted: "bg-[#e6f4f2] text-[#01796F]",
  Overdue: "bg-red-50 text-red-600",
};

export default function AssignmentCard({
  assignment,
  onDelete,
  deleting = false,
}: AssignmentCardProps) {
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:hidden">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
          <p className="mt-1 text-xs text-gray-500">{assignment.id}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[assignment.status]}`}
        >
          {assignment.status}
        </span>
      </div>

      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-400">Subject</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {assignment.subject}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Assigned Class</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {assignment.className}-{assignment.section}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Assigned Teacher</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {assignment.teacher}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Due Date</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {assignment.dueDate}
          </p>
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-2 border-t border-gray-100 pt-4">
        <Link
          href={`/admin/assignments/${encodeURIComponent(assignment.id)}`}
          aria-label={`View ${assignment.title}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
        >
          <Eye size={17} strokeWidth={1.8} />
        </Link>
        <Link
          href={`/admin/assignments/${encodeURIComponent(assignment.id)}/edit`}
          aria-label={`Edit ${assignment.title}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"
        >
          <Pencil size={17} strokeWidth={1.8} />
        </Link>
        <button
          type="button"
          onClick={() => onDelete(assignment.id, assignment.title)}
          disabled={deleting}
          aria-label={`Delete ${assignment.title}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={17} strokeWidth={1.8} />
        </button>
      </div>

      {deleting && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 text-sm font-medium text-gray-700">
          Deleting assignment...
        </div>
      )}
    </div>
  );
}
