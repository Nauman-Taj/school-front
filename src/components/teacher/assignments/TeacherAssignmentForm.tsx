"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

import {
  createTeacherAssignment,
  fetchTeacherAssignments,
  updateTeacherAssignment,
} from "@/lib/teacher-api";
import { useTeacherProfile } from "@/lib/useTeacherProfile";

type Props = {
  assignmentId?: string;
};

type StatusValue = "PENDING" | "SUBMITTED" | "OVERDUE";

export default function TeacherAssignmentForm({
  assignmentId,
}: Props) {
  const isEdit = Boolean(assignmentId);
  const { profile } = useTeacherProfile();

  const [loaded, setLoaded] = useState(!isEdit);

  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<StatusValue>("PENDING");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!assignmentId) return;

    let active = true;

    fetchTeacherAssignments()
      .then((assignments) => {
        if (!active) return;

        const found = assignments.find(
          (item) => item.id === assignmentId
        );

        if (!found) {
          setError("That assignment was not found.");
          setLoaded(true);
          return;
        }

        setTitle(found.title);
        setSubjectId(found.subjectId);
        setDueDate(found.dueDate);
        setStatus(
          (found.status.toUpperCase() as StatusValue) ?? "PENDING"
        );
        setLoaded(true);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load the assignment."
        );
        setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [assignmentId]);

  const subjects = useMemo(() => profile?.subjects ?? [], [profile]);

  const selectedSubject = useMemo(
    () => subjects.find((subject) => subject.id === subjectId),
    [subjects, subjectId]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !subjectId || !dueDate) {
      setError("Title, subject and due date are required.");
      return;
    }

    setSaving(true);
    setError("");
    setSaved(false);

    try {
      if (isEdit && assignmentId) {
        await updateTeacherAssignment(assignmentId, {
          title: title.trim(),
          subjectId,
          dueDate,
          status,
        });
      } else {
        await createTeacherAssignment({
          title: title.trim(),
          subjectId,
          dueDate,
          status,
        });
      }

      setSaved(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save the assignment. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (isEdit && !loaded) {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading the assignment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <Link
          href="/teacher/assignments"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
        >
          <ArrowLeft size={17} />
          Back to Assignments
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {isEdit ? "Edit Assignment" : "Add Assignment"}
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          {isEdit
            ? "Update assignment details."
            : "Create a new assignment for your students."}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {saved && (
        <div
          role="status"
          className="rounded-2xl border border-[#01796f]/15 bg-[#e6f4f2] p-4 text-sm text-[#015f58]"
        >
          {isEdit
            ? "Assignment updated successfully."
            : "Assignment created successfully."}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Assignment Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter assignment title"
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Subject
            </label>

            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
              <option value="">Select subject</option>

              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.className} -{" "}
                  {subject.section})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Class
            </label>

            <div className="w-full rounded-xl border border-gray-100 bg-[#f6f8f8] px-4 py-2.5 text-sm text-gray-700">
              {selectedSubject
                ? `${selectedSubject.className} - ${selectedSubject.section}`
                : "Derived from the subject"}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as StatusValue)
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
              <option value="PENDING">Pending</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          <Link
            href="/teacher/assignments"
            className="rounded-full border border-gray-200 px-5 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : isEdit
                ? "Update Assignment"
                : "Add Assignment"}
          </button>
        </div>
      </form>
    </div>
  );
}
