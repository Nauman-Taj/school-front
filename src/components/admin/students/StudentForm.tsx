"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Student } from "@/types/student";
import { parents } from "@/data/parents";
import { parentChildren } from "@/data/parentChildren";

type StudentFormProps = {
  student?: Student;
};

export default function StudentForm({
  student,
}: StudentFormProps) {
  const router = useRouter();

  // Find the student's parent through the parentChildren relationship
  const existingParentId = student
    ? parentChildren.find(
        (relation) => relation.studentId === student.id
      )?.parentId
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

  const isEditMode = Boolean(student);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const selectedParent = parents.find(
      (parent) => parent.id === Number(formData.parentId)
    );

    if (!selectedParent) {
      setLoading(false);
      return;
    }

    const studentData = {
      id: student?.id,
      name: formData.name,
      email: formData.email,
      className: formData.className,
      section: formData.section,
      rollNo: formData.rollNo,
      parentName: selectedParent.name,
      phone: formData.phone,
      status: formData.status as "Active" | "Inactive",
    };

    console.log("Student Data:", studentData);

    // Parent-child relationship ready for backend
    const parentChildData = {
      id: isEditMode
        ? parentChildren.find(
            (relation) => relation.studentId === student?.id
          )?.id
        : undefined,
      parentId: Number(formData.parentId),
      studentId: student?.id,
    };

    console.log("Parent-Child Relationship:", parentChildData);

    // Fake submit for frontend demonstration
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/students");
    }, 700);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Student Name */}
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
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
        </div>

        {/* Email */}
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
            placeholder="Enter email address"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
        </div>

        {/* Class */}
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

        {/* Section */}
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

        {/* Roll Number */}
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
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
        </div>

        {/* Parent */}
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

        {/* Phone */}
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
            placeholder="Enter phone number"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
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

      {/* Actions */}
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/students")}
          className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d] disabled:cursor-not-allowed disabled:opacity-70"
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