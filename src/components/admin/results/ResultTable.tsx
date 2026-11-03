"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";

import ResultCard from "@/components/admin/results/ResultCard";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Result } from "@/types/result";

export default function ResultTable() {
  const [results, setResults] = useState<Result[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchResults = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const response = await apiRequest<Result[]>("/results", {
        method: "GET",
        token,
      });
      setResults(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load results.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchResults();
  }, [fetchResults]);

  const handleDelete = async (id: string, student: string) => {
    const confirmed = window.confirm(
      `Permanently delete ${student}'s result (${id})?\n\nContinue?`,
    );
    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      await apiRequest<Result>(`/results/${encodeURIComponent(id)}`, {
        method: "DELETE",
        token,
      });
      setResults((current) =>
        current.filter((result) => result.id !== id),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete this result.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredResults = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    if (!searchValue) return results;

    return results.filter((result) =>
      [
        result.id,
        result.student,
        result.rollNo ?? "",
        result.className,
        result.section,
        result.exam ?? "",
        result.subject,
        result.teacher,
        result.grade,
        result.status,
      ].some((value) => value.toLowerCase().includes(searchValue)),
    );
  }, [results, search]);

  const passedCount = results.filter(
    (result) => result.status === "Pass",
  ).length;
  const failedCount = results.length - passedCount;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Results
          </h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            View and manage student examination results.
          </p>
        </div>

        <Link
          href="/admin/results/add"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          <Plus size={18} />
          Add Result
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Results</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">
            {results.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Passed</p>
          <p className="mt-2 text-2xl font-bold text-[#01796F]">
            {passedCount}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Failed</p>
          <p className="mt-2 text-2xl font-bold text-gray-600">
            {failedCount}
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
              placeholder="Search by student, exam, class, or subject"
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>
          <button
            type="button"
            onClick={() => void fetchResults()}
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
            onClick={() => void fetchResults()}
            className="self-start rounded-full border border-red-200 px-4 py-2 font-medium transition hover:bg-red-100 sm:self-auto"
          >
            Try again
          </button>
        </div>
      )}

      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">Loading results...</p>
        </div>
      )}

      {!loading && (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Student</th>
                    <th className="px-5 py-4 font-semibold">Class</th>
                    <th className="px-5 py-4 font-semibold">Exam / Subject</th>
                    <th className="px-5 py-4 font-semibold">Marks</th>
                    <th className="px-5 py-4 font-semibold">Percentage</th>
                    <th className="px-5 py-4 font-semibold">Grade</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredResults.map((result) => (
                    <tr
                      key={result.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/results/${encodeURIComponent(result.id)}`}
                          className="font-semibold text-gray-800 transition hover:text-[#01796F]"
                        >
                          {result.student}
                        </Link>
                        <p className="mt-1 text-xs text-gray-500">
                          Roll {result.rollNo ?? "—"} · {result.id}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {result.className}-{result.section}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-700">
                          {result.exam ?? "—"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {result.subject}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {result.obtainedMarks}/{result.totalMarks}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {result.percentage}%
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {result.grade}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${result.status === "Pass" ? "bg-[#e6f4f2] text-[#01796F]" : "bg-red-50 text-red-600"}`}
                        >
                          {result.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/results/${encodeURIComponent(result.id)}`}
                            title="View result"
                            aria-label={`View ${result.student}'s result`}
                            className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
                          >
                            <Eye size={17} />
                          </Link>
                          <Link
                            href={`/admin/results/${encodeURIComponent(result.id)}/edit`}
                            title="Edit result"
                            aria-label={`Edit ${result.student}'s result`}
                            className="rounded-full p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"
                          >
                            <Pencil size={17} />
                          </Link>
                          <button
                            type="button"
                            title="Delete result"
                            aria-label={`Delete ${result.student}'s result`}
                            disabled={deletingId === result.id}
                            onClick={() =>
                              void handleDelete(result.id, result.student)
                            }
                            className="rounded-full p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredResults.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-5 py-12 text-center text-gray-500"
                      >
                        {search.trim()
                          ? "No results match your search."
                          : "No results were returned by the backend."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
              Showing {filteredResults.length} of {results.length} results
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {filteredResults.map((result) => (
              <ResultCard
                key={result.id}
                result={result}
                onDelete={(id, student) => void handleDelete(id, student)}
                deleting={deletingId === result.id}
              />
            ))}
            {filteredResults.length === 0 && (
              <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
                {search.trim()
                  ? "No results match your search."
                  : "No results were returned by the backend."}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
