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

import AssignmentCard from "@/components/admin/assignments/AssignmentCard";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Assignment } from "@/types/assignment";

type ApiAssignment = Omit<Assignment, "status"> & { status: string };

function mapApiAssignment(assignment: ApiAssignment): Assignment {
  const status = assignment.status.toUpperCase();
  return {
    ...assignment,
    status:
      status === "SUBMITTED"
        ? "Submitted"
        : status === "OVERDUE"
          ? "Overdue"
          : "Pending",
  };
}

const statusStyles: Record<Assignment["status"], string> = {
  Pending: "bg-yellow-50 text-yellow-700",
  Submitted: "bg-[#e6f4f2] text-[#01796F]",
  Overdue: "bg-red-50 text-red-600",
};

export default function AssignmentTable() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAssignments = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }
      const response = await apiRequest<ApiAssignment[]>("/assignments", {
        method: "GET",
        token,
      });
      setAssignments(response.map(mapApiAssignment));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load assignments.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAssignments();
  }, [fetchAssignments]);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Permanently delete ${title} (${id})?\n\nContinue?`,
    );
    if (!confirmed) return;

    setDeletingId(id);
    setError("");
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }
      await apiRequest<Assignment>(`/assignments/${encodeURIComponent(id)}`, {
        method: "DELETE",
        token,
      });
      setAssignments((current) =>
        current.filter((assignment) => assignment.id !== id),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete this assignment.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredAssignments = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    if (!searchValue) return assignments;
    return assignments.filter((assignment) =>
      [
        assignment.id,
        assignment.title,
        assignment.subject,
        assignment.className,
        assignment.section,
        assignment.teacher,
        assignment.dueDate,
        assignment.status,
      ].some((value) => value.toLowerCase().includes(searchValue)),
    );
  }, [assignments, search]);

  const pendingCount = assignments.filter(
    (assignment) => assignment.status === "Pending",
  ).length;
  const overdueCount = assignments.filter(
    (assignment) => assignment.status === "Overdue",
  ).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Assignments
          </h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage class assignments and due dates.
          </p>
        </div>
        <Link
          href="/admin/assignments/add"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          <Plus size={18} />
          Add Assignment
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Assignments</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">
            {assignments.length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="mt-2 text-2xl font-bold text-[#01796F]">
            {pendingCount}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Overdue</p>
          <p className="mt-2 text-2xl font-bold text-gray-600">
            {overdueCount}
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
              placeholder="Search by assignment, subject, class, or teacher"
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>
          <button
            type="button"
            onClick={() => void fetchAssignments()}
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
            onClick={() => void fetchAssignments()}
            className="self-start rounded-full border border-red-200 px-4 py-2 font-medium transition hover:bg-red-100 sm:self-auto"
          >
            Try again
          </button>
        </div>
      )}

      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">Loading assignments...</p>
        </div>
      )}

      {!loading && (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Assignment</th>
                    <th className="px-5 py-4 font-semibold">Subject</th>
                    <th className="px-5 py-4 font-semibold">Class</th>
                    <th className="px-5 py-4 font-semibold">
                      Assigned Teacher
                    </th>
                    <th className="px-5 py-4 font-semibold">Due Date</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAssignments.map((assignment) => (
                    <tr
                      key={assignment.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/assignments/${encodeURIComponent(assignment.id)}`}
                          className="font-semibold text-gray-800 transition hover:text-[#01796F]"
                        >
                          {assignment.title}
                        </Link>
                        <p className="mt-1 text-xs text-gray-500">
                          {assignment.id}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {assignment.subject}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {assignment.className}-{assignment.section}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {assignment.teacher}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {assignment.dueDate}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[assignment.status]}`}
                        >
                          {assignment.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/assignments/${encodeURIComponent(assignment.id)}`}
                            title="View assignment"
                            aria-label={`View ${assignment.title}`}
                            className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
                          >
                            <Eye size={17} />
                          </Link>
                          <Link
                            href={`/admin/assignments/${encodeURIComponent(assignment.id)}/edit`}
                            title="Edit assignment"
                            aria-label={`Edit ${assignment.title}`}
                            className="rounded-full p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"
                          >
                            <Pencil size={17} />
                          </Link>
                          <button
                            type="button"
                            title="Delete assignment"
                            aria-label={`Delete ${assignment.title}`}
                            disabled={deletingId === assignment.id}
                            onClick={() =>
                              void handleDelete(assignment.id, assignment.title)
                            }
                            className="rounded-full p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredAssignments.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center text-gray-500"
                      >
                        {search.trim()
                          ? "No assignments match your search."
                          : "No assignments were returned by the backend."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
              Showing {filteredAssignments.length} of {assignments.length}{" "}
              assignments
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onDelete={(id, title) => void handleDelete(id, title)}
                deleting={deletingId === assignment.id}
              />
            ))}
            {filteredAssignments.length === 0 && (
              <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
                {search.trim()
                  ? "No assignments match your search."
                  : "No assignments were returned by the backend."}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
