"use client";

import Link from "next/link";
import {
  BookOpen,
  FileText,
  Video,
  ClipboardList,
  Plus,
} from "lucide-react";

import { studyMaterial } from "@/data/studyMaterial";
import StudyMaterialTable from "./StudyMaterialTable";

export default function StudyMaterialPage() {
  const total = studyMaterial.length;
  const pdfs = studyMaterial.filter(
    (item) => item.type === "PDF"
  ).length;
  const notes = studyMaterial.filter(
    (item) => item.type === "Notes"
  ).length;
  const videos = studyMaterial.filter(
    (item) => item.type === "Video"
  ).length;

  const stats = [
    {
      title: "Total Materials",
      value: total,
      icon: BookOpen,
    },
    {
      title: "PDF Files",
      value: pdfs,
      icon: FileText,
    },
    {
      title: "Notes",
      value: notes,
      icon: ClipboardList,
    },
    {
      title: "Videos",
      value: videos,
      icon: Video,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Study Material
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and access educational learning materials
          </p>
        </div>

        <Link
          href="/dashboard/study-material/add"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
        >
          <Plus size={17} />
          Add Material
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-800">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <Icon size={21} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <StudyMaterialTable />
    </div>
  );
}
