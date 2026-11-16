"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ClipboardList,
  FileText,
  Video,
} from "lucide-react";

import { fetchStudentStudyMaterials } from "@/lib/student-api";
import type { ApiStudentStudyMaterial } from "@/lib/student-api";

import StudentStatCards from "../StudentStatCards";
import StudentStudyMaterialTable from "./StudentStudyMaterialTable";

export default function StudentStudyMaterialPage() {
  const [search, setSearch] = useState("");

  const [state, setState] = useState<{
    loaded: boolean;
    materials: ApiStudentStudyMaterial[];
    error: string;
  }>({
    loaded: false,
    materials: [],
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchStudentStudyMaterials()
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
              : "Unable to load the study material.",
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
        material.description.toLowerCase().includes(value) ||
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
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Study Material
      </h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        Access the learning materials published for your class.
      </p>
    </div>
  );

  if (!state.loaded && !state.error) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading the study material...
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

      <StudentStatCards stats={stats} />

      <StudentStudyMaterialTable
        materials={filteredMaterials}
        search={search}
        setSearch={setSearch}
        total={state.materials.length}
      />
    </div>
  );
}
