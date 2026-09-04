"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Student } from "@/types/student";

type StudentFormProps = {
  student?: Student;
};

export default function StudentForm({
  student,
}: StudentFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: student?.name ?? "",
    email: student?.email ?? "",
    class: student?.class ?? "",
    rollNo: student?.rollNo ?? "",
    parentName: student?.parentName ?? "",
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

    // Fake submit for frontend demonstration
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/students");
    }, 700);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
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
            htmlFor="class"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Class
          </label>

          <select
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option value="">Select class</option>
            <option value="5-A">5-A</option>
            <option value="5-B">5-B</option>
            <option value="6-A">6-A</option>
            <option value="6-B">6-B</option>
            <option value="7-A">7-A</option>
            <option value="7-B">7-B</option>
            <option value="8-A">8-A</option>
            <option value="8-B">8-B</option>
            <option value="9-A">9-A</option>
            <option value="9-B">9-B</option>
            <option value="10-A">10-A</option>
            <option value="10-B">10-B</option>
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

        {/* Parent Name */}
        <div>
          <label
            htmlFor="parentName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Parent Name
          </label>

          <input
            id="parentName"
            name="parentName"
            type="text"
            value={formData.parentName}
            onChange={handleChange}
            placeholder="Enter parent name"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
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
          onClick={() => router.push("/dashboard/students")}
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