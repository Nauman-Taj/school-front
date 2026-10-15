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
import type { Student } from "@/types/student";
import StudentCard from "@/components/admin/students/StudentCard";

type ApiStudent = {
  id: number;
  name: string;
  email: string | null;
  className: string;
  section: string;
  rollNo: string;
  parentName: string | null;
  phone: string | null;
  status: "ACTIVE" | "INACTIVE";
};

function mapApiStudent(student: ApiStudent): Student {
  return {
    id: student.id,
    name: student.name,
    email: student.email ?? "",
    className: student.className,
    section: student.section,
    rollNo: student.rollNo,
    parentName: student.parentName ?? "",
    phone: student.phone ?? "",
    status: student.status === "ACTIVE" ? "Active" : "Inactive",
  };
}

export default function StudentTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const response = await apiRequest<ApiStudent[]>("/students", {
        method: "GET",
        token,
      });

      setStudents(response.map(mapApiStudent));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load students from the server.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStudents();
  }, [fetchStudents]);

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to mark ${name} as inactive?`,
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      await apiRequest<ApiStudent>(`/students/${id}`, {
        method: "DELETE",
        token,
      });

      // The backend uses a soft delete, so keep the student in the list.
      setStudents((currentStudents) =>
        currentStudents.map((student) =>
          student.id === id ? { ...student, status: "Inactive" } : student,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update this student's status.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredStudents = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) return students;

    return students.filter((student) =>
      [
        student.name,
        student.email,
        student.className,
        student.section,
        student.rollNo,
        student.parentName,
        student.phone,
        student.status,
      ].some((value) => value.toLowerCase().includes(searchValue)),
    );
  }, [students, search]);

  return (
    <div className="space-y-5">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Students</h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage student records and their information.
          </p>
        </div>

        <Link
          href="/admin/students/add"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          <UserPlus size={18} />
          Add Student
        </Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">
            {students.length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Active Students</p>
          <p className="mt-2 text-2xl font-bold text-[#01796F]">
            {students.filter((student) => student.status === "Active").length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Inactive Students</p>
          <p className="mt-2 text-2xl font-bold text-gray-600">
            {students.filter((student) => student.status === "Inactive").length}
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
              placeholder="Search by name, email, class, roll number"
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          <button
            type="button"
            onClick={() => void fetchStudents()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
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
            onClick={() => void fetchStudents()}
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
          <p className="mt-4 text-sm text-gray-500">Loading students...</p>
        </div>
      )}

      {/* Desktop table */}
      {!loading && (
        <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-5 py-4 font-semibold">Student</th>
                  <th className="px-5 py-4 font-semibold">Roll No.</th>
                  <th className="px-5 py-4 font-semibold">Class</th>
                  <th className="px-5 py-4 font-semibold">Parent</th>
                  <th className="px-5 py-4 font-semibold">Phone</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/students/${student.id}`}
                        className="font-semibold text-gray-800 transition hover:text-[#01796F]"
                      >
                        {student.name}
                      </Link>
                      <p className="mt-1 text-xs text-gray-500">
                        {student.email || "No email provided"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.rollNo}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.className}-{student.section}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.parentName || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.phone || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          student.status === "Active"
                            ? "bg-[#e6f4f2] text-[#01796F]"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/students/${student.id}`}
                          title="View student"
                          aria-label={`View ${student.name}`}
                          className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
                        >
                          <Eye size={17} />
                        </Link>

                        <Link
                          href={`/admin/students/${student.id}/edit`}
                          title="Edit student"
                          aria-label={`Edit ${student.name}`}
                          className="rounded-full p-2 text-gray-500 transition hover:text-blue-500 hover:bg-blue-50"
                        >
                          <Pencil size={17} />
                        </Link>

                        <button
                          type="button"
                          title="Mark student inactive"
                          aria-label={`Mark ${student.name} inactive`}
                          disabled={
                            deletingId === student.id ||
                            student.status === "Inactive"
                          }
                          onClick={() =>
                            void handleDelete(student.id, student.name)
                          }
                          className="rounded-full p-2 text-gray-500  transition hover:text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      {search
                        ? "No students match your search."
                        : "No students were returned by the backend."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile and tablet cards */}
      {!loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {filteredStudents.map((student) => (
            <div key={student.id} className="relative">
              <StudentCard
                student={student}
                onDelete={handleDelete}
              />

              {deletingId === student.id && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 text-sm font-medium text-gray-700">
                  Updating status...
                </div>
              )}
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
              {search
                ? "No students match your search."
                : "No students were returned by the backend."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}