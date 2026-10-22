"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Pencil,
  BookOpen,
  GraduationCap,
  CalendarDays,
  LoaderCircle,
} from "lucide-react";

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

type TeacherDetailsProps = {
  teacherId: string;
};

export default function TeacherDetails({
  teacherId,
}: TeacherDetailsProps) {
  const [teacher, setTeacher] = useState<ApiTeacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTeacher = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error(
          "Your session has expired. Please log in again.",
        );
      }

      const response = await apiRequest<ApiTeacher>(
        `/teachers/${encodeURIComponent(teacherId)}`,
        {
          method: "GET",
          token,
        },
      );

      setTeacher(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load teacher details.",
      );
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  useEffect(() => {
    void fetchTeacher();
  }, [fetchTeacher]);

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-gray-500">
        <LoaderCircle size={20} className="animate-spin" />
        Loading teacher details...
      </div>
    );
  }

  if (error || !teacher) {
    return (
      <div className="space-y-5">
        <Link
          href="/admin/teachers"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
        >
          <ArrowLeft size={17} />
          Back to Teachers
        </Link>

        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-5"
        >
          <p className="text-sm text-red-700">
            {error || "Teacher not found."}
          </p>

          <button
            type="button"
            onClick={() => void fetchTeacher()}
            className="mt-3 rounded-full bg-[#01796f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const joiningDate = teacher.joiningDate
    ? new Date(teacher.joiningDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : "Not provided";

  const statusLabel =
    teacher.status === "ACTIVE" ? "Active" : "Inactive";

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/admin/teachers"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
      >
        <ArrowLeft size={17} />
        Back to Teachers
      </Link>

      {/* Profile Header */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
              <User size={30} strokeWidth={1.7} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {teacher.name}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Teacher ID {teacher.id} · {teacher.subject || "No subject"}
              </p>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  teacher.status === "ACTIVE"
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {statusLabel}
              </span>
            </div>
          </div>

          <Link
            href={`/admin/teachers/${encodeURIComponent(teacher.id)}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
          >
            <Pencil size={17} />
            Edit Teacher
          </Link>
        </div>
      </div>

      {/* Teacher Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Professional Information */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Professional Information
          </h2>

          <div className="mt-5 divide-y divide-gray-100">
            <InfoRow label="Teacher ID" value={teacher.id} />
            <InfoRow
              label="Subject"
              value={teacher.subject || "Not provided"}
            />
            <InfoRow
              label="Qualification"
              value={teacher.qualification || "Not provided"}
            />
            <InfoRow label="Joining Date" value={joiningDate} />
            <InfoRow label="Status" value={statusLabel} />
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Contact Information
          </h2>

          <div className="mt-5 space-y-5">
            <ContactRow
              icon={<Mail size={18} />}
              label="Email"
              value={teacher.email || "Not provided"}
            />

            <ContactRow
              icon={<Phone size={18} />}
              label="Phone"
              value={teacher.phone || "Not provided"}
            />

            <ContactRow
              icon={<BookOpen size={18} />}
              label="Subject"
              value={teacher.subject || "Not provided"}
            />

            <ContactRow
              icon={<GraduationCap size={18} />}
              label="Qualification"
              value={teacher.qualification || "Not provided"}
            />

            <ContactRow
              icon={<CalendarDays size={18} />}
              label="Joining Date"
              value={joiningDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <span className="text-sm text-gray-500">{label}</span>

      <span className="text-right text-sm font-medium text-gray-900">
        {value}
      </span>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-gray-50 p-2 text-gray-500">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>

        <p className="mt-1 break-words text-sm font-medium text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}