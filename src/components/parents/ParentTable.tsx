"use client";

import { useState } from "react";
import ParentCard from "./ParentCard";
import Link from "next/link";
import {
  Search,
  UserRound,
  Pencil,
  Trash2,
} from "lucide-react";

import { Parent } from "@/types/parent";

type ParentTableProps = {
  parentList: Parent[];
  setParentList: React.Dispatch<React.SetStateAction<Parent[]>>;
};

export default function ParentTable({
  parentList,
  setParentList,
}: ParentTableProps) {
  const [search, setSearch] = useState("");
  const handleDelete = (id: number, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmed) return;

    setParentList((currentParents) =>
      currentParents.filter((parent) => parent.id !== id)
    );
  };

  const filteredParents = parentList.filter((parent) => {
    const searchTerm = search.toLowerCase().trim();

    return (
      parent.name.toLowerCase().includes(searchTerm) ||
      parent.email.toLowerCase().includes(searchTerm) ||
      parent.phone.toLowerCase().includes(searchTerm) ||
      parent.occupation.toLowerCase().includes(searchTerm) ||
      parent.children.some((child) =>
        child.toLowerCase().includes(searchTerm)
      )
    );
  });

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gray-200 bg-white">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Parent List
            </h2>

            {/* <p className="mt-1 text-sm text-gray-500">
              View and manage all parents
            </p> */}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search parents"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Parent
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Phone
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Occupation
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Children
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredParents.map((parent) => (
                <tr
                  key={parent.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {parent.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {parent.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {parent.phone}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {parent.occupation}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {parent.children.map((child) => (
                        <span
                          key={child}
                          className="rounded-full bg-[#e6f4f2] px-2.5 py-1 text-xs font-medium text-[#01796f]"
                        >
                          {child}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${parent.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {parent.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* View */}
                      <Link
                        href={`/dashboard/parents/${parent.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                        title="View"
                      >
                        <UserRound size={17} />
                      </Link>

                      {/* Edit */}
                      <Link
                        href={`/dashboard/parents/${parent.id}/edit`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </Link>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(parent.id, parent.name)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${parent.name}`}
                      >
                        <Trash2 size={17} strokeWidth={1.8} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredParents.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-gray-500">
              No parents found.
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-gray-100 md:hidden">
          {filteredParents.map((parent) => (
            <ParentCard
              key={parent.id}
              parent={parent}
              onDelete={handleDelete}
            />
          ))}

          {filteredParents.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-gray-500">
              No parents found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}