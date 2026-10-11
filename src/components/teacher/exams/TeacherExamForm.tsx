"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import { exams } from "@/data/exams";
import type { Exam } from "@/types/exam";

type Props = {
  examId: string;
};

export default function TeacherExamForm({ examId }: Props) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    className: "",
    section: "",
    examDate: "",
    totalMarks: "100",
    status: "Upcoming" as Exam["status"],
  });

  useEffect(() => {
    const existingExam = exams.find(
      (item) => String(item.id) === examId
    );

    if (existingExam) {
      setExam(existingExam);
      setFormData({
        name: existingExam.name,
        subject: existingExam.subject,
        className: existingExam.className,
        section: existingExam.section,
        examDate: existingExam.examDate,
        totalMarks: String(existingExam.totalMarks),
        status: existingExam.status,
      });
    }
  }, [examId]);

  function handleChange(
    field: keyof typeof formData,
    value: string
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!exam) return;

    const updatedExam: Exam = {
      ...exam,
      ...formData,
      totalMarks: Number(formData.totalMarks),
    };

    console.log("Updated exam:", updatedExam);
  }

  if (!exam) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
        <p className="font-medium text-gray-700">Exam not found.</p>
        <Link
          href="/teacher/exams"
          className="mt-4 inline-flex rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#015f58]"
        >
          Back to Exams
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10";

  return (
    <div className="space-y-5">
      <div>
        <Link
          href="/teacher/exams"
          className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#01796f]"
        >
          <ArrowLeft size={17} />
          Back to Exams
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Edit Exam
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the exam details for your class.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Exam Name
            </label>
            <input
              required
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={inputClass}
              placeholder="Enter exam name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Subject
            </label>
            <input
              required
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              className={inputClass}
              placeholder="Enter subject"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Class
            </label>
            <input
              required
              value={formData.className}
              onChange={(e) =>
                handleChange("className", e.target.value)
              }
              className={inputClass}
              placeholder="e.g. Grade 10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Section
            </label>
            <input
              required
              value={formData.section}
              onChange={(e) => handleChange("section", e.target.value)}
              className={inputClass}
              placeholder="e.g. A"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Exam Date
            </label>
            <input
              required
              type="date"
              value={formData.examDate}
              onChange={(e) =>
                handleChange("examDate", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Total Marks
            </label>
            <input
              required
              type="number"
              min="1"
              value={formData.totalMarks}
              onChange={(e) =>
                handleChange("totalMarks", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                handleChange("status", e.target.value)
              }
              className={inputClass}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          <Link
            href="/teacher/exams"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}