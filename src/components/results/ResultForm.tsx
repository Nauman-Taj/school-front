"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Result } from "@/types/result";

type ResultFormProps = {
  result?: Result;
};

export default function ResultForm({ result }: ResultFormProps) {
  const isEdit = !!result;

  const [formData, setFormData] = useState({
    studentName: result?.studentName || "",
    rollNo: result?.rollNo || "",
    className: result?.className || "",
    exam: result?.exam || "",
    subject: result?.subject || "",
    teacher: result?.teacher || "",
    totalMarks: result?.totalMarks?.toString() || "100",
    obtainedMarks: result?.obtainedMarks?.toString() || "",
  });

  const totalMarks = Number(formData.totalMarks);
  const obtainedMarks = Number(formData.obtainedMarks);
  const router = useRouter();

  const percentage =
    totalMarks > 0 && obtainedMarks >= 0
      ? Math.round((obtainedMarks / totalMarks) * 100)
      : 0;

  const getGrade = () => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
  };

  const grade =
    formData.obtainedMarks !== "" ? getGrade() : "";

  const status =
    formData.obtainedMarks !== ""
      ? percentage >= 40
        ? "Pass"
        : "Fail"
      : "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const resultData = {
    ...formData,
    totalMarks,
    obtainedMarks,
    percentage,
    grade,
    status,
  };

  console.log(resultData);

  router.push("/dashboard/results");
};

  return (
    <div className="space-y-5">
      <Link
        href="/dashboard/results"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
      >
        <ArrowLeft size={17} />
        Back to Results
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Result" : "Add Result"}
        </h1>
        {/* <p className="mt-1 text-sm text-gray-500">
          {isEdit
            ? "Update the student's examination result."
            : "Add a new student examination result."}
        </p> */}
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl max-w-5xl border border-gray-200 bg-white p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Student */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Student Name
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter student name"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
              required
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Roll Number
            </label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="Enter roll number"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
              required
            />
          </div>

          {/* Class */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Class
            </label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
              required
            >
              <option value="">Select class</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
            </select>
          </div>

          {/* Exam */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Exam
            </label>
            <input
              type="text"
              name="exam"
              value={formData.exam}
              onChange={handleChange}
              placeholder="Enter exam name"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
              required
            />
          </div>

          {/* Teacher */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Teacher
            </label>
            <input
              type="text"
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              placeholder="Enter teacher name"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
              required
            />
          </div>

          {/* Total Marks */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Total Marks
            </label>
            <input
              type="number"
              name="totalMarks"
              value={formData.totalMarks}
              onChange={handleChange}
              min="1"
              placeholder="100"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
              required
            />
          </div>

          {/* Obtained Marks */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Obtained Marks
            </label>
            <input
              type="number"
              name="obtainedMarks"
              value={formData.obtainedMarks}
              onChange={handleChange}
              min="0"
              max={totalMarks || undefined}
              placeholder="Enter obtained marks"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f]"
              required
            />
          </div>
        </div>

        {/* Calculated Result */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-[#e6f4f2] p-4">
            <p className="text-xs font-medium text-gray-500">
              Percentage
            </p>
            <p className="mt-1 text-xl font-bold text-[#01796f]">
              {formData.obtainedMarks !== ""
                ? `${percentage}%`
                : "--"}
            </p>
          </div>

          <div className="rounded-xl bg-[#e6f4f2] p-4">
            <p className="text-xs font-medium text-gray-500">
              Grade
            </p>
            <p className="mt-1 text-xl font-bold text-[#01796f]">
              {grade || "--"}
            </p>
          </div>

          <div className="rounded-xl bg-[#e6f4f2] p-4">
            <p className="text-xs font-medium text-gray-500">
              Status
            </p>
            <p
              className={`mt-1 text-xl font-bold ${
                status === "Fail"
                  ? "text-red-600"
                  : "text-[#01796f]"
              }`}
            >
              {status || "--"}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
          <Link
            href="/dashboard/results"
            className="rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            {isEdit ? "Update Result" : "Add Result"}
          </button>
        </div>
      </form>
    </div>
  );
}