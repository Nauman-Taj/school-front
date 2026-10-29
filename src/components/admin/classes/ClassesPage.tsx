
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import ClassTable from "@/components/admin/classes/ClassTable";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

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

export default function ClassesPage() {
  const [classes, setClasses] = useState<ApiSchoolClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchClasses = useCallback(async () => {
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

      setClasses(response);
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
    void fetchClasses();
  }, [fetchClasses]);

  const stats = useMemo(() => {
    const totalStudents = classes.reduce(
      (total, schoolClass) => total + (schoolClass.studentCount ?? 0),
      0,
    );

    const totalTeachers = new Set(
      classes
        .map((schoolClass) => schoolClass.teacherId.trim())
        .filter(Boolean),
    ).size;

    const totalRooms = new Set(
      classes
        .map((schoolClass) => schoolClass.room.trim())
        .filter(Boolean),
    ).size;

    return [
      { label: "Total Classes", value: classes.length },
      { label: "Total Students", value: totalStudents },
      { label: "Class Teachers", value: totalTeachers },
      { label: "Class Rooms", value: totalRooms },
    ];
  }, [classes]);

  return (
    <div className="space-y-5">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Classes
          </h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage class records and their information.
          </p>
        </div>

        <Link
          href="/admin/classes/add"
          className="inline-flex items-center justify-center rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          Add Class
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-gray-800">
              {loading ? "0" : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Summary API error */}
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
              onClick={() => void fetchClasses()}
              disabled={loading}
              className="rounded-full border border-red-200 px-4 py-2 font-medium transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Independent table data and table refresh */}
      <ClassTable />
    </div>
  );
}
