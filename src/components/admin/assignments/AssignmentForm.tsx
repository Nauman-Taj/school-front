"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  UserRound,
} from "lucide-react";

import { assignments } from "@/data/assignments";
import { subjects } from "@/data/subjects";
import { Assignment } from "@/types/assignment";

type AssignmentFormProps = {
  assignment?: Assignment;
  isEdit?: boolean;
};

const statuses = ["Pending", "Submitted", "Overdue"] as const;

export default function AssignmentForm({
  assignment,
  isEdit = false,
}: AssignmentFormProps) {
  const router = useRouter();

  const [subjectId, setSubjectId] = useState(
    assignment?.subjectId ?? ""
  );

  const selectedSubject = subjects.find(
    (subject) => subject.id === subjectId
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const subject = subjects.find(
      (item) => item.id === subjectId
    );

    if (!subject) return;

    const assignmentData: Assignment = {
      id:
        assignment?.id ??
        `A${String(assignments.length + 1).padStart(3, "0")}`,
      title: formData.get("title") as string,
      subjectId: subject.id,
      subject: subject.name,
      className: subject.className,
      section: subject.section,
      teacherId: subject.teacherId,
      teacher: subject.teacher,
      dueDate: formData.get("dueDate") as string,
      status: formData.get("status") as Assignment["status"],
    };

    console.log("Assignment data:", assignmentData);

    // Backend/API will be added here later.
    router.push("/admin/assignments");
  };

  return (
    <div className="space-y-5">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/admin/assignments")}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
      >
        <ArrowLeft size={17} />
        Back to Assignments
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Assignment" : "Add Assignment"}
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Title */}
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Assignment Title
            </label>

            <div className="relative">
              <ClipboardList
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="title"
                name="title"
                type="text"
                defaultValue={assignment?.title}
                placeholder="Enter assignment title"
                required
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subjectId"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Subject
            </label>

            <div className="relative">
              <BookOpen
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                id="subjectId"
                name="subjectId"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                required
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              >
                <option value="" disabled>
                  Select subject
                </option>

                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Class */}
          <div>
            <label
              htmlFor="className"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Class
            </label>

            <div className="relative">
              <GraduationCap
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

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
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-600 outline-none"
              />
            </div>
          </div>

          {/* Teacher */}
          <div>
            <label
              htmlFor="teacher"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Teacher
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="teacher"
                type="text"
                value={selectedSubject?.teacher ?? ""}
                readOnly
                placeholder="Select subject first"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-600 outline-none"
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label
              htmlFor="dueDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="dueDate"
                name="dueDate"
                type="date"
                defaultValue={assignment?.dueDate}
                required
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              />
            </div>
          </div>

          {/* Status */}
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
              defaultValue={assignment?.status ?? "Pending"}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.push("/admin/assignments")}
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            {isEdit ? "Update Assignment" : "Add Assignment"}
          </button>
        </div>
      </form>
    </div>
  );
}