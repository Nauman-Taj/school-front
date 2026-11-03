"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Assignment } from "@/types/assignment";

export type AssignmentSubjectOption = {
  id: string;
  name: string;
  teacherId: string;
  teacher: string;
  className: string;
  section: string;
  status?: string;
};

type AssignmentFormProps = {
  assignment?: Assignment;
  isEdit?: boolean;
  initialSubjects?: AssignmentSubjectOption[];
};

const statuses = ["Pending", "Submitted", "Overdue"] as const;
const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10";

export default function AssignmentForm({
  assignment,
  isEdit = false,
  initialSubjects,
}: AssignmentFormProps) {
  const router = useRouter();
  const [subjects, setSubjects] = useState<AssignmentSubjectOption[]>(
    initialSubjects ?? [],
  );
  const [title, setTitle] = useState(assignment?.title ?? "");
  const [subjectId, setSubjectId] = useState(assignment?.subjectId ?? "");
  const [dueDate, setDueDate] = useState(assignment?.dueDate ?? "");
  const [status, setStatus] = useState<Assignment["status"]>(
    assignment?.status ?? "Pending",
  );
  const [loadingOptions, setLoadingOptions] = useState(!initialSubjects);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function loadSubjects() {
      if (initialSubjects) return;
      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error("Your session has expired. Please log in again.");
        }
        const response = await apiRequest<AssignmentSubjectOption[]>("/subjects", {
          method: "GET",
          token,
        });
        if (!cancelled) setSubjects(response);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load subject options.",
          );
        }
      } finally {
        if (!cancelled) setLoadingOptions(false);
      }
    }
    void loadSubjects();
    return () => {
      cancelled = true;
    };
  }, [initialSubjects]);

  const selectedSubject = subjects.find((subject) => subject.id === subjectId);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const token = getAuthToken();
    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }
    if (!selectedSubject) {
      setError("Select a subject before saving this assignment.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        subjectId: selectedSubject.id,
        dueDate,
        status: status.toUpperCase(),
      };
      await apiRequest<Assignment>(
        isEdit && assignment
          ? `/assignments/${encodeURIComponent(assignment.id)}`
          : "/assignments",
        {
          method: isEdit ? "PATCH" : "POST",
          token,
          body: JSON.stringify(payload),
        },
      );
      router.push("/admin/assignments");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save assignment.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <Link
        href="/admin/assignments"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
      >
        <ArrowLeft size={17} />
        Back to Assignments
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Assignment" : "Add Assignment"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
      >
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {loadingOptions ? (
          <div className="py-8 text-center text-sm text-gray-500">
            Loading subject options...
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Assignment Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={150}
                placeholder="Enter assignment title"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="subjectId"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <select
                id="subjectId"
                name="subjectId"
                value={subjectId}
                onChange={(event) => setSubjectId(event.target.value)}
                required
                disabled={subjects.length === 0}
                className={inputClass}
              >
                <option value="">Select subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name} — {subject.className}-{subject.section}
                  </option>
                ))}
              </select>
              {subjects.length === 0 && (
                <p className="mt-2 text-sm text-amber-700">
                  No subjects are available. Add a subject before creating an
                  assignment.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="className"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Assigned Class
              </label>
              <input
                id="className"
                type="text"
                value={
                  selectedSubject
                    ? `${selectedSubject.className}-${selectedSubject.section}`
                    : ""
                }
                readOnly
                placeholder="Select subject first"
                className={`${inputClass} bg-gray-50`}
              />
            </div>

            <div>
              <label
                htmlFor="teacher"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Assigned Teacher
              </label>
              <input
                id="teacher"
                type="text"
                value={selectedSubject?.teacher ?? ""}
                readOnly
                placeholder="Select subject first"
                className={`${inputClass} bg-gray-50`}
              />
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as Assignment["status"])
                }
                className={inputClass}
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {!loadingOptions && (
          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !selectedSubject}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Add Assignment"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
