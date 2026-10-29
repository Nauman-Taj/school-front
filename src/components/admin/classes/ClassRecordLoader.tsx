
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ClassProfile from "@/components/admin/classes/ClassProfile";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { SchoolClass } from "@/types/class";
import type { Student } from "@/types/student";

type ClassRecordLoaderProps = {
  id: string;
};

type ApiClassStudent = {
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

type ApiSchoolClass = {
  id: number;
  name: string;
  section: string;
  teacherId: string;
  teacher: string;
  room: string;
  status: "ACTIVE" | "INACTIVE" | "Active" | "Inactive";
  studentCount: number;
  students: ApiClassStudent[];
};

type ClassRecord = {
  schoolClass: SchoolClass;
  students: Student[];
};

function mapApiClass(data: ApiSchoolClass): ClassRecord {
  return {
    schoolClass: {
      id: data.id,
      name: data.name,
      section: data.section,
      teacherId: data.teacherId,
      teacher: data.teacher ?? "",
      room: data.room,
      status:
        data.status === "INACTIVE" || data.status === "Inactive"
          ? "Inactive"
          : "Active",
    },
    students: (data.students ?? []).map((student) => ({
      id: student.id,
      name: student.name,
      email: student.email ?? "",
      className: student.className,
      section: student.section,
      rollNo: student.rollNo,
      parentName: student.parentName ?? "",
      phone: student.phone ?? "",
      status:
        student.status === "INACTIVE" ||
        student.status === "Inactive"
          ? "Inactive"
          : "Active",
    })),
  };
}

export default function ClassRecordLoader({
  id,
}: ClassRecordLoaderProps) {
  const router = useRouter();

  const [record, setRecord] = useState<ClassRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const loadClass = useCallback(async () => {
    setLoading(true);
    setError("");
    setRecord(null);

    const numericId = Number(id);

    if (!Number.isInteger(numericId) || numericId <= 0) {
      setError("Invalid class ID.");
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
      const response = await apiRequest<ApiSchoolClass>(
        `/classes/${numericId}`,
        { token },
      );

      setRecord(mapApiClass(response));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load class details.",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadClass();
  }, [loadClass, retryCount]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-gray-500">
          Loading class details...
        </p>
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Unable to load class
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error || "Class not found."}
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
            href="/admin/classes"
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Back to Classes
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

  return (
    <ClassProfile
      schoolClass={record.schoolClass}
      students={record.students}
    />
  );
}
