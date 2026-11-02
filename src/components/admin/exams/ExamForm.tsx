"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


import { Exam } from "@/types/exam";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type ExamFormProps = {
  exam?: Exam;
  isEdit?: boolean;
};

type SubjectOption = {
  id: string;
  name: string;
  teacherId: string;
  className: string;
  section: string;
};

type ClassOption = { name: string; section: string };
type TeacherOption = { id: string; name: string };

export default function ExamForm({ exam, isEdit = false }: ExamFormProps) {
  const router = useRouter();

  const [name, setName] = useState(exam?.name ?? "");
  const [subjectId, setSubjectId] = useState(exam?.subjectId ?? "");
  const [className, setClassName] = useState(exam?.className ?? "");
  const [section, setSection] = useState(
    exam?.sections?.[0]?.section ?? exam?.section ?? "",
  );
  const [teacherId, setTeacherId] = useState(exam?.teacherId ?? "");
  const [examDate, setExamDate] = useState(exam?.examDate ?? "");
  const [totalMarks, setTotalMarks] = useState(
    exam?.totalMarks?.toString() ?? "",
  );
  const [status, setStatus] = useState<Exam["status"]>(
    exam?.status ?? "Upcoming",
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [referenceLoading, setReferenceLoading] = useState(true);
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [teachers, setTeachers] = useState<TeacherOption[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function loadOptions() {
      const token = getAuthToken();
      if (!token) {
        setError("Your session has expired. Please log in again.");
        setReferenceLoading(false);
        return;
      }
      try {
        const [subjectData, classData, teacherData] = await Promise.all([
          apiRequest<SubjectOption[]>("/subjects", { token }),
          apiRequest<ClassOption[]>("/classes", { token }),
          apiRequest<TeacherOption[]>("/teachers", { token }),
        ]);
        if (cancelled) return;
        setSubjects(subjectData);
        setClasses(classData);
        setTeachers(teacherData);
        setSection(exam?.sections?.[0]?.section ?? exam?.section ?? "");
      } catch (err) {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : "Unable to load exam options.",
          );
      } finally {
        if (!cancelled) setReferenceLoading(false);
      }
    }
    void loadOptions();
    return () => {
      cancelled = true;
    };
  }, [exam]);

  const classNames = useMemo(
    () => [...new Set(classes.map((item) => item.name))],
    [classes],
  );
  const sections = useMemo(
    () => classes.filter((item) => item.name === className),
    [classes, className],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = getAuthToken();
    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }
    if (!section) {
      setError("Select a section.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        name,
        subjectId,
        className,
        section,
        sections: [section],
        teacherId,
        examDate,
        totalMarks: Number(totalMarks),
        status: status === "Completed" ? "COMPLETED" : "UPCOMING",
      };
      await apiRequest(
        isEdit && exam ? `/exams/${encodeURIComponent(exam.id)}` : "/exams",
        {
          method: isEdit ? "PATCH" : "POST",
          token,
          body: JSON.stringify(payload),
        },
      );
      router.push("/admin/exams");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save exam.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">

      <Link
        href="/admin/exams"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
      >
        <ArrowLeft size={17} />
        Back to Exams
      </Link>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Exam" : "Add Exam"}
          </h1>
        </div>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
      >
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Exam Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mid Term Examination"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Subject
            </label>
            <select
              value={subjectId}
              onChange={(event) => {
                setSubjectId(event.target.value);
              }}
              disabled={referenceLoading || subjects.length === 0}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10 disabled:bg-gray-50"
            >
              <option value="">
                {referenceLoading ? "Loading subjects..." : "Select a subject"}
              </option>
              {subjects.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Class
            </label>

            <select
              value={className}
              onChange={(event) => {
                const nextClass = event.target.value;
                const nextSection =
                  classes.find((item) => item.name === nextClass)?.section ??
                  "";
                setClassName(nextClass);
                setSection(nextSection);
              }}
              disabled={referenceLoading || classNames.length === 0}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10 disabled:bg-gray-50"
            >
              <option value="">Select a class</option>
              {classNames.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Section
            </label>
            <select
              value={section}
              onChange={(event) => setSection(event.target.value)}
              disabled={referenceLoading || sections.length === 0}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10 disabled:bg-gray-50"
            >
              <option value="">Select a section</option>
              {sections.map((item) => (
                <option
                  key={`${item.name}-${item.section}`}
                  value={item.section}
                >
                  {item.section}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Teacher
            </label>

            <select
              value={teacherId}
              onChange={(event) => setTeacherId(event.target.value)}
              disabled={referenceLoading || teachers.length === 0}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10 disabled:bg-gray-50"
            >
              <option value="">Select a teacher</option>
              {teachers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Exam Date
            </label>

            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Total Marks
            </label>

            <input
              type="number"
              min="1"
              step="1"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              placeholder="e.g. 100"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Exam["status"])}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-small text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving || referenceLoading || subjects.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-small text-white transition hover:bg-[#015f58]"
          >
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Exam"}
          </button>
        </div>
      </form>
    </div>
  );
}
