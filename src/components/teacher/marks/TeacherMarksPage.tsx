"use client";

import { useEffect, useMemo, useState } from "react";

import {
  fetchTeacherExamDetail,
  fetchTeacherExams,
  saveTeacherMark,
} from "@/lib/teacher-api";
import type {
  ApiTeacherExamDetail,
  TeacherExam,
} from "@/lib/teacher-api";

import TeacherMarksTable from "./TeacherMarksTable";

export default function TeacherMarksPage() {
  const [examId, setExamId] = useState("");

  const [exams, setExams] = useState<TeacherExam[]>([]);
  const [detail, setDetail] = useState<ApiTeacherExamDetail | null>(null);
  const [marks, setMarks] = useState<Record<number, string>>({});
  const [loadedExamId, setLoadedExamId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // The sheet is loading while the selected exam is not the loaded one. With
  // no exam selected there is nothing to load, so the page is not loading.
  const loading = examId !== "" && examId !== loadedExamId;

  useEffect(() => {
    let active = true;

    fetchTeacherExams()
      .then((data) => {
        if (!active) return;
        setExams(data);
        if (data.length > 0) {
          setExamId(data[0].id);
        } else {
          setLoadedExamId("");
        }
      })
      .catch((err: unknown) => {
        if (!active) return;
        setMessage({
          type: "error",
          text:
            err instanceof Error
              ? err.message
              : "Unable to load your exams.",
        });
        setLoadedExamId("");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    // No exam is selected, so there is nothing to load.
    if (!examId) return;

    let active = true;

    fetchTeacherExamDetail(examId)
      .then((data) => {
        if (!active) return;

        setDetail(data);
        setMarks(
          Object.fromEntries(
            data.students.map((student) => [
              student.studentId,
              student.obtainedMarks === null
                ? ""
                : String(student.obtainedMarks),
            ])
          )
        );
        setLoadedExamId(examId);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setDetail(null);
        setMessage({
          type: "error",
          text:
            err instanceof Error
              ? err.message
              : "Unable to load the exam.",
        });
        setLoadedExamId(examId);
      });

    return () => {
      active = false;
    };
  }, [examId]);

  const selectedExam = useMemo(
    () => exams.find((exam) => exam.id === examId) ?? null,
    [exams, examId]
  );

  const handleSave = async () => {
    if (!detail) return;

    setSaving(true);
    setMessage(null);

    try {
      for (const student of detail.students) {
        const value = marks[student.studentId];

        if (value === undefined || value.trim() === "") continue;

        const obtainedMarks = Number(value);

        if (Number.isNaN(obtainedMarks)) continue;

        await saveTeacherMark({
          studentId: student.studentId,
          examId: detail.exam.id,
          obtainedMarks,
          resultId: student.resultId,
        });
      }

      const refreshed = await fetchTeacherExamDetail(detail.exam.id);

      setDetail(refreshed);
      setMarks(
        Object.fromEntries(
          refreshed.students.map((student) => [
            student.studentId,
            student.obtainedMarks === null
              ? ""
              : String(student.obtainedMarks),
          ])
        )
      );

      setMessage({ type: "success", text: "Marks saved successfully." });
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "Could not save the marks. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Marks
      </h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        Enter and manage marks for students in your assigned exams.
      </p>
    </div>
  );

  return (
    <div className="space-y-5">
      {header}

      {message && (
        <div
          role="status"
          className={`rounded-2xl border p-4 text-sm ${
            message.type === "success"
              ? "border-[#01796f]/15 bg-[#e6f4f2] text-[#015f58]"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Exam picker */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <label
          htmlFor="marksExam"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Exam
        </label>

        <select
          id="marksExam"
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          className="w-full max-w-md rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/20"
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

      {loading ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading the marks sheet...
          </p>
        </div>
      ) : examId ? (
        <TeacherMarksTable
          exam={selectedExam}
          detail={detail}
          marks={marks}
          setMarks={setMarks}
          onSave={handleSave}
          saving={saving}
        />
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-medium text-gray-700">
            No exam selected
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Choose an exam above to enter the marks of its students.
          </p>
        </div>
      )}
    </div>
  );
}
