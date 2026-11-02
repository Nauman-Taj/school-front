"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";

import ExamCard from "@/components/admin/exams/ExamCard";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Exam } from "@/types/exam";

type ApiExam = Omit<Exam, "status"> & { status: string };

function mapApiExam(exam: ApiExam): Exam {
  return {
    ...exam,
    status:
      exam.status === "COMPLETED" || exam.status === "Completed"
        ? "Completed"
        : "Upcoming",
  };
}

const statusStyles: Record<Exam["status"], string> = {
  Upcoming: "bg-blue-50 text-blue-700",
  Completed: "bg-[#e6f4f2] text-[#01796F]",
};

export default function ExamTable() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchExams = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const response = await apiRequest<ApiExam[]>("/exams", {
        method: "GET",
        token,
      });
      setExams(response.map(mapApiExam));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load exams from the server.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchExams();
  }, [fetchExams]);

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Permanently delete ${name} (${id})?\n\nContinue?`,
    );
    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      await apiRequest<Exam>(`/exams/${encodeURIComponent(id)}`, {
        method: "DELETE",
        token,
      });
      setExams((current) => current.filter((exam) => exam.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete this exam.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredExams = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    if (!searchValue) return exams;

    return exams.filter((exam) =>
      [
        exam.id,
        exam.name,
        exam.subject,
        exam.className,
        exam.sections?.[0]?.section ?? exam.section,
        exam.teacher,
        exam.examDate,
        exam.status,
      ].some((value) => value.toLowerCase().includes(searchValue)),
    );
  }, [exams, search]);

  const upcomingCount = exams.filter(
    (exam) => exam.status === "Upcoming",
  ).length;
  const completedCount = exams.filter(
    (exam) => exam.status === "Completed",
  ).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Exams
          </h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage examinations and assessment schedules.
          </p>
        </div>

        <Link
          href="/admin/exams/add"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          <Plus size={18} />
          Add Exam
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Exams</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">
            {exams.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Upcoming Exams</p>
          <p className="mt-2 text-2xl font-bold text-[#01796F]">
            {upcomingCount}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Completed Exams</p>
          <p className="mt-2 text-2xl font-bold text-gray-600">
            {completedCount}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by exam, subject, class, teacher"
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>
          <button
            type="button"
            onClick={() => void fetchExams()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void fetchExams()}
            className="self-start rounded-full border border-red-200 px-4 py-2 font-medium transition hover:bg-red-100 sm:self-auto"
          >
            Try again
          </button>
        </div>
      )}

      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">Loading exams...</p>
        </div>
      )}

      {!loading && (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Exam</th>
                    <th className="px-5 py-4 font-semibold">Subject</th>
                    <th className="px-5 py-4 font-semibold">Class</th>
                    <th className="px-5 py-4 font-semibold">
                      Assigned Teacher
                    </th>
                    <th className="px-5 py-4 font-semibold">Exam Date</th>
                    <th className="px-5 py-4 font-semibold">Total Marks</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredExams.map((exam) => (
                    <tr key={exam.id} className="transition hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/exams/${encodeURIComponent(exam.id)}`}
                          className="font-semibold text-gray-800 transition hover:text-[#01796F]"
                        >
                          {exam.name}
                        </Link>
                        <p className="mt-1 text-xs text-gray-500">{exam.id}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {exam.subject}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {exam.className}-
                        {exam.sections?.[0]?.section ?? exam.section}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {exam.teacher}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {exam.examDate}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {exam.totalMarks}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[exam.status]}`}
                        >
                          {exam.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/exams/${encodeURIComponent(exam.id)}`}
                            title="View exam"
                            aria-label={`View ${exam.name}`}
                            className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
                          >
                            <Eye size={17} />
                          </Link>
                          <Link
                            href={`/admin/exams/${encodeURIComponent(exam.id)}/edit`}
                            title="Edit exam"
                            aria-label={`Edit ${exam.name}`}
                            className="rounded-full p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"
                          >
                            <Pencil size={17} />
                          </Link>
                          <button
                            type="button"
                            title="Delete exam"
                            aria-label={`Delete ${exam.name}`}
                            disabled={deletingId === exam.id}
                            onClick={() =>
                              void handleDelete(exam.id, exam.name)
                            }
                            className="rounded-full p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredExams.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-5 py-12 text-center text-gray-500"
                      >
                        {search.trim()
                          ? "No exams match your search."
                          : "No exams were returned by the backend."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
              Showing {filteredExams.length} of {exams.length} exams
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {filteredExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onDelete={(id, name) => void handleDelete(id, name)}
                deleting={deletingId === exam.id}
              />
            ))}
            {filteredExams.length === 0 && (
              <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
                {search.trim()
                  ? "No exams match your search."
                  : "No exams were returned by the backend."}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
