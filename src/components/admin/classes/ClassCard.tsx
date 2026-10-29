
"use client";

import Link from "next/link";
import {
  DoorOpen,
  Eye,
  Pencil,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";

import type { ClassTableRow } from "@/components/admin/classes/ClassTable";

type ClassCardProps = {
  schoolClass: ClassTableRow;
  onDelete: (id: number, name: string) => void;
  deleting: boolean;
};

export default function ClassCard({
  schoolClass,
  onDelete,
  deleting,
}: ClassCardProps) {
  const classLabel = `${schoolClass.name}-${schoolClass.section}`;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Class information */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F]">
          <UserRound size={23} />
        </div>

        <div className="min-w-0 flex-1">
          <Link
            href={`/admin/classes/${schoolClass.id}`}
            className="block break-words text-base font-bold text-gray-900 transition hover:text-[#01796F]"
          >
            {schoolClass.name} - Section {schoolClass.section}
          </Link>

          <p className="mt-1 break-words text-sm text-gray-500">
            Class Teacher: {schoolClass.teacher || "Not assigned"}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            schoolClass.status === "Active"
              ? "bg-[#e6f4f2] text-[#01796F]"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {schoolClass.status}
        </span>
      </div>

      {/* Class details */}
      <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-gray-500">Teacher ID</span>
          <span className="break-all text-right font-medium text-gray-800">
            {schoolClass.teacherId || "Not assigned"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-2 text-gray-500">
            <Users size={16} />
            Students
          </span>
          <span className="font-medium text-gray-800">
            {schoolClass.studentCount}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-2 text-gray-500">
            <DoorOpen size={16} />
            Room
          </span>
          <span className="font-medium text-gray-800">
            {schoolClass.room || "Not assigned"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
        <Link
          href={`/admin/classes/${schoolClass.id}`}
          title="View class"
          aria-label={`View ${schoolClass.name} section ${schoolClass.section}`}
          className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796F]"
        >
          <Eye size={18} />
        </Link>

        <Link
          href={`/admin/classes/${schoolClass.id}/edit`}
          title="Edit class"
          aria-label={`Edit ${schoolClass.name} section ${schoolClass.section}`}
          className="rounded-full p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"
        >
          <Pencil size={18} />
        </Link>

        <button
          type="button"
          title="Permanently delete class"
          aria-label={`Permanently delete ${schoolClass.name} section ${schoolClass.section}`}
          disabled={deleting}
          onClick={() => onDelete(schoolClass.id, classLabel)}
          className="rounded-full p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Deleting overlay */}
      {deleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-sm">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-[#01796F]" />
            <span className="text-sm font-medium text-gray-700">
              Deleting class...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
