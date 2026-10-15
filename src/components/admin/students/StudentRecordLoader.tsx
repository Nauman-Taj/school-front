"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import StudentProfile from "@/components/admin/students/StudentProfile";
import StudentForm from "@/components/admin/students/StudentForm";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Student } from "@/types/student";

type StudentRecordLoaderProps = {
  id: string;
  mode: "view" | "edit";
};

type ApiStudent = {
  id: number;
  name: string;
  email: string | null;
  className: string;
  section: string;
  rollNo: string;
  parentName: string | null;
  phone: string | null;
  status: "ACTIVE" | "INACTIVE" | "Active" | "Inactive";
};

function mapApiStudent(data: ApiStudent): Student {
  return {
    id: data.id,
    name: data.name,
    email: data.email ?? "",
    className: data.className,
    section: data.section,
    rollNo: data.rollNo,
    parentName: data.parentName ?? "",
    phone: data.phone ?? "",
    status:
      data.status === "INACTIVE" || data.status === "Inactive"
        ? "Inactive"
        : "Active",
  };
}

export default function StudentRecordLoader({
  id,
  mode,
}: StudentRecordLoaderProps) {
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const loadStudent = useCallback(async () => {
    setLoading(true);
    setError("");
    setStudent(null);

    const numericId = Number(id);

    if (!Number.isInteger(numericId) || numericId <= 0) {
      setError("Invalid student ID.");
      setLoading(false);
      return;
    }

    const token = getAuthToken();

    if (!token) {
      setError("Your session has expired. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await apiRequest<ApiStudent>(
        `/students/${numericId}`,
        { token },
      );

      setStudent(mapApiStudent(response));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load student details.",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadStudent();
  }, [loadStudent, retryCount]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-gray-500">
          Loading student details...
        </p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Unable to load student
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error || "Student not found."}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            Try Again
          </button>

          <Link
            href="/admin/students"
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Back to Students
          </Link>

          {error.includes("session has expired") && (
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    );
  }

  if (mode === "view") {
    return <StudentProfile student={student} />;
  }

  return <StudentForm student={student} />;
}