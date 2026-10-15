"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { Student } from "@/types/student";
import { parents } from "@/data/parents";
import { parentChildren } from "@/data/parentChildren";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type StudentFormProps = {
  student?: Student;
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
  status: "ACTIVE" | "INACTIVE";
};

export default function StudentForm({ student }: StudentFormProps) {
  const router = useRouter();

  const existingParentId = student
    ? (
      parentChildren.find(
        (relation) => relation.studentId === student.id,
      )?.parentId ??
      parents.find(
        (parent) => parent.name === student.parentName,
      )?.id
    )
    : undefined;

  const [formData, setFormData] = useState({
    name: student?.name ?? "",
    email: student?.email ?? "",
    className: student?.className ?? "",
    section: student?.section ?? "",
    rollNo: student?.rollNo ?? "",
    parentId: existingParentId?.toString() ?? "",
    phone: student?.phone ?? "",
    status: student?.status ?? "Active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(student);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError("");

    const token = getAuthToken();

    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    const selectedParent = parents.find(
      (parent) => parent.id === Number(formData.parentId),
    );

    if (!selectedParent) {
      setError("Please select a parent or guardian.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        // The DTO permits null, but an empty string fails IsEmail().
        email: formData.email.trim() || null,
        className: formData.className,
        section: formData.section,
        rollNo: formData.rollNo.trim(),
        parentName: selectedParent.name,
        phone: formData.phone.trim() || null,
        status:
          formData.status === "Active" ? "ACTIVE" : "INACTIVE",
      };

      if (isEditMode && student) {
        await apiRequest<ApiStudent>(`/students/${student.id}`, {
          method: "PATCH",
          token,
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest<ApiStudent>("/students", {
          method: "POST",
          token,
          body: JSON.stringify(payload),
        });
      }

      router.push("/admin/students");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save the student. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
    >
      {error && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Student Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            minLength={2}
            maxLength={100}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address (optional)"
            maxLength={255}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
        </div>

        <div>
          <label
            htmlFor="className"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Class
          </label>
          <select
            id="className"
            name="className"
            value={formData.className}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option value="">Select class</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="section"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Section
          </label>
          <select
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option value="">Select section</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="rollNo"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Roll Number
          </label>
          <input
            id="rollNo"
            name="rollNo"
            type="text"
            value={formData.rollNo}
            onChange={handleChange}
            placeholder="Enter roll number"
            maxLength={30}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
        </div>

        <div>
          <label
            htmlFor="parentId"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Parent
          </label>
          <select
            id="parentId"
            name="parentId"
            value={formData.parentId}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option value="">Select parent</option>
            {parents.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number (optional)"
            maxLength={30}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
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
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/students")}
          disabled={loading}
          className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading
            ? "Saving..."
            : isEditMode
              ? "Save Changes"
              : "Add Student"}
        </button>
      </div>
    </form>
  );
}