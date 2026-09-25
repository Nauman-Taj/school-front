"use client";

import {
  Mail,
  Phone,
  UserRound,
  GraduationCap,
  UsersRound,
  ShieldCheck,
} from "lucide-react";

import { students } from "@/data/students";

export default function StudentProfilePage() {
  const currentStudent = students.find(
    (student) => student.id === 1
  );

  if (!currentStudent) {
    return (
      <div className="space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            View your personal and academic information.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Student profile not found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your personal and academic information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
            <UserRound size={36} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {currentStudent.name}
            </h2>

            <p className="mt-1 text-sm text-[#01796f]">
              Student
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {currentStudent.className} - {currentStudent.section}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          Personal Information
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Mail
              className="mt-0.5 text-[#01796f]"
              size={19}
            />

            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Email
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {currentStudent.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone
              className="mt-0.5 text-[#01796f]"
              size={19}
            />

            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Phone
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {currentStudent.phone}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <UsersRound
              className="mt-0.5 text-[#01796f]"
              size={19}
            />

            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Parent / Guardian
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {currentStudent.parentName}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck
              className="mt-0.5 text-[#01796f]"
              size={19}
            />

            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Student ID
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {currentStudent.id}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796f]">
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
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-900">
              Class
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {currentStudent.className} - {currentStudent.section}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-900">
              Roll Number
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {currentStudent.rollNo}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-900">
              Student ID
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {currentStudent.id}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-900">
              Status
            </p>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                currentStudent.status === "Active"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {currentStudent.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}