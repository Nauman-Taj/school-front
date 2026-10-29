
"use client";

import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import type { SchoolClass } from "@/types/class";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type ClassFormProps = {
  schoolClass?: SchoolClass;
  classId?: string;
};

type ApiTeacher = {
  id: string;
  name: string;
  status?: "ACTIVE" | "INACTIVE";
};

type ApiSchoolClass = {
  id: number;
  name: string;
  section: string;
  teacherId: string;
  teacher: string | null;
  room: string;
  status: "ACTIVE" | "INACTIVE" | "Active" | "Inactive";
};

type ClassPayload = {
  name: string;
  section: string;
  teacherId: string;
  room: string;
  status: "ACTIVE" | "INACTIVE";
};

const classOptions = ["5", "6", "7", "8", "9", "10"];
const sectionOptions = ["A", "B"];

function mapApiClass(item: ApiSchoolClass): SchoolClass {
  return {
    id: item.id,
    name: item.name,
    section: item.section,
    teacherId: item.teacherId,
    teacher: item.teacher ?? "",
    room: item.room,
    status:
      item.status === "ACTIVE" || item.status === "Active"
        ? "Active"
        : "Inactive",
  };
}

export default function ClassForm({
  schoolClass,
  classId,
}: ClassFormProps) {
  const router = useRouter();
  const isEdit = Boolean(schoolClass || classId);

  const [formData, setFormData] = useState({
    name: schoolClass?.name ?? "",
    section: schoolClass?.section ?? "",
    teacherId: schoolClass?.teacherId ?? "",
    room: schoolClass?.room ?? "",
    status: schoolClass?.status ?? "Active",
  });

  const [teachers, setTeachers] = useState<ApiTeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const editId = classId ?? (
    schoolClass ? String(schoolClass.id) : undefined
  );

  const loadFormData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error(
          "Your session has expired. Please log in again."
        );
      }

      const teacherResponse = await apiRequest<ApiTeacher[]>(
        "/teachers",
        {
          method: "GET",
          token,
        }
      );

      setTeachers(teacherResponse);

      if (editId) {
        const numericId = Number(editId);

        if (!Number.isInteger(numericId) || numericId <= 0) {
          throw new Error("Invalid class ID.");
        }

        const response = await apiRequest<ApiSchoolClass>(
          `/classes/${numericId}`,
          {
            method: "GET",
            token,
          }
        );

        const loadedClass = mapApiClass(response);

        setFormData({
          name: loadedClass.name,
          section: loadedClass.section,
          teacherId: loadedClass.teacherId,
          room: loadedClass.room,
          status: loadedClass.status,
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load class information."
      );
    } finally {
      setLoading(false);
    }
  }, [editId]);

  useEffect(() => {
    void loadFormData();
  }, [loadFormData]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (saving) return;

    setError("");

    const selectedTeacher = teachers.find(
      (teacher) => teacher.id === formData.teacherId
    );

    if (!selectedTeacher) {
      setError("Please select a class teacher.");
      return;
    }

    const token = getAuthToken();

    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    const payload: ClassPayload = {
      name: formData.name,
      section: formData.section,
      teacherId: selectedTeacher.id,
      room: formData.room.trim(),
      status: formData.status === "Active" ? "ACTIVE" : "INACTIVE",
    };

    setSaving(true);

    try {
      if (isEdit) {
        const numericId = Number(editId);

        if (!Number.isInteger(numericId) || numericId <= 0) {
          throw new Error("Invalid class ID.");
        }

        await apiRequest<ApiSchoolClass>(`/classes/${numericId}`, {
          method: "PATCH",
          token,
          body: JSON.stringify(payload),
        });

        router.push(`/admin/classes/${numericId}`);
      } else {
        await apiRequest<ApiSchoolClass>("/classes", {
          method: "POST",
          token,
          body: JSON.stringify(payload),
        });

        router.push("/admin/classes");
      }

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Unable to ${isEdit ? "update" : "create"} this class.`
      );
    } finally {
      setSaving(false);
    }
  };

  const backHref = "/admin/classes";

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
        <p className="mt-4 text-sm text-gray-500">
          {isEdit ? "Loading class information..." : "Loading teachers..."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
      >
        <ArrowLeft size={17} />
        Back to Classes
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Class" : "Add Class"}
        </h1>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void loadFormData()}
            disabled={saving}
            className="self-start rounded-full border border-red-200 px-4 py-2 font-medium transition hover:bg-red-100 disabled:opacity-50 sm:self-auto"
          >
            Try again
          </button>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Class */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Class
            </label>

            <select
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={saving}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            >
              <option value="" disabled>
                Select class
              </option>

              {classOptions.map((className) => (
                <option key={className} value={`Grade ${className}`}>
                  Grade {className}
                </option>
              ))}
            </select>
          </div>

          {/* Section */}
          <div>
            <label
              htmlFor="section"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Section
            </label>

            <select
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
              disabled={saving}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            >
              <option value="" disabled>
                Select section
              </option>

              {sectionOptions.map((section) => (
                <option key={section} value={section}>
                  Section {section}
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
              Class Teacher
            </label>

            <select
              id="teacherId"
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              required
              disabled={saving}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
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

          {/* Room */}
          <div>
            <label
              htmlFor="room"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Classroom
            </label>

            <input
              id="room"
              name="room"
              type="text"
              value={formData.room}
              onChange={handleChange}
              placeholder="Enter classroom"
              required
              disabled={saving}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
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
              value={formData.status}
              onChange={handleChange}
              required
              disabled={saving}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <Link
            href={backHref}
            aria-disabled={saving}
            className={`inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 ${saving ? "pointer-events-none opacity-50" : ""
              }`}
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving || teachers.length === 0}
            className="inline-flex items-center justify-center rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : isEdit
                ? "Save Changes"
                : "Add Class"}
          </button>
        </div>
      </form>
    </div>
  );
}
