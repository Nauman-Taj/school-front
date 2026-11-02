
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SubjectForm from "@/components/admin/subjects/SubjectForm";
import SubjectProfile from "@/components/admin/subjects/SubjectProfile";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Subject } from "@/types/subject";

type SubjectLoaderProps = {
  subjectId: string;
  mode: "edit" | "profile";
};

type ApiSubject = {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  teacher: string | { name: string };
  className?: string;
  section?: string;
  schoolClass?: {
    name: string;
    section: string;
  };
  status: "ACTIVE" | "INACTIVE";
};

export default function SubjectLoader({
  subjectId,
  mode,
}: SubjectLoaderProps) {
  const router = useRouter();

  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadSubject() {
      const token = getAuthToken();

      if (!token) {
        setError("Your session has expired. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await apiRequest<ApiSubject>(
          `/subjects/${encodeURIComponent(subjectId)}`,
          { token }
        );

        if (cancelled) return;

        const mappedSubject: Subject = {
          id: data.id,
          name: data.name,
          code: data.code,
          teacherId: data.teacherId,
          teacher:
            typeof data.teacher === "string"
              ? data.teacher
              : data.teacher.name,
          className: data.schoolClass?.name ?? data.className ?? "",
          section: data.schoolClass?.section ?? data.section ?? "",
          status: data.status === "ACTIVE" ? "Active" : "Inactive",
        };

        setSubject(mappedSubject);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load subject."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSubject();

    return () => {
      cancelled = true;
    };
  }, [subjectId]);

  if (loading) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-[#01796F]" />
          Loading subject...
        </div>
      </div>
    );
  }

  if (error || !subject) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error || "Subject not found."}
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/subjects")}
          className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          Back to Subjects
        </button>
      </div>
    );
  }

  if (mode === "edit") {
    return <SubjectForm subject={subject} isEdit />;
  }

  return <SubjectProfile subject={subject} />;
}
