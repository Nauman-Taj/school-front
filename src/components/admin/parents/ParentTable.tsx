
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Search,
  Trash2,
  RefreshCw,
} from "lucide-react";

import ParentCard from "./ParentCard";
import type { Parent } from "@/types/parent";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type ParentTableProps = {
  parentList: Parent[];
  setParentList: React.Dispatch<React.SetStateAction<Parent[]>>;
  onRefresh: () => Promise<void>;
  loading: boolean;
};

export default function ParentTable({
  parentList,
  setParentList,
  onRefresh,
  loading,
}: ParentTableProps) {
  const [search, setSearch] = useState("");
  const [deletingParentId, setDeletingParentId] = useState<number | null>(
    null,
  );
  const [error, setError] = useState("");

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Permanently delete ${name} (ID: ${id})?\n\n` +
      "This action cannot be undone. Continue?",
    );

    if (!confirmed) return;

    setDeletingParentId(id);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error(
          "Your session has expired. Please log in again.",
        );
      }

      await apiRequest<void>(`/parents/${id}`, {
        method: "DELETE",
        token,
      });

      setParentList((currentParents) =>
        currentParents.filter((parent) => parent.id !== id),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete this parent. Please try again.",
      );
    } finally {
      setDeletingParentId(null);
    }
  };

  const filteredParents = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) return parentList;

    return parentList.filter((parent) => {
      const children = parent.children ?? [];

      const parentFields = [
        String(parent.id),
        parent.name,
        parent.email,
        parent.phone,
        parent.address,
        parent.occupation,
        parent.status,
      ];

      const matchesParent = parentFields.some((value) =>
        value.toLowerCase().includes(searchValue),
      );

      const matchesChild = children.some((child) =>
        [
          child.name,
          child.className,
          child.section,
          child.rollNo,
          child.status,
        ].some((value) =>
          String(value ?? "").toLowerCase().includes(searchValue),
        ),
      );

      return matchesParent || matchesChild;
    });
  }, [parentList, search]);

  return (
    <div className="space-y-5">
      {/* Delete error */}
      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={() => setError("")}
            className="self-start rounded-full border border-red-200 px-4 py-2 font-medium transition hover:bg-red-100 sm:self-auto"
          >
            Dismiss
          </button>
        </div>
      )}


      {/* Search and refresh */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, phone, ID or child"
              aria-label="Search parents"
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          <button
            type="button"
            onClick={() => void onRefresh()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>



      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Parent</th>
                <th className="px-5 py-4 font-semibold">ID</th>
                <th className="px-5 py-4 font-semibold">Phone</th>
                <th className="px-5 py-4 font-semibold">Occupation</th>
                <th className="px-5 py-4 font-semibold">Children</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredParents.map((parent) => {
                const children = parent.children ?? [];
                const isDeleting = deletingParentId === parent.id;

                return (
                  <tr
                    key={parent.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/parents/${parent.id}`}
                        className="font-semibold text-gray-800 transition hover:text-[#01796F]"
                      >
                        {parent.name}
                      </Link>

                      <p className="mt-1 text-xs text-gray-500">
                        {parent.email || "No email provided"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {parent.id}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {parent.phone || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {parent.occupation || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex max-w-xs flex-wrap gap-1.5">
                        {children.length > 0 ? (
                          children.map((child) => (
                            <span
                              key={child.id}
                              title={`${child.className}-${child.section} · Roll ${child.rollNo}`}
                              className="rounded-full bg-[#e6f4f2] px-2.5 py-1 text-xs font-medium text-[#01796F]"
                            >
                              {child.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400">
                            No children
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${parent.status === "Active"
                          ? "bg-[#e6f4f2] text-[#01796F]"
                          : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {parent.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/parents/${parent.id}`}
                          title="View parent"
                          aria-label={`View ${parent.name}`}
                          className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
                        >
                          <Eye size={17} />
                        </Link>

                        <Link
                          href={`/admin/parents/${parent.id}/edit`}
                          title="Edit parent"
                          aria-label={`Edit ${parent.name}`}
                          className="rounded-full p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"
                        >
                          <Pencil size={17} />
                        </Link>

                        <button
                          type="button"
                          title="Permanently delete parent"
                          aria-label={`Delete ${parent.name}`}
                          disabled={isDeleting}
                          onClick={() =>
                            void handleDelete(parent.id, parent.name)
                          }
                          className="rounded-full p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredParents.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-gray-500"
                  >
                    {search
                      ? "No parents match your search."
                      : "No parents were returned by the backend."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {filteredParents.length} of {parentList.length} parents
        </div>
      </div>

      {/* Mobile and tablet cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {filteredParents.map((parent) => (
          <div key={parent.id} className="relative">
            <ParentCard
              parent={parent}
              onDelete={(id, name) => void handleDelete(id, name)}
            />

            {deletingParentId === parent.id && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 text-sm font-medium text-gray-700">
                Deleting parent...
              </div>
            )}
          </div>
        ))}

        {filteredParents.length === 0 && (
          <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            {search
              ? "No parents match your search."
              : "No parents were returned by the backend."}
          </div>
        )}
      </div>
    </div>
  );
}
