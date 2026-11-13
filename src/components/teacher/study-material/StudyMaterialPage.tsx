"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  FileText,
  Plus,
  Video,
} from "lucide-react";

import { fetchTeacherStudyMaterials } from "@/lib/teacher-api";
import type { ApiStudyMaterial } from "@/lib/teacher-api";

import StudyMaterialTable from "./StudyMaterialTable";

export default function StudyMaterialPage() {
  const [search, setSearch] = useState("");

  const [state, setState] = useState<{
    loaded: boolean;
    materials: ApiStudyMaterial[];
    error: string;
  }>({
    loaded: false,
    materials: [],
    error: "",
  });

  const load = useCallback(() => {
    fetchTeacherStudyMaterials()
      .then((materials) => {
        setState({ loaded: true, materials, error: "" });
      })
      .catch((err: unknown) => {
        setState({
          loaded: true,
          materials: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load your study materials.",
        });
      });
  }, []);

  useEffect(() => {
    let active = true;

    fetchTeacherStudyMaterials()
      .then((materials) => {
        if (!active) return;
        setState({ loaded: true, materials, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          materials: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load your study materials.",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredMaterials = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return state.materials;

    return state.materials.filter(
      (material) =>
        material.title.toLowerCase().includes(value) ||
        material.subject.toLowerCase().includes(value) ||
        material.className.toLowerCase().includes(value) ||
        material.section.toLowerCase().includes(value) ||
        material.type.toLowerCase().includes(value) ||
        material.date.toLowerCase().includes(value)
    );
  }, [search, state.materials]);

  const stats = [
    {
      title: "Total Materials",
      value: state.materials.length,
      icon: BookOpen,
    },
    {
      title: "PDF Files",
      value: state.materials.filter((item) => item.type === "PDF").length,
      icon: FileText,
    },
    {
      title: "Notes",
      value: state.materials.filter((item) => item.type === "Notes").length,
      icon: ClipboardList,
    },
    {
      title: "Videos",
      value: state.materials.filter((item) => item.type === "Video").length,
      icon: Video,
    },
  ];

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Study Material
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Manage and access your educational learning materials.
        </p>
      </div>

      <Link
        href="/teacher/study-material/add"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
      >
        <Plus size={17} />
        Add Material
      </Link>
    </div>
  );

  if (!state.loaded && !state.error) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading your study materials...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {header}

      {state.error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {state.error}
        </div>
      )}

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.title}</p>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-2 text-2xl font-bold text-gray-800">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <StudyMaterialTable
        materials={filteredMaterials}
        search={search}
        setSearch={setSearch}
        total={state.materials.length}
        onDeleted={load}
      />
    </div>
  );
}
