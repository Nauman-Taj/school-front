"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  Mail,
  Phone,
  UserRound,
  GraduationCap,
  UsersRound,
  ShieldCheck,
  Pencil,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { getSession } from "@/lib/auth";
import {
  getRegisteredProfile,
  saveRegisteredProfile,
} from "@/lib/registeredProfiles";
import { students } from "@/data/students";

type StudentProfile = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  applyingClass?: string;
  guardianName?: string;
  parentName?: string;
  status?: string;
  className?: string;
  section?: string;
  rollNo?: string | number;
  [key: string]: unknown;
};

type Feedback = {
  type: "success" | "error";
  message: string;
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10";

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

export default function StudentProfilePage() {
  const [session, setSession] = useState<ReturnType<typeof getSession>>(null);
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guardianName: "",
  });

  useEffect(() => {
    const activeSession = getSession();
    setSession(activeSession);

    if (!activeSession || activeSession.role !== "Student") return;

    const registered = getRegisteredProfile<StudentProfile>(
      "Student",
      activeSession
    );

    const shared = students.find(
      (student) =>
        student.email?.trim().toLowerCase() ===
        activeSession.email.trim().toLowerCase() ||
        student.name.trim().toLowerCase() ===
        activeSession.name.trim().toLowerCase()
    );

    const student = registered ?? shared ?? null;

    if (!student) return;

    setCurrentStudent(student);

    setForm({
      name: student.name ?? "",
      email: student.email ?? activeSession.email ?? "",
      phone: student.phone ?? "",
      guardianName:
        ("guardianName" in student ? student.guardianName : undefined) ??
        ("parentName" in student ? student.parentName : undefined) ??
        "",
    });
  }, []);

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const cancelEditing = () => {
    if (!currentStudent) return;

    setForm({
      name: currentStudent.name ?? "",
      email: currentStudent.email ?? session?.email ?? "",
      phone: currentStudent.phone ?? "",
      guardianName:
        currentStudent.guardianName ??
        currentStudent.parentName ??
        "",
    });

    setIsEditing(false);
    setFeedback(null);
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (!currentStudent || !session) return;

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email) {
      setFeedback({
        type: "error",
        message: "Name and email address are required.",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setSaving(true);

    try {
      const updatedStudent: StudentProfile = {
        ...currentStudent,
        name,
        email,
        phone: form.phone.trim(),
        guardianName: form.guardianName.trim(),
      };

      saveRegisteredProfile("Student", updatedStudent);

      const updatedSession = {
        ...session,
        name,
        email,
      };

      if (localStorage.getItem("auth-session") !== null) {
        localStorage.setItem(
          "auth-session",
          JSON.stringify(updatedSession)
        );
      } else if (sessionStorage.getItem("auth-session") !== null) {
        sessionStorage.setItem(
          "auth-session",
          JSON.stringify(updatedSession)
        );
      }

      setSession(updatedSession);
      setCurrentStudent(updatedStudent);
      setForm({
        name,
        email,
        phone: updatedStudent.phone ?? "",
        guardianName: updatedStudent.guardianName ?? "",
      });
      setIsEditing(false);

      setFeedback({
        type: "success",
        message: "Your profile has been saved successfully.",
      });
    } catch {
      setFeedback({
        type: "error",
        message: "Unable to save your profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!session || session.role !== "Student") {
    return (
      <div className="space-y-5">
        <PageHeader />
        <EmptyState message="Please sign in with a student account to view your profile." />
      </div>
    );
  }

  if (!currentStudent) {
    return (
      <div className="space-y-5">
        <PageHeader />
        <EmptyState message="Student profile not found. Please contact the school administration." />
      </div>
    );
  }

  const classLabel =
    currentStudent.className && currentStudent.section
      ? `${currentStudent.className} - ${currentStudent.section}`
      : currentStudent.applyingClass || "Not assigned";

  const guardian =
    currentStudent.guardianName ??
    currentStudent.parentName ??
    "Not provided";

  const status = currentStudent.status ?? "Active";

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader />

      </div>

      {feedback && (
        <div
          role="status"
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${feedback.type === "success"
            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
            : "border-red-200 bg-red-50 text-red-700"
            }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
          )}
          <p>{feedback.message}</p>
        </div>
      )}

      {/* Profile Card */}
      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-row items-center gap-3 sm:gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f] sm:h-20 sm:w-20">
            <UserRound size={28} className="sm:hidden" />
            <UserRound size={36} className="hidden sm:block" />
          </div>

          <div className="min-w-0 ">
            <h2 className="truncate text-base font-bold text-gray-900 sm:text-xl">
              {currentStudent.name}
            </h2>
            <p className="mt-1 text-sm text-[#01796f]">Student</p>
            <p className="mt-1 truncate text-xs text-gray-500 sm:text-sm">
              {classLabel}
            </p>
          </div>

          <div className="ml-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  cancelEditing();
                } else {
                  setFeedback(null);
                  setIsEditing(true);
                }
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#01796f] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#015f58] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              {isEditing ? <X size={14} /> : <Pencil size={14} />}
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>
      </section>

      {/* Personal Information */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          Personal Information
        </h2>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Full Name" required>
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  maxLength={100}
                  required
                />
              </FormField>

              <FormField label="Email Address" required>
                <input
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  maxLength={150}
                  required
                />
              </FormField>

              <FormField label="Phone Number">
                <input
                  type="tel"
                  className={inputClass}
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                  maxLength={30}
                />
              </FormField>

              <FormField label="Parent / Guardian">
                <input
                  className={inputClass}
                  value={form.guardianName}
                  onChange={(event) =>
                    updateField("guardianName", event.target.value)
                  }
                  maxLength={100}
                />
              </FormField>
            </div>

            <div className="rounded-xl bg-[#f6f8f8] p-4 text-sm text-gray-600">
              Class, roll number, student ID, and status are managed by the
              school and cannot be changed here.
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={cancelEditing}
                className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            <InfoItem
              icon={<UserRound size={19} />}
              label="Full Name"
              value={currentStudent.name}
            />
            <InfoItem
              icon={<Mail size={19} />}
              label="Email"
              value={currentStudent.email || "Not provided"}
            />
            <InfoItem
              icon={<Phone size={19} />}
              label="Phone"
              value={currentStudent.phone || "Not provided"}
            />
            <InfoItem
              icon={<UsersRound size={19} />}
              label="Parent / Guardian"
              value={guardian}
            />
          </div>
        )}
      </section>

      {/* Academic Information */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796f]">
            <GraduationCap size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Academic Information
            </h2>
            <p className="text-sm text-gray-500">
              Your current academic information.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <AcademicCard label="Class" value={classLabel} />

          <AcademicCard
            label="Roll Number"
            value={
              currentStudent.rollNo != null
                ? String(currentStudent.rollNo)
                : "Not assigned"
            }
          />

          <AcademicCard
            label="Student ID"
            value={String(currentStudent.id)}
            icon={<ShieldCheck size={17} />}
          />

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-900">Status</p>
            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${status.toLowerCase() === "active"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
                }`}
            >
              {status}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function PageHeader() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Profile
      </h1>
      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        View your personal and academic information.
      </p>
    </div>
  );
}

function FormField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="mt-0.5 rounded-full bg-[#e6f4f2] p-2 text-[#01796f]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase text-gray-400">
          {label}
        </p>
        <p className="mt-1 break-words text-sm text-gray-700">{value}</p>
      </div>
    </div>
  );
}

function AcademicCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2">
        {icon && <span className="text-[#01796f]">{icon}</span>}
        <p className="text-sm font-semibold text-gray-900">{label}</p>
      </div>
      <p className="mt-1 text-sm text-gray-500">{value}</p>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <UserRound className="mx-auto mb-3 h-10 w-10 text-gray-400" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}