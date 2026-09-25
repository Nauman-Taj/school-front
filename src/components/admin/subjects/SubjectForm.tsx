"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CaseSensitive,
  BookOpen,
  GraduationCap,
  UserRound,
  Layers,
} from "lucide-react";

import { Subject } from "@/types/subject";
import { teachers } from "@/data/teachers";

type SubjectFormProps = {
  subject?: Subject;
  isEdit?: boolean;
};

export default function SubjectForm({
  subject,
  isEdit = false,
}: SubjectFormProps) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const teacherId = formData.get("teacherId") as string;
    const selectedTeacher = teachers.find(
      (teacher) => teacher.id === teacherId
    );

    if (!selectedTeacher) {
      window.alert("Please select a teacher.");
      return;
    }

    const subjectData = {
      ...(subject ? { id: subject.id } : {}),
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      teacherId: selectedTeacher.id,
      teacher: selectedTeacher.name,
      className: formData.get("className") as string,
      section: formData.get("section") as string,
      status: (formData.get("status") as "Active" | "Inactive") || "Active",
    };

    console.log(
      isEdit ? "Update Subject:" : "Add Subject:",
      subjectData
    );

    router.push("/admin/subjects");
  };

  return (
    <div className="space-y-5">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/admin/subjects")}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
      >
        <ArrowLeft size={17} />
        Back to Subjects
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Subject" : "Add Subject"}
        </h1>
      </div>

      {/* Form */}
      <div className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Subject Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Subject Name
            </label>

            <div className="relative">
              <BookOpen
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="name"
                name="name"
                type="text"
                defaultValue={subject?.name || ""}
                placeholder="Enter subject name"
                required
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              />
            </div>
          </div>

          {/* Subject Code */}
          <div>
            <label
              htmlFor="code"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Subject Code
            </label>

            <div className="relative">
              <CaseSensitive
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="code"
                name="code"
                type="text"
                defaultValue={subject?.code || ""}
                placeholder="e.g. MATH"
                required
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              />
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
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                id="className"
                name="className"
                defaultValue={subject?.className || ""}
                required
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              >
                <option value="" disabled>
                  Select class
                </option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
              </select>
            </div>
          </div>

          {/* Section */}
          <div>
            <label
              htmlFor="section"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Section
            </label>

            <div className="relative">
              <Layers
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                id="section"
                name="section"
                defaultValue={subject?.section || ""}
                required
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              >
                <option value="" disabled>
                  Select section
                </option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>
          </div>

          {/* Teacher */}
          <div>
            <label
              htmlFor="teacherId"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Teacher
            </label>

            <div className="relative">
              <UserRound
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                id="teacherId"
                name="teacherId"
                defaultValue={subject?.teacherId || ""}
                required
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              >
                <option value="" disabled>
                  Select teacher
                </option>

                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
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
              defaultValue={subject?.status || "Active"}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/subjects")}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
            >
              {isEdit ? "Update Subject" : "Add Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
