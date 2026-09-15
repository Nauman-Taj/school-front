"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CaseSensitive,
  BookOpen,
  GraduationCap,
  UserRound,
} from "lucide-react";

import { Subject } from "@/types/subject";

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

    router.push("/dashboard/subjects");
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/dashboard/subjects")}
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

        {/* <p className="mt-1 text-sm text-gray-500">
          {isEdit
            ? "Update the subject information."
            : "Add a new subject to the school."}
        </p> */}
      </div>

      {/* Form */}
      <div className="rounded-2xl max-w-5xl border border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="e.g. ISL"
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

          {/* Teacher */}
          <div>
            <label
              htmlFor="teacher"
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
                id="teacher"
                name="teacher"
                defaultValue={subject?.teacher || ""}
                required
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              >
                <option value="" disabled>
                  Select teacher
                </option>
                <option value="Ayesha Khan">Ayesha Khan</option>
                <option value="Hassan Ali">Hassan Ali</option>
                <option value="Fatima Noor">Fatima Noor</option>
                <option value="Bilal Raza">Bilal Raza</option>
                <option value="Sara Ahmad">Sara Ahmad</option>
                <option value="Muhammad Usman">Muhammad Usman</option>
                <option value="Zainab Malik">Zainab Malik</option>
                <option value="Omar Farooq">Omar Farooq</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/dashboard/subjects")}
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