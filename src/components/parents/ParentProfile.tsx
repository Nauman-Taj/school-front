import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  Users,
} from "lucide-react";

import { Parent } from "@/types/parent";

type ParentProfileProps = {
  parent: Parent;
};

export default function ParentProfile({
  parent,
}: ParentProfileProps) {
  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/parents"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
      >
        <ArrowLeft size={17} />
        Back to Parents
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f4f2] text-xl font-bold text-[#01796f]">
            {parent.name
              .split(" ")
              .map((name) => name[0])
              .slice(0, 2)
              .join("")}
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {parent.name}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Parent
            </p>
          </div>
        </div>

        <Link
          href={`/dashboard/parents/${parent.id}/edit`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
        >
          <Pencil size={17} />
          Edit Parent
        </Link>
      </div>

      {/* Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Information */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Contact Information
          </h2>

          <div className="mt-5 space-y-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                <Mail size={18} />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Email
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {parent.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                <Phone size={18} />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Phone
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {parent.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                <MapPin size={18} />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Address
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {parent.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                <BriefcaseBusiness size={18} />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Occupation
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {parent.occupation}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Children */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-[#01796f]" />

            <h2 className="text-lg font-semibold text-gray-900">
              Children
            </h2>
          </div>

          <div className="mt-5 space-y-3">
            {parent.children.map((child, index) => (
              <div
                key={child}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {child}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Child {index + 1}
                  </p>
                </div>

                <span className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                  Student
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Account Status
        </h2>

        <div className="mt-4">
          <span
            className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${
              parent.status === "Active"
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {parent.status}
          </span>
        </div>
      </div>
    </div>
  );
}