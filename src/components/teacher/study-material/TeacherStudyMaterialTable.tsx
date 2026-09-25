"use client";

import { Search, BookOpen } from "lucide-react";

import { StudyMaterial } from "@/types/studyMaterial";

type TeacherStudyMaterialTableProps = {
  materials: StudyMaterial[];
  search: string;
  setSearch: (value: string) => void;
};

export default function TeacherStudyMaterialTable({
  materials,
  search,
  setSearch,
}: TeacherStudyMaterialTableProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search study material..."
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796f]"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Material
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Subject
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Class
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Type
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {materials.length > 0 ? (
                materials.map((material) => (
                  <tr
                    key={material.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#01796f]/10 text-[#01796f]">
                          <BookOpen size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">
                            {material.title}
                          </p>

                          <p className="mt-1 max-w-md truncate text-sm text-gray-500">
                            {material.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {material.subject}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {material.className} - {material.section}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                        {material.type}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {material.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-sm text-gray-500"
                  >
                    No study material found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {materials.length > 0 ? (
          materials.map((material) => (
            <div
              key={material.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#01796f]/10 text-[#01796f]">
                  <BookOpen size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-gray-900">
                    {material.title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {material.subject}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                  {material.type}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">
                    Class:
                  </span>{" "}
                  {material.className} - {material.section}
                </p>

                <p>
                  <span className="font-medium text-gray-900">
                    Date:
                  </span>{" "}
                  {material.date}
                </p>

                <p className="leading-6">
                  <span className="font-medium text-gray-900">
                    Description:
                  </span>{" "}
                  {material.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No study material found.
          </div>
        )}
      </div>
    </div>
  );
}