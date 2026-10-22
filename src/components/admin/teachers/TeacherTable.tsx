
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Pencil,
  Search,
  Eye,
  UserPlus,
  Trash2,
  RefreshCw,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Teacher } from "@/types/teacher";
import TeacherCard from "@/components/admin/teachers/TeacherCard";

type ApiTeacher = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  qualification: string | null;
  joiningDate: string | null;
  status: "ACTIVE" | "INACTIVE";
};

function mapApiTeacher(teacher: ApiTeacher): Teacher {
  return {
    id: teacher.id,
    name: teacher.name,
    email: teacher.email ?? "",
    phone: teacher.phone ?? "",
    subject: teacher.subject ?? "",
    qualification: teacher.qualification ?? "",
    joiningDate: teacher.joiningDate
      ? teacher.joiningDate.slice(0, 10)
      : "",
    status: teacher.status === "ACTIVE" ? "Active" : "Inactive",
  };
}

export default function TeacherTable() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const response = await apiRequest<ApiTeacher[]>("/teachers", {
        method: "GET",
        token,
      });

      setTeachers(response.map(mapApiTeacher));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load teachers from the server.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTeachers();
  }, [fetchTeachers]);

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Permanently delete ${name} (${id})?\n\n` +
        "Associated attendance records may also be deleted. " +
        "Continue?",
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      await apiRequest<ApiTeacher>(`/teachers/${encodeURIComponent(id)}`, {
        method: "DELETE",
        token,
      });

      setTeachers((currentTeachers) =>
        currentTeachers.filter((teacher) => teacher.id !== id),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete this teacher.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTeachers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) return teachers;

    return teachers.filter((teacher) =>
      [
        teacher.id,
        teacher.name,
        teacher.email,
        teacher.phone,
        teacher.subject,
        teacher.qualification,
        teacher.joiningDate,
        teacher.status ?? "",
      ].some((value) => value.toLowerCase().includes(searchValue)),
    );
  }, [teachers, search]);

  const activeCount = teachers.filter(
    (teacher) => teacher.status === "Active",
  ).length;

  const inactiveCount = teachers.filter(
    (teacher) => teacher.status === "Inactive",
  ).length;

  return (
    <div className="space-y-5">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Teachers
          </h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage teachers and their information.
          </p>
        </div>

        <Link
          href="/admin/teachers/add"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          <UserPlus size={18} />
          Add Teacher
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Teachers</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">
            {teachers.length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Active Teachers</p>
          <p className="mt-2 text-2xl font-bold text-[#01796F]">
            {activeCount}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Inactive Teachers</p>
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
              placeholder="Search by name, email, ID, subject"
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          <button
            type="button"
            onClick={() => void fetchTeachers()}
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
            onClick={() => void fetchTeachers()}
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
            Loading teachers...
          </p>
        </div>
      )}

      {/* Desktop table */}
      {!loading && (
        <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-5 py-4 font-semibold">Teacher</th>
                  <th className="px-5 py-4 font-semibold">ID</th>
                  <th className="px-5 py-4 font-semibold">Phone</th>
                  <th className="px-5 py-4 font-semibold">Subject</th>
                  <th className="px-5 py-4 font-semibold">
                    Qualification
                  </th>
                  <th className="px-5 py-4 font-semibold">Joining Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/teachers/${encodeURIComponent(teacher.id)}`}
                        className="font-semibold text-gray-800 transition hover:text-[#01796F]"
                      >
                        {teacher.name}
                      </Link>
                      <p className="mt-1 text-xs text-gray-500">
                        {teacher.email || "No email provided"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {teacher.id}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {teacher.phone || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {teacher.subject || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {teacher.qualification || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {teacher.joiningDate || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          teacher.status === "Active"
                            ? "bg-[#e6f4f2] text-[#01796F]"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {teacher.status ?? "Unknown"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/teachers/${encodeURIComponent(teacher.id)}`}
                          title="View teacher"
                          aria-label={`View ${teacher.name}`}
                          className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
                        >
                          <Eye size={17} />
                        </Link>

                        <Link
                          href={`/admin/teachers/${encodeURIComponent(teacher.id)}/edit`}
                          title="Edit teacher"
                          aria-label={`Edit ${teacher.name}`}
                          className="rounded-full p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"
                        >
                          <Pencil size={17} />
                        </Link>

                        <button
                          type="button"
                          title="Permanently delete teacher"
                          aria-label={`Delete ${teacher.name}`}
                          disabled={deletingId === teacher.id}
                          onClick={() =>
                            void handleDelete(teacher.id, teacher.name)
                          }
                          className="rounded-full p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredTeachers.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      {search
                        ? "No teachers match your search."
                        : "No teachers were returned by the backend."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
            Showing {filteredTeachers.length} of {teachers.length} teachers
          </div>
        </div>
      )}

      {/* Mobile and tablet cards */}
      {!loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="relative">
              <TeacherCard
                teacher={teacher}
                onDelete={(id, name) => void handleDelete(id, name)}
              />

              {deletingId === teacher.id && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 text-sm font-medium text-gray-700">
                  Deleting teacher...
                </div>
              )}
            </div>
          ))}

          {filteredTeachers.length === 0 && (
            <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
              {search
                ? "No teachers match your search."
                : "No teachers were returned by the backend."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
