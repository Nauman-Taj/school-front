"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { subjects } from "@/data/subjects";

type Props = {
  assignmentId?: string;
};

export default function TeacherAssignmentForm({
  assignmentId,
}: Props) {
  const isEdit = Boolean(assignmentId);

  const existingAssignment = assignmentId
    ? {
        title: "Algebra Homework",
        subject: "Mathematics",
        className: "Grade 10",
        section: "A",
        dueDate: "2026-09-20",
        status: "Pending",
      }
    : null;

  const [title, setTitle] = useState(
    existingAssignment?.title ?? ""
  );

  const [subject, setSubject] = useState(
    existingAssignment?.subject ?? ""
  );

  const [className, setClassName] = useState(
    existingAssignment?.className ?? ""
  );

  const [section, setSection] = useState(
    existingAssignment?.section ?? ""
  );

  const [dueDate, setDueDate] = useState(
    existingAssignment?.dueDate ?? ""
  );

  const [status, setStatus] = useState(
    existingAssignment?.status ?? "Pending"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const assignmentData = {
      id: assignmentId ?? `A${Date.now()}`,
      title,
      subject,
      className,
      section,
      dueDate,
      status,
    };

    console.log(
      isEdit ? "Updating assignment:" : "Creating assignment:",
      assignmentData
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <Link
          href="/teacher/assignments"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
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

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Title */}
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
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Subject
            </label>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
            >
              <option value="">Select subject</option>

              {subjects.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Class
            </label>

            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
            >
              <option value="">Select class</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 5">Grade 5</option>
            </select>
          </div>

          {/* Section */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Section
            </label>

            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
            >
              <option value="">Select section</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
            >
              <option value="Pending">Pending</option>
              <option value="Submitted">Submitted</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
          <Link
            href="/teacher/assignments"
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-xl bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
          >
            {isEdit ? "Update Assignment" : "Add Assignment"}
          </button>
        </div>
      </form>
    </div>
  );
}