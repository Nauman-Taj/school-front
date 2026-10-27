
"use client";

import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import ParentForm from "@/components/admin/parents/ParentForm";
import type { Parent, ParentChild } from "@/types/parent";

type ApiParent = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  occupation: string | null;
  status: "ACTIVE" | "INACTIVE";
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

type ParentEditLoaderProps = {
  id: string;
};

export default function ParentEditLoader({
  id,
}: ParentEditLoaderProps) {
  const [parent, setParent] = useState<Parent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadParent() {
      try {
        setLoading(true);
        setError("");

        const token = getAuthToken();

        if (!token) {
          throw new Error(
            "Your session has expired. Please log in again."
          );
        }

        const data = await apiRequest<ApiParent>(
          `/parents/${encodeURIComponent(id)}`,
          {
            method: "GET",
            token,
          }
        );

        const children: ParentChild[] = (data.children ?? []).map(
          ({ student }) => ({
            id: student.id,
            name: student.name,
            className: student.className,
            section: student.section,
            rollNo: String(student.rollNo),
            status: student.status,
          })
        );

        const mappedParent: Parent = {
          id: data.id,
          name: data.name,
          email: data.email ?? "",
          phone: data.phone ?? "",
          address: data.address ?? "",
          occupation: data.occupation ?? "",
          status: data.status === "INACTIVE" ? "Inactive" : "Active",
          children,
        };

        if (!cancelled) {
          setParent(mappedParent);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load parent details."
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
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        Loading parent details...
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
      >
        {error}
      </div>
    );
  }

  if (!parent) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        Parent not found.
      </div>
    );
  }

  return <ParentForm mode="edit" parent={parent} />;
}
