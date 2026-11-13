"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Download,
  FileText,
  Pencil,
  Search,
  Trash2,
  Video,
  ClipboardList,
} from "lucide-react";

import { deleteTeacherStudyMaterial } from "@/lib/teacher-api";
import type { ApiStudyMaterial, StudyMaterialType } from "@/lib/teacher-api";

type Props = {
  materials: ApiStudyMaterial[];
  search: string;
  setSearch: (value: string) => void;
  total: number;
  onDeleted: () => void;
};

const typeIcons: Record<StudyMaterialType, typeof FileText> = {
  PDF: FileText,
  Document: FileText,
  Video: Video,
  Notes: ClipboardList,
};

export default function StudyMaterialTable({
  materials,
  search,
  setSearch,
  total,
  onDeleted,
}: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function handleDelete(material: ApiStudyMaterial) {
    if (deletingId !== null) return;

    if (!window.confirm(`Delete "${material.title}"?`)) return;

    setDeletingId(material.id);
    setError("");

    try {
      await deleteTeacherStudyMaterial(material.id);

      onDeleted();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete the study material."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            placeholder="Search study materials"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
          />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Material</th>
                <th className="px-5 py-4 font-semibold">Subject</th>
                <th className="px-5 py-4 font-semibold">Class</th>
                <th className="px-5 py-4 font-semibold">Type</th>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {materials.length > 0 ? (
                materials.map((material) => {
                  const Icon = typeIcons[material.type];

                  return (
                    <tr
                      key={material.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                            <Icon size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium text-gray-900">
                              {material.title}
                            </p>

                            <p className="mt-1 max-w-sm truncate text-xs text-gray-500">
                              {material.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {material.subject}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {material.className} - {material.section}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {material.type}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {material.date}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {material.fileUrl ? (
                            <a
                              href={material.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              title={`Open ${material.title}`}
                              aria-label={`Open ${material.title}`}
                              className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
                            >
                              <Download size={17} />
                            </a>
                          ) : (
                            <button
                              type="button"
                              title="No file is attached yet"
                              aria-label={`No file is attached to ${material.title}`}
                              onClick={() =>
                                window.alert(
                                  `No downloadable file is attached to "${material.title}" yet.`
                                )
                              }
                              className="rounded-full p-2 text-gray-400 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
                            >
                              <Download size={17} />
                            </button>
                          )}

                          <Link
                            href={`/teacher/study-material/${material.id}/edit`}
                            title="Edit material"
                            aria-label={`Edit ${material.title}`}
                            className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
                          >
                            <Pencil size={17} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(material)}
                            disabled={deletingId === material.id}
                            title={`Delete ${material.title}`}
                            aria-label={`Delete ${material.title}`}
                            className="rounded-full p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    {search.trim()
                      ? "No study material matches your search."
                      : "You have not added any study materials yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {materials.length} of {total} materials
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {materials.length > 0 ? (
          materials.map((material) => {
            const Icon = typeIcons[material.type];

            return (
              <div
                key={material.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900">
                      {material.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {material.subject} · {material.className} -{" "}
                      {material.section}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796F]">
                    {material.type}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {material.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-500">
                    {material.date}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/teacher/study-material/${material.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:border-[#01796F] hover:text-[#01796F]"
                    >
                      <Pencil size={14} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(material)}
                      disabled={deletingId === material.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:border-red-200 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            {search.trim()
              ? "No study material matches your search."
              : "You have not added any study materials yet."}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 md:hidden">
        Showing {materials.length} of {total} materials
      </p>
    </div>
  );
}
