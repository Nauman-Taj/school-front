"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Parent } from "@/types/parent";

type ParentFormProps = {
  parent?: Parent;
  mode: "add" | "edit";
};

export default function ParentForm({
  parent,
  mode,
}: ParentFormProps) {
  const [formData, setFormData] = useState({
    name: parent?.name || "",
    email: parent?.email || "",
    phone: parent?.phone || "",
    address: parent?.address || "",
    occupation: parent?.occupation || "",
    children: parent?.children.join(", ") || "",
    status: parent?.status || "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  console.log({
    ...formData,
    children: formData.children
      .split(",")
      .map((child) => child.trim())
      .filter(Boolean),
  });

  router.push("/dashboard/parents");
};


  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/dashboard/parents"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
      >
        <ArrowLeft size={17} />
        Back to Parents
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === "add" ? "Add Parent" : "Edit Parent"}
        </h1>

        {/* <p className="mt-1 text-sm text-gray-500">
          {mode === "add"
            ? "Add a new parent to the school."
            : "Update parent information."}
        </p> */}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border max-w-5xl border-gray-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Parent Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter parent name"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>

          {/* Occupation */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Occupation
            </label>

            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Enter occupation"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              rows={3}
              required
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>

          {/* Children */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Children
            </label>

            <input
              type="text"
              name="children"
              value={formData.children}
              onChange={handleChange}
              placeholder="e.g. Ali Tareen, Hassan Tareen"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />

            {/* <p className="mt-1.5 text-xs text-gray-400">
              Separate multiple children with commas.
            </p> */}
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard/parents"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
          >
            {mode === "add" ? "Add Parent" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}