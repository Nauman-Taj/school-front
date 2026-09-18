"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Announcement } from "@/types/announcement";

type AnnouncementFormProps = {
  mode?: "add" | "edit";
  announcement?: Announcement;
};

function formatDateForInput(date: string) {
  const [day, month, year] = date.split(" ");

  const months: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  return `${year}-${months[month]}-${day.padStart(2, "0")}`;
}

export default function AnnouncementForm({
  mode = "add",
  announcement,
}: AnnouncementFormProps) {
  const [formData, setFormData] = useState({
  title: announcement?.title ?? "",
  description: announcement?.description ?? "",
  audience: announcement?.audience ?? "",
  date: announcement?.date
    ? formatDateForInput(announcement.date)
    : "",
  status: announcement?.status ?? "Draft",
});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    window.location.href = "/dashboard/announcements";
  };

  return (
    <div className="space-y-5">
      <Link
        href="/dashboard/announcements"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
      >
        <ArrowLeft size={17} />
        Back to Announcements
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === "edit"
            ? "Edit Announcement"
            : "Add Announcement"}
        </h1>

        {/* <p className="mt-1 text-sm text-gray-500">
          {mode === "edit"
            ? "Update the announcement information."
            : "Create a new school announcement."}
        </p> */}
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl max-w-5xl border border-gray-200 bg-white p-5 sm:p-6"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter announcement title"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter announcement description"
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Audience
            </label>

            <select
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            >
              <option value="">Select audience</option>
              <option value="All">All</option>
              <option value="All Students">All Students</option>
              <option value="Students">Students</option>
              <option value="Teachers">Teachers</option>
              <option value="Parents">Parents</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard/announcements"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            {mode === "edit"
              ? "Update Announcement"
              : "Add Announcement"}
          </button>
        </div>
      </form>
    </div>
  );
}