
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Pencil,
  Search,
  Eye,
  Plus,
  Trash2,
  RefreshCw,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Subject } from "@/types/subject";
import SubjectCard from "@/components/admin/subjects/SubjectCard";

type ApiSubject = {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  teacher?: string | { id?: string; name?: string } | null;
  className?: string;
  section?: string;
  schoolClass?: {
    name?: string;
    section?: string;
  } | null;
  status: "ACTIVE" | "INACTIVE";
};

function mapApiSubject(subject: ApiSubject): Subject {
  const teacherName =
    typeof subject.teacher === "string"
      ? subject.teacher
      : subject.teacher?.name || subject.teacherId;

  return {
    id: subject.id,
    name: subject.name,
    code: subject.code,
    teacherId: subject.teacherId,
    teacher: teacherName,
    className: subject.schoolClass?.name || subject.className || "",
    section: subject.schoolClass?.section || subject.section || "",
    status: subject.status === "ACTIVE" ? "Active" : "Inactive",
  };
}

export default function SubjectTable() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSubjects = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const response = await apiRequest<ApiSubject[]>("/subjects", {
        method: "GET",
        token,
      });

      setSubjects(response.map(mapApiSubject));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load subjects from the server.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSubjects();
  }, [fetchSubjects]);

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

      await apiRequest<ApiSubject>(
        `/subjects/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          token,
        },
      );

      setSubjects((currentSubjects) =>
        currentSubjects.filter((subject) => subject.id !== id),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete this subject.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredSubjects = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) return subjects;

    return subjects.filter((subject) =>
      [
        subject.id,
        subject.name,
        subject.code,
        subject.teacher,
        subject.className,
        subject.section,
        subject.status ?? "",
      ].some((value) => value.toLowerCase().includes(searchValue)),
    );
  }, [subjects, search]);

  const activeCount = subjects.filter(
    (subject) => subject.status === "Active",
  ).length;

  const inactiveCount = subjects.filter(
    (subject) => subject.status === "Inactive",
  ).length;

  return (
    <div className="space-y-5">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Subjects
          </h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage school subjects and their assigned teachers.
          </p>
        </div>

        <Link
          href="/admin/subjects/add"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          <Plus size={18} />
          Add Subject
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Subjects</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">
            {subjects.length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Active Subjects</p>
          <p className="mt-2 text-2xl font-bold text-[#01796F]">
            {activeCount}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Inactive Subjects</p>
          <p className="mt-2 text-2xl font-bold text-gray-600">
            {inactiveCount}
          </p>
        </div>
      </div>

      {/* Search and refresh */}
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
              placeholder="Search by name, code, class, teacher"
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          <button
            type="button"
            onClick={() => void fetchSubjects()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={() => void fetchSubjects()}
            className="self-start rounded-full border border-red-200 px-4 py-2 font-medium transition hover:bg-red-100 sm:self-auto"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading subjects...
          </p>
        </div>
      )}

      {/* Desktop table */}
      {!loading && (
        <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-5 py-4 font-semibold">Subject</th>
                  <th className="px-5 py-4 font-semibold">Code</th>
                  <th className="px-5 py-4 font-semibold">Class</th>
                  <th className="px-5 py-4 font-semibold">
                    Assigned Teacher
                  </th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredSubjects.map((subject) => (
                  <tr
                    key={subject.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/subjects/${encodeURIComponent(subject.id)}`}
                        className="font-semibold text-gray-800 transition hover:text-[#01796F]"
                      >
                        {subject.name}
                      </Link>
                      <p className="mt-1 text-xs text-gray-500">
                        {subject.id}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {subject.code}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {subject.className}-{subject.section}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {subject.teacher}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          subject.status === "Active"
                            ? "bg-[#e6f4f2] text-[#01796F]"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {subject.status ?? "Unknown"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/subjects/${encodeURIComponent(subject.id)}`}
                          title="View subject"
                          aria-label={`View ${subject.name}`}
                          className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
                        >
                          <Eye size={17} />
                        </Link>

                        <Link
                          href={`/admin/subjects/${encodeURIComponent(subject.id)}/edit`}
                          title="Edit subject"
                          aria-label={`Edit ${subject.name}`}
                          className="rounded-full p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"
                        >
                          <Pencil size={17} />
                        </Link>

                        <button
                          type="button"
                          title="Permanently delete subject"
                          aria-label={`Delete ${subject.name}`}
                          disabled={deletingId === subject.id}
                          onClick={() =>
                            void handleDelete(subject.id, subject.name)
                          }
                          className="rounded-full p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredSubjects.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      {search
                        ? "No subjects match your search."
                        : "No subjects were returned by the backend."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
            Showing {filteredSubjects.length} of {subjects.length} subjects
          </div>
        </div>
      )}

      {/* Mobile and tablet cards */}
      {!loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {filteredSubjects.map((subject) => (
            <div key={subject.id} className="relative">
              <SubjectCard
                subject={subject}
                onDelete={(id, name) => void handleDelete(id, name)}
              />

              {deletingId === subject.id && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 text-sm font-medium text-gray-700">
                  Deleting subject...
                </div>
              )}
            </div>
          ))}

          {filteredSubjects.length === 0 && (
            <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
              {search
                ? "No subjects match your search."
                : "No subjects were returned by the backend."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
