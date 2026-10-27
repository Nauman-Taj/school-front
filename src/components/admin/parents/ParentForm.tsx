
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { Parent } from "@/types/parent";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type ParentFormProps = {
  parent?: Parent;
  mode: "add" | "edit";
};

type ParentApiResponse = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  occupation: string | null;
  status: "ACTIVE" | "INACTIVE";
};

export default function ParentForm({
  parent,
  mode,
}: ParentFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: parent?.name ?? "",
    email: parent?.email ?? "",
    phone: parent?.phone ?? "",
    address: parent?.address ?? "",
    occupation: parent?.occupation ?? "",
    children: (parent?.children ?? [])
      .map((child) => child.id)
      .join(", "),
    status: parent?.status ?? "Active",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

    setError("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (saving) return;

    const token = getAuthToken();

    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    const childText = formData.children.trim();
    const childIds =
      childText === ""
        ? []
        : childText.split(",").map((value) => value.trim());

    if (
      childIds.some(
        (value) => !/^[1-9]\d*$/.test(value)
      )
    ) {
      setError(
        "Enter valid positive student IDs separated by commas."
      );
      return;
    }

    const children = childIds.map(Number);

    if (new Set(children).size !== children.length) {
      setError("A student ID cannot be entered more than once.");
      return;
    }

    if (formData.name.trim().length < 2) {
      setError("Parent name must contain at least 2 characters.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim() || null,
      phone: formData.phone.trim() || null,
      address: formData.address.trim() || null,
      occupation: formData.occupation.trim() || null,
      status:
        formData.status === "Active" ? "ACTIVE" : "INACTIVE",
      children,
    };

    setSaving(true);
    setError("");

    try {
      if (mode === "edit") {
        if (!parent) {
          throw new Error("Parent information is missing.");
        }

        await apiRequest<ParentApiResponse>(
          `/parents/${parent.id}`,
          {
            method: "PATCH",
            token,
            body: JSON.stringify(payload),
          }
        );
      } else {
        await apiRequest<ParentApiResponse>("/parents", {
          method: "POST",
          token,
          body: JSON.stringify(payload),
        });
      }

      router.push("/admin/parents");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save parent. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/admin/parents"
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
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
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
              minLength={2}
              maxLength={100}
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
              maxLength={255}
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
              maxLength={30}
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
              maxLength={100}
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
              maxLength={255}
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
              placeholder="e.g. 1, 2"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />

            <p className="mt-1.5 text-xs text-gray-400">
              Enter existing student IDs separated by commas.
              Leave blank if no children are linked.
            </p>
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

        {/* API Error */}
        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/admin/parents"
            aria-disabled={saving}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : mode === "add"
                ? "Add Parent"
                : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
