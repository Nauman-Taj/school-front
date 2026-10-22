"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle } from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type ApiTeacher = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  qualification: string | null;
  joiningDate: string | null;
  status: "ACTIVE" | "INACTIVE";
};

type TeacherFormProps = {
  mode: "add" | "edit";
  teacherId?: string;
};

type TeacherFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  joiningDate: string;
  status: "ACTIVE" | "INACTIVE";
};

const initialFormData: TeacherFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  qualification: "",
  joiningDate: "",
  status: "ACTIVE",
};

const inputClassName =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796f] focus:ring-1 focus:ring-[#01796f]";

export default function TeacherForm({
  mode,
  teacherId,
}: TeacherFormProps) {
  const router = useRouter();

  const [formData, setFormData] =
    useState<TeacherFormData>(initialFormData);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchTeacher = useCallback(async () => {
    if (mode !== "edit" || !teacherId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const teacher = await apiRequest<ApiTeacher>(
        `/teachers/${encodeURIComponent(teacherId)}`,
        {
          method: "GET",
          token,
        },
      );

      setFormData({
        name: teacher.name ?? "",
        email: teacher.email ?? "",
        phone: teacher.phone ?? "",
        subject: teacher.subject ?? "",
        qualification: teacher.qualification ?? "",
        joiningDate: teacher.joiningDate
          ? teacher.joiningDate.slice(0, 10)
          : "",
        status: teacher.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load teacher details.",
      );
    } finally {
      setLoading(false);
    }
  }, [mode, teacherId]);

  useEffect(() => {
    void fetchTeacher();
  }, [fetchTeacher]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        qualification: formData.qualification.trim(),
        joiningDate: formData.joiningDate,
        status: formData.status,
      };

      if (mode === "edit") {
        if (!teacherId) {
          throw new Error("Teacher ID is missing.");
        }

        await apiRequest<ApiTeacher>(
          `/teachers/${encodeURIComponent(teacherId)}`,
          {
            method: "PATCH",
            token,
            body: JSON.stringify(payload),
          },
        );
      } else {
        await apiRequest<ApiTeacher>("/teachers", {
          method: "POST",
          token,
          body: JSON.stringify(payload),
        });
      }

      router.push("/admin/teachers");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Unable to ${mode === "edit" ? "update" : "create"} teacher.`,
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-gray-500">
        <LoaderCircle className="animate-spin" size={20} />
        Loading teacher details...
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-5">
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#01796f]"
        >
          <ArrowLeft size={17} />
          Back to Teachers
        </button>

        <h1 className="text-2xl font-bold text-gray-900">
          {mode === "add" ? "Add Teacher" : "Edit Teacher"}
        </h1>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
          {mode === "edit" && !loading && (
            <button
              type="button"
              onClick={() => void fetchTeacher()}
              className="ml-2 font-semibold underline"
            >
              Retry
            </button>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter teacher name"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="qualification"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Qualification
            </label>
            <input
              id="qualification"
              name="qualification"
              type="text"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Enter qualification"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="joiningDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Joining Date
            </label>
            <input
              id="joiningDate"
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={handleChange}
              required
              className={inputClassName}
            />
          </div>

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
              className={inputClassName}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={saving}
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving || (mode === "edit" && !teacherId)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving && <LoaderCircle size={16} className="animate-spin" />}
            {saving
              ? "Saving..."
              : mode === "add"
                ? "+ Add Teacher"
                : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}