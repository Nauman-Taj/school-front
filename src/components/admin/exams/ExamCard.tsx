import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import type { Exam } from "@/types/exam";

type ExamCardProps = {
  exam: Exam;
  onDelete: (id: string, name: string) => void;
  deleting?: boolean;
};

const statusStyles: Record<Exam["status"], string> = {
  Upcoming: "bg-blue-50 text-blue-700",
  Completed: "bg-[#e6f4f2] text-[#01796F]",
};

export default function ExamCard({
  exam,
  onDelete,
  deleting = false,
}: ExamCardProps) {
  const section = exam.sections?.[0]?.section ?? exam.section;

  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:hidden">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">{exam.name}</h3>
          <p className="mt-1 text-xs text-gray-500">{exam.id}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[exam.status]}`}
        >
          {exam.status}
        </span>
      </div>

      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-400">Subject</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {exam.subject}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Assigned Class</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {exam.className}-{section}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Assigned Teacher</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {exam.teacher}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400">Exam Date</p>
            <p className="mt-1 text-sm font-medium text-gray-700">
              {exam.examDate}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Total Marks</p>
            <p className="mt-1 text-sm font-medium text-gray-700">
              {exam.totalMarks}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-2 border-t border-gray-100 pt-4">
        <Link
          href={`/admin/exams/${encodeURIComponent(exam.id)}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
          aria-label={`View ${exam.name}`}
        >
          <Eye size={17} strokeWidth={1.8} />
        </Link>
        <Link
          href={`/admin/exams/${encodeURIComponent(exam.id)}/edit`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"
          aria-label={`Edit ${exam.name}`}
        >
          <Pencil size={17} strokeWidth={1.8} />
        </Link>
        <button
          type="button"
          onClick={() => onDelete(exam.id, exam.name)}
          disabled={deleting}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`Delete ${exam.name}`}
        >
          <Trash2 size={17} strokeWidth={1.8} />
        </button>
      </div>

      {deleting && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 text-sm font-medium text-gray-700">
          Deleting exam...
        </div>
      )}
    </div>
  );
}
