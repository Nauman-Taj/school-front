import Link from 'next/link';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { Result } from '@/types/result';

type ResultCardProps = {
  result: Result;
  onDelete: (id: string, student: string) => void | Promise<void>;
  deleting?: boolean;
};

export default function ResultCard({
  result,
  onDelete,
  deleting = false,
}: ResultCardProps) {
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:hidden">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">{result.student}</h3>
          <p className="mt-1 text-xs text-gray-500">
            {result.id} · Roll no. {result.rollNo ?? "—"}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${result.status === 'Pass' ? 'bg-[#e6f4f2] text-[#01796F]' : 'bg-red-50 text-red-600'}`}>{result.status}</span>
      </div>
      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-400">Assigned Class</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {result.className}-{result.section}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Exam</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {result.exam ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Subject</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {result.subject}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Assigned Teacher</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {result.teacher}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400">Marks</p>
            <p className="mt-1 text-sm font-medium text-gray-700">
              {result.obtainedMarks}/{result.totalMarks}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Percentage · Grade</p>
            <p className="mt-1 text-sm font-medium text-gray-700">
              {result.percentage}% · {result.grade}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-2 border-t border-gray-100 pt-4">
        <Link
          href={`/admin/results/${encodeURIComponent(result.id)}`}
          aria-label={`View ${result.student}'s result`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
        >
          <Eye size={17} strokeWidth={1.8} />
        </Link>
        <Link
          href={`/admin/results/${encodeURIComponent(result.id)}/edit`}
          aria-label={`Edit ${result.student}'s result`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"
        >
          <Pencil size={17} strokeWidth={1.8} />
        </Link>
        <button
          type="button"
          onClick={() => onDelete(result.id, result.student)}
          disabled={deleting}
          aria-label={`Delete ${result.student}'s result`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={17} strokeWidth={1.8} />
        </button>
      </div>
      {deleting && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 text-sm font-medium text-gray-700">
          Deleting result...
        </div>
      )}
    </div>
  );
}
