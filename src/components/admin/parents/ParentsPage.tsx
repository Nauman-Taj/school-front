
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RefreshCw, UserPlus, Users } from "lucide-react";

import ParentTable from "./ParentTable";
import type { Parent } from "@/types/parent";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type BackendParent = {
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
      rollNo: string;
      status: string;
    };
  }[];
};

export default function ParentsPage() {
  const [parentList, setParentList] = useState<Parent[]>([]);
  const [totalChildren, setTotalChildren] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadParents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error(
          "Your session has expired. Please log in again.",
        );
      }

      const response = await apiRequest<BackendParent[]>("/parents", {
        method: "GET",
        token,
      });

      const mappedParents: Parent[] = response.map((parent) => ({
        id: parent.id,
        name: parent.name,
        email: parent.email ?? "",
        phone: parent.phone ?? "",
        address: parent.address ?? "",
        occupation: parent.occupation ?? "",
        status: parent.status === "ACTIVE" ? "Active" : "Inactive",
        children: parent.children.map(
          (relationship) => relationship.student,
        ),
      }));

      const childrenCount = response.reduce(
        (total, parent) => total + parent.children.length,
        0,
      );

      setParentList(mappedParents);
      setTotalChildren(childrenCount);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load parents from the server.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadParents();
  }, [loadParents]);

  const activeParents = useMemo(
    () =>
      parentList.filter((parent) => parent.status === "Active").length,
    [parentList],
  );

  const inactiveParents = useMemo(
    () =>
      parentList.filter((parent) => parent.status === "Inactive").length,
    [parentList],
  );

  const stats = [
    {
      title: "Total Parents",
      value: parentList.length,
      valueClass: "text-gray-800",
    },
    {
      title: "Active Parents",
      value: activeParents,
      valueClass: "text-[#01796F]",
    },
    {
      title: "Inactive Parents",
      value: inactiveParents,
      valueClass: "text-gray-600",
    },
    {
      title: "Total Children",
      value: totalChildren,
      valueClass: "text-gray-800",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Parents
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage parents and their children.
          </p>
        </div>

        <Link
          href="/admin/parents/add"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          <UserPlus size={18} />
          Add Parent
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>

            <p
              className={`mt-2 text-2xl font-bold ${stat.valueClass}`}
            >
              {loading ? "0" : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Backend error */}
      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={() => void loadParents()}
            disabled={loading}
            className="self-start rounded-full border border-red-200 px-4 py-2 font-medium transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          >
            Try again
          </button>
        </div>
      )}

      {/* Refresh and list */}
      <div className="space-y-4">

        {loading ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />

            <p className="mt-4 text-sm text-gray-500">
              Loading parents...
            </p>
          </div>
        ) : !error ? (
          <ParentTable
            parentList={parentList}
            setParentList={setParentList}
            onRefresh={loadParents}
            loading={loading}
          />
        ) : null}
      </div>
    </div>
  );
}
