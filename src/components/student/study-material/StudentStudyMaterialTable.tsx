"use client";

import {
  ClipboardList,
  Download,
  FileText,
  Search,
  Video,
} from "lucide-react";

import type { ApiStudentStudyMaterial } from "@/lib/student-api";

type Props = {
  materials: ApiStudentStudyMaterial[];
  search: string;
  setSearch: (value: string) => void;
  total: number;
};

const typeIcons = {
  PDF: FileText,
  Document: FileText,
  Video: Video,
  Notes: ClipboardList,
};

export default function StudentStudyMaterialTable({
  materials,
  search,
  setSearch,
  total,
}: Props) {
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

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Material</th>
                <th className="px-5 py-4 font-semibold">Subject</th>
                <th className="px-5 py-4 font-semibold">Type</th>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 text-center font-semibold">
                  Action
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
                        {material.type}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {material.date}
                      </td>

                      <td className="px-5 py-4 text-center">
                        {material.fileUrl ? (
                          <a
                            href={material.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            title={`Open ${material.title}`}
                            aria-label={`Open ${material.title}`}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 transition hover:border-[#01796F] hover:bg-[#e6f4f2] hover:text-[#01796F]"
                          >
                            <Download size={16} />
                            Download
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">
                            No file attached
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No study material found.
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
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900">
                        {material.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {material.subject} · {material.date}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796F]">
                    {material.type}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {material.description}
                </p>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            No study material found.
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 md:hidden">
        Showing {materials.length} of {total} materials
      </p>
    </div>
  );
}
