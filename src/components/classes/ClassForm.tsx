"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SchoolClass } from "@/types/class";

type ClassFormProps = {
  schoolClass?: SchoolClass;
};

const classOptions = ["5", "6", "7", "8", "9", "10"];
const sectionOptions = ["A", "B"];

export default function ClassForm({ schoolClass }: ClassFormProps) {
  const isEdit = Boolean(schoolClass);

  const [formData, setFormData] = useState({
    name: schoolClass?.name ?? "",
    section: schoolClass?.section ?? "",
    teacher: schoolClass?.teacher ?? "",
    room: schoolClass?.room ?? "",
    status: schoolClass?.status ?? "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(
      isEdit ? "Updated class:" : "New class:",
      {
        ...(schoolClass ? { id: schoolClass.id } : {}),
        ...formData,
      }
    );

    if (!isEdit) {
      window.alert("Class added successfully!");
    } else {
      window.alert("Class updated successfully!");
    }
  };

  return (
    <div className="space-y-4">
      {/* Back */}
      <Link
        href={
          isEdit
            ? `/dashboard/classes/${schoolClass?.id}`
            : "/dashboard/classes"
        }
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
      >
        <ArrowLeft size={17} />
        {isEdit ? "Back to Class" : "Back to Classes"}
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Class" : "Add Class"}
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">

          {/* Class */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Class
            </label>

            <select
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            >
              <option value="" disabled>
                Select class
              </option>

              {classOptions.map((className) => (
                <option key={className} value={className}>
                  Grade {className}
                </option>
              ))}
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
              <option value="" disabled>
                Select section
              </option>

              {sectionOptions.map((section) => (
                <option key={section} value={section}>
                  Section {section}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}
          <div>
            <label
              htmlFor="teacher"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Class Teacher
            </label>

            <input
              id="teacher"
              name="teacher"
              type="text"
              value={formData.teacher}
              onChange={handleChange}
              placeholder="Enter teacher name"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>

          {/* Room */}
          <div>
            <label
              htmlFor="room"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Classroom
            </label>

            <input
              id="room"
              name="room"
              type="text"
              value={formData.room}
              onChange={handleChange}
              placeholder="Enter classroom"
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
          <Link
            href={
              isEdit
                ? `/dashboard/classes/${schoolClass?.id}`
                : "/dashboard/classes"
            }
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
          >
            {isEdit ? "Save Changes" : "Add Class"}
          </button>
        </div>
      </form>
    </div>
  );
}
