"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { teachers } from "@/data/teachers";

type TeacherFormProps = {
  mode: "add" | "edit";
  teacherId?: string;
};

export default function TeacherForm({
  mode,
  teacherId,
}: TeacherFormProps) {
  const router = useRouter();

  const teacher = teachers.find(
    (teacher) => teacher.id === teacherId
  );

  const [formData, setFormData] = useState({
    name: teacher?.name ?? "",
    email: teacher?.email ?? "",
    phone: teacher?.phone ?? "",
    subject: teacher?.subject ?? "",
    qualification: teacher?.qualification ?? "",
    joiningDate: teacher?.joiningDate ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "add") {
      console.log("Add Teacher:", formData);
    } else {
      console.log("Update Teacher:", teacherId, formData);
    }

    router.push("/dashboard/teachers");
  };

  return (
    <div className="mx-auto space-y-5">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#01796f]"
        >
          <ArrowLeft size={17} />
          Back to Teachers
        </button>

        <h1 className="text-2xl font-bold text-gray-900">
          {mode === "add" ? "Add Teacher" : "Edit Teacher"}
        </h1>

        {/* <p className="mt-1 text-sm text-gray-500">
          {mode === "add"
            ? "Add a new teacher to the school."
            : "Update the teacher's information."}
        </p> */}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl max-w-5xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter teacher name"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-1 focus:ring-[#01796f]"
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
              placeholder="Email address"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-1 focus:ring-[#01796f]"
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
              placeholder="Phone Number"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-1 focus:ring-[#01796f]"
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Subject
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-1 focus:ring-[#01796f]"
            />
          </div>

          {/* Qualification */}
          <div>
            <label
              htmlFor="qualification"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Qualification
            </label>

            <input
              id="qualification"
              name="qualification"
              type="text"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Your qualification"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-1 focus:ring-[#01796f]"
            />
          </div>

          {/* Joining Date */}
          <div>
            <label
              htmlFor="joiningDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Joining Date
            </label>

            <input
              id="joiningDate"
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796f] focus:ring-1 focus:ring-[#01796f]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
          >
            {mode === "add" ? "+ Add Teacher" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}