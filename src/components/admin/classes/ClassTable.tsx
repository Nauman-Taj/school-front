
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Pencil,
  Search,
  Eye,
  Trash2,
  RefreshCw,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { SchoolClass } from "@/types/class";
import ClassCard from "@/components/admin/classes/ClassCard";

type ApiSchoolClass = {
  id: number;
  name: string;
  section: string;
  teacherId: string;
  teacher: string;
  room: string;
  status: "ACTIVE" | "INACTIVE" | "Active" | "Inactive";
  studentCount?: number;
};

export type ClassTableRow = SchoolClass & {
  studentCount: number;
};

function mapApiClass(data: ApiSchoolClass): ClassTableRow {
  return {
    id: data.id,
    name: data.name,
    section: data.section,
    teacherId: data.teacherId,
    teacher: data.teacher,
    room: data.room,
    status:
      data.status === "INACTIVE" || data.status === "Inactive"
        ? "Inactive"
        : "Active",
    studentCount: data.studentCount ?? 0,
  };
}

export default function ClassTable() {
  const [search, setSearch] = useState("");
  const [classList, setClassList] = useState<ClassTableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadClasses = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const response = await apiRequest<ApiSchoolClass[]>("/classes", {
        method: "GET",
        token,
      });

      setClassList(response.map(mapApiClass));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load classes from the server.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadClasses();
  }, [loadClasses]);


  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Permanently delete ${name}? Classes with assigned students cannot be deleted.`,
    );

    if (!confirmed) return;

    setError("");
    setDeletingId(id);

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      await apiRequest<unknown>(`/classes/${id}`, {
        method: "DELETE",
        token,
      });

      setClassList((currentClasses) =>
        currentClasses.filter((schoolClass) => schoolClass.id !== id),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete this class.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredClasses = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) return classList;

    return classList.filter((schoolClass) =>
      [
        schoolClass.name,
        schoolClass.section,
        schoolClass.teacher,
        schoolClass.teacherId,
        schoolClass.room,
        schoolClass.status,
      ].some((value) => value.toLowerCase().includes(searchValue)),
    );
  }, [classList, search]);

  return (
    <div className="space-y-5">

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
              placeholder="Search by class, section, teacher, room"
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          <button
            type="button"
            onClick={() => void loadClasses()}
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

          <div className="flex flex-wrap items-center gap-2">
            {error.toLowerCase().includes("session has expired") && (
              <Link
                href="/login"
                className="rounded-full border border-red-200 px-4 py-2 font-medium transition hover:bg-red-100"
              >
                Log In
              </Link>
            )}

            <button
              type="button"
              onClick={() => void loadClasses()}
              disabled={loading}
              className="rounded-full border border-red-200 px-4 py-2 font-medium transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />

          <p className="mt-4 text-sm text-gray-500">
            Loading classes...
          </p>
        </div>
      )}

      {/* Desktop table */}
      {!loading && (
        <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-5 py-4 font-semibold">Class</th>
                  <th className="px-5 py-4 font-semibold">Section</th>
                  <th className="px-5 py-4 font-semibold">Class Teacher</th>
                  <th className="px-5 py-4 font-semibold">Students</th>
                  <th className="px-5 py-4 font-semibold">Room</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredClasses.map((schoolClass) => (
                  <tr
                    key={schoolClass.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/classes/${schoolClass.id}`}
                        className="font-semibold text-gray-800 transition hover:text-[#01796F]"
                      >
                        {schoolClass.name}
                      </Link>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {schoolClass.section}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {schoolClass.teacher}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {schoolClass.studentCount}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {schoolClass.room}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          schoolClass.status === "Active"
                            ? "bg-[#e6f4f2] text-[#01796F]"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {schoolClass.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/classes/${schoolClass.id}`}
                          title="View class"
                          aria-label={`View ${schoolClass.name} section ${schoolClass.section}`}
                          className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
                        >
                          <Eye size={17} />
                        </Link>

                        <Link
                          href={`/admin/classes/${schoolClass.id}/edit`}
                          title="Edit class"
                          aria-label={`Edit ${schoolClass.name} section ${schoolClass.section}`}
                          className="rounded-full p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"
                        >
                          <Pencil size={17} />
                        </Link>

                        <button
                          type="button"
                          title="Permanently delete class"
                          aria-label={`Permanently delete ${schoolClass.name} section ${schoolClass.section}`}
                          disabled={deletingId !== null}
                          onClick={() =>
                            void handleDelete(
                              schoolClass.id,
                              `${schoolClass.name}-${schoolClass.section}`,
                            )
                          }
                          className="rounded-full p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredClasses.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      {search.trim()
                        ? "No classes match your search."
                        : "No classes were returned by the backend."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
            Showing {filteredClasses.length} of {classList.length} classes
          </div>
        </div>
      )}

      {/* Mobile and tablet cards */}
      {!loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {filteredClasses.map((schoolClass) => (
            <div key={schoolClass.id} className="relative">
              <ClassCard
                schoolClass={schoolClass}
                onDelete={handleDelete}
                deleting={deletingId === schoolClass.id}
              />
            </div>
          ))}

          {filteredClasses.length === 0 && (
            <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
              {search.trim()
                ? "No classes match your search."
                : "No classes were returned by the backend."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
