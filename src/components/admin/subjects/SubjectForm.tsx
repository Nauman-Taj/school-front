
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CaseSensitive,
  BookOpen,
  GraduationCap,
  UserRound,
  Layers,
  ChevronDown,
} from "lucide-react";

import type { Subject } from "@/types/subject";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type SubjectFormProps = {
  subject?: Subject;
  isEdit?: boolean;
};

type ApiTeacher = {
  id: string;
  name: string;
};

type ApiClass = {
  id: number;
  name: string;
  section: string;
  status: "ACTIVE" | "INACTIVE";
};

type ApiSubject = {
  id: string;
};

type SubjectFormData = {
  name: string;
  code: string;
  teacherId: string;
  className: string;
  section: string;
  status: "ACTIVE" | "INACTIVE";
};

export default function SubjectForm({
  subject,
  isEdit = false,
}: SubjectFormProps) {
  const router = useRouter();

  const [teachers, setTeachers] = useState<ApiTeacher[]>([]);
  const [classes, setClasses] = useState<ApiClass[]>([]);
  const [subjects, setSubjects] = useState<ApiSubject[]>([]);

  const [selectedClass, setSelectedClass] = useState(
    subject?.className || ""
  );
  const [selectedSection, setSelectedSection] = useState(
    subject?.section || ""
  );

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadFormData = useCallback(async () => {
    const token = getAuthToken();

    if (!token) {
      setError("Your session has expired. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [teacherData, classData, subjectData] = await Promise.all([
        apiRequest<ApiTeacher[]>("/teachers", { token }),
        apiRequest<ApiClass[]>("/classes", { token }),
        apiRequest<ApiSubject[]>("/subjects", { token }),
      ]);

      setTeachers(teacherData);
      setClasses(classData);
      setSubjects(subjectData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load form data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFormData();
  }, [loadFormData]);

  const availableClasses = classes.filter(
    (schoolClass) => schoolClass.status === "ACTIVE"
  );

  const classNames = Array.from(
    new Set(availableClasses.map((item) => item.name))
  );

  const availableSections = availableClasses
    .filter((item) => item.name === selectedClass)
    .map((item) => item.section);

  const handleClassChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedClass(e.target.value);
    setSelectedSection("");
  };

  const handleSectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSection(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const token = getAuthToken();

    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const subjectData: SubjectFormData = {
      name: (formData.get("name") as string).trim(),
      code: (formData.get("code") as string).trim(),
      teacherId: formData.get("teacherId") as string,
      className: selectedClass,
      section: selectedSection,
      status:
        formData.get("status") === "Inactive"
          ? "INACTIVE"
          : "ACTIVE",
    };

    if (!subjectData.teacherId) {
      setError("Please select a teacher.");
      return;
    }

    if (
      !availableClasses.some(
        (schoolClass) =>
          schoolClass.name === subjectData.className &&
          schoolClass.section === subjectData.section
      )
    ) {
      setError("Please select a valid active class and section.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      if (isEdit && subject) {
        await apiRequest(
          `/subjects/${encodeURIComponent(subject.id)}`,
          {
            method: "PATCH",
            token,
            body: JSON.stringify(subjectData),
          }
        );
      } else {
        const usedIds = new Set(
          subjects.map((item) => item.id)
        );

        let nextNumber = 1;

        while (
          usedIds.has(`SUB${String(nextNumber).padStart(3, "0")}`)
        ) {
          nextNumber++;
        }

        await apiRequest("/subjects", {
          method: "POST",
          token,
          body: JSON.stringify({
            id: `SUB${String(nextNumber).padStart(3, "0")}`,
            ...subjectData,
          }),
        });
      }

      router.push("/admin/subjects");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to ${isEdit ? "update" : "create"} subject.`
      );
    } finally {
      setSubmitting(false);
    }
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

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-48 items-center justify-center rounded-2xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-[#01796F]" />
            Loading form data...
          </div>
        </div>
      ) : (
        <div className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-6">
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

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
                  value={selectedClass}
                  onChange={handleClassChange}
                  required
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                >
                  <option value="" disabled>
                    Select class
                  </option>

                  {classNames.map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                />
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
                  value={selectedSection}
                  onChange={handleSectionChange}
                  required
                  disabled={!selectedClass}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                >
                  <option value="" disabled>
                    Select section
                  </option>

                  {availableSections.map((section) => (
                    <option key={section} value={section}>
                      Section {section}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                />
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
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
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
                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                />
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
                className="w-full rounded-xl border border-gray-200 bg-white pl-4 pr-10 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
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
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting || loading}
                className="rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Saving..."
                  : isEdit
                    ? "Update Subject"
                    : "Add Subject"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
