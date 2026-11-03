"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AssignmentForm, {
  type AssignmentSubjectOption,
} from "@/components/admin/assignments/AssignmentForm";
import AssignmentProfile from "@/components/admin/assignments/AssignmentProfile";
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

export default function AssignmentLoader({
  id,
  mode,
}: {
  id: string;
  mode: "profile" | "edit";
}) {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [subjects, setSubjects] = useState<AssignmentSubjectOption[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      const token = getAuthToken();
      if (!token) {
        setError("Your session has expired. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        if (mode === "edit") {
          const [assignmentData, subjectData] = await Promise.all([
            apiRequest<ApiAssignment>(`/assignments/${encodeURIComponent(id)}`, {
              token,
            }),
            apiRequest<AssignmentSubjectOption[]>("/subjects", { token }),
          ]);
          if (!cancelled) {
            setAssignment(mapApiAssignment(assignmentData));
            setSubjects(subjectData);
          }
        } else {
          const assignmentData = await apiRequest<ApiAssignment>(
            `/assignments/${encodeURIComponent(id)}`,
            { token },
          );
          if (!cancelled) setAssignment(mapApiAssignment(assignmentData));
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to load assignment.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [id, mode, retryCount]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
        Loading assignment...
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="space-y-4">
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error || "Assignment not found."}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white"
          >
            Try again
          </button>
          <Link
            href="/admin/assignments"
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700"
          >
            Back to Assignments
          </Link>
        </div>
      </div>
    );
  }

  return mode === "edit" ? (
    <AssignmentForm
      assignment={assignment}
      isEdit
      initialSubjects={subjects}
    />
  ) : (
    <AssignmentProfile assignment={assignment} />
  );
}
