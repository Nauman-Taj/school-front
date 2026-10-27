
"use client";

import { useEffect, useState } from "react";
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

import type { Parent } from "@/types/parent";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type ParentProfileProps = {
  parentId: number;
};

type ParentApiResponse = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  occupation: string | null;
  status: string;
  children: {
    student: {
      id: number;
      name: string;
      className: string;
      section: string;
      rollNo: string | number;
      status: string;
    };
  }[];
};

export default function ParentProfile({
  parentId,
}: ParentProfileProps) {
  const [parent, setParent] = useState<Parent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadParent() {
      setLoading(true);
      setError("");

      const token = getAuthToken();

      if (!token) {
        if (!cancelled) {
          setError("Your session has expired. Please log in again.");
          setLoading(false);
        }
        return;
      }

      try {
        const data = await apiRequest<ParentApiResponse>(
          `/parents/${parentId}`,
          { token }
        );

        const normalizedParent: Parent = {
          id: data.id,
          name: data.name,
          email: data.email ?? "",
          phone: data.phone ?? "",
          address: data.address ?? "",
          occupation: data.occupation ?? "",
          status:
            data.status === "ACTIVE" || data.status === "Active"
              ? "Active"
              : "Inactive",
          children: (data.children ?? []).map(
            (relationship) => ({
              ...relationship.student,
              rollNo: String(relationship.student.rollNo),
            })
          ),
        };

        if (!cancelled) {
          setParent(normalizedParent);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load parent profile."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadParent();

    return () => {
      cancelled = true;
    };
  }, [parentId]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
        Loading parent profile...
      </div>
    );
  }

  if (error || !parent) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/parents"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
        >
          <ArrowLeft size={17} />
          Back to Parents
        </Link>

        <div
          role="alert"
          className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-700"
        >
          {error || "Parent not found."}
        </div>
      </div>
    );
  }

  const children = parent.children ?? [];

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/admin/parents"
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
              .filter(Boolean)
              .map((name) => name[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
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
          href={`/admin/parents/${parent.id}/edit`}
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
                <p className="mt-1 break-all text-sm text-gray-700">
                  {parent.email || "Not provided"}
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
                  {parent.phone || "Not provided"}
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
                <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">
                  {parent.address || "Not provided"}
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
                  {parent.occupation || "Not provided"}
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
            {children.length > 0 ? (
              children.map((child, index) => (
                <div
                  key={child.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {child.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {child.className}-{child.section} · Roll No.{" "}
                      {child.rollNo}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Child {index + 1}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                    Student
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                No children assigned.
              </p>
            )}
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
