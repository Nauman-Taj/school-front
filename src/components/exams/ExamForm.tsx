"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  UserRound,
} from "lucide-react";

import { Exam } from "@/types/exam";

type ExamFormProps = {
  exam?: Exam;
  isEdit?: boolean;
};

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Computer Science",
  "Urdu",
  "Social Studies",
  "Islamiyat",
  "Physics",
];

const classes = [
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
];

const teachers = [
  "Ayesha Khan",
  "Hassan Ali",
  "Fatima Noor",
  "Bilal Raza",
  "Sara Ahmad",
  "Muhammad Usman",
  "Zainab Malik",
  "Omar Farooq",
];

export default function ExamForm({
  exam,
  isEdit = false,
}: ExamFormProps) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Backend/API will be added here later.
    router.push("/dashboard/exams");
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/dashboard/exams")}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
      >
        <ArrowLeft size={17} />
        Back to Exams
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Exam" : "Add Exam"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEdit
            ? "Update the examination details."
            : "Create a new examination."}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl max-w-5xl border border-gray-200 bg-white p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Exam Name */}
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Exam Name
            </label>

            <div className="relative">
              <ClipboardCheck
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="name"
                name="name"
                type="text"
                defaultValue={exam?.name}
                placeholder="Enter exam name"
                required
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Subject
            </label>

            <div className="relative">
              <BookOpen
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                id="subject"
                name="subject"
                defaultValue={exam?.subject ?? ""}
                required
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              >
                <option value="" disabled>
                  Select subject
                </option>

                {subjects.map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </select>
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
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                id="className"
                name="className"
                defaultValue={exam?.className ?? ""}
                required
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              >
                <option value="" disabled>
                  Select class
                </option>

                {classes.map((className) => (
                  <option key={className}>{className}</option>
                ))}
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
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                id="teacher"
                name="teacher"
                defaultValue={exam?.teacher ?? ""}
                required
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              >
                <option value="" disabled>
                  Select teacher
                </option>

                {teachers.map((teacher) => (
                  <option key={teacher}>{teacher}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Exam Date */}
          <div>
            <label
              htmlFor="examDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Exam Date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="examDate"
                name="examDate"
                type="date"
                defaultValue={exam?.examDate}
                required
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              />
            </div>
          </div>

          {/* Total Marks */}
          <div>
            <label
              htmlFor="totalMarks"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Total Marks
            </label>

            <input
              id="totalMarks"
              name="totalMarks"
              type="number"
              min="1"
              defaultValue={exam?.totalMarks ?? 100}
              placeholder="Enter total marks"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
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
              defaultValue={exam?.status ?? "Upcoming"}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
              <option>Upcoming</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.push("/dashboard/exams")}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            {isEdit ? "Update Exam" : "Add Exam"}
          </button>
        </div>
      </form>
    </div>
  );
}