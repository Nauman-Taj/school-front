"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { students } from "@/data/students";
import { exams } from "@/data/exams";
import { subjects } from "@/data/subjects";
import { teachers } from "@/data/teachers";

type ResultFormProps = {
  result?: {
    id: string;
    studentId: number;
    student: string;
    examId: string;
    subjectId: string;
    subject: string;
    teacherId: string;
    teacher: string;
    className: string;
    section: string;
    obtainedMarks: number;
    totalMarks: number;
    percentage: number;
    grade: string;
    status: "Pass" | "Fail";
  };
};

export default function ResultForm({
  result,
}: ResultFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    studentId: result?.studentId?.toString() ?? "",
    examId: result?.examId ?? "",
    subjectId: result?.subjectId ?? "",
    teacherId: result?.teacherId ?? "",
    obtainedMarks: result?.obtainedMarks?.toString() ?? "",
    totalMarks: result?.totalMarks?.toString() ?? "",
  });

  const isEditMode = Boolean(result);
  const [loading, setLoading] = useState(false);

  const selectedStudent = students.find(
    (student) => student.id === Number(formData.studentId)
  );

  const selectedExam = exams.find(
    (exam) => exam.id === formData.examId
  );

  const selectedSubject = subjects.find(
    (subject) => subject.id === formData.subjectId
  );

  const selectedTeacher = teachers.find(
    (teacher) => teacher.id === formData.teacherId
  );

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

    const obtainedMarks = Number(formData.obtainedMarks);
    const totalMarks = Number(formData.totalMarks);

    const percentage =
      totalMarks > 0
        ? Number(((obtainedMarks / totalMarks) * 100).toFixed(2))
        : 0;

    let grade = "F";

    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";

    const status: "Pass" | "Fail" =
      percentage >= 50 ? "Pass" : "Fail";

    if (
      !selectedStudent ||
      !selectedExam ||
      !selectedSubject ||
      !selectedTeacher
    ) {
      setLoading(false);
      return;
    }

    const resultData = {
      id: result?.id,
      studentId: selectedStudent.id,
      student: selectedStudent.name,

      examId: selectedExam.id,

      subjectId: selectedSubject.id,
      subject: selectedSubject.name,

      teacherId: selectedTeacher.id,
      teacher: selectedTeacher.name,

      className: selectedStudent.className,
      section: selectedStudent.section,

      obtainedMarks,
      totalMarks,
      percentage,
      grade,
      status,
    };

    console.log("Result Data:", resultData);

    setTimeout(() => {
      setLoading(false);
      router.push("/admin/results");
    }, 700);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Student */}
        <div>
          <label
            htmlFor="studentId"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Student
          </label>

          <select
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option value="">Select student</option>

            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} — {student.className}-{student.section}
              </option>
            ))}
          </select>
        </div>

        {/* Exam */}
        <div>
          <label
            htmlFor="examId"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Exam
          </label>

          <select
            id="examId"
            name="examId"
            value={formData.examId}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option value="">Select exam</option>

            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name} — {exam.subject} ({exam.className}-
                {exam.section})
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subjectId"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Subject
          </label>

          <select
            id="subjectId"
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option value="">Select subject</option>

            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name} — {subject.className}-{subject.section}
              </option>
            ))}
          </select>
        </div>

        {/* Teacher */}
        <div>
          <label
            htmlFor="teacherId"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Teacher
          </label>

          <select
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option value="">Select teacher</option>

            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        {/* Class */}
        <div>
          <label
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Class
          </label>

          <input
            type="text"
            value={
              selectedStudent
                ? selectedStudent.className
                : ""
            }
            readOnly
            placeholder="Select student"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none"
          />
        </div>

        {/* Section */}
        <div>
          <label
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Section
          </label>

          <input
            type="text"
            value={
              selectedStudent
                ? selectedStudent.section
                : ""
            }
            readOnly
            placeholder="Select student"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none"
          />
        </div>

        {/* Obtained Marks */}
        <div>
          <label
            htmlFor="obtainedMarks"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Obtained Marks
          </label>

          <input
            id="obtainedMarks"
            name="obtainedMarks"
            type="number"
            min="0"
            value={formData.obtainedMarks}
            onChange={handleChange}
            placeholder="Enter obtained marks"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
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
            value={formData.totalMarks}
            onChange={handleChange}
            placeholder="Enter total marks"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/results")}
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
              : "Add Result"}
        </button>
      </div>
    </form>
  );
}
