
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Video,
  ClipboardList,
  Plus,
} from "lucide-react";

import { getSession } from "@/lib/auth";
import {
  getTeacherStudyMaterials,
  saveStudyMaterials,
  getStudyMaterials,
} from "@/data/studyMaterial";
import { StudyMaterial } from "@/types/studyMaterial";
import StudyMaterialTable from "./StudyMaterialTable";

export default function StudyMaterialPage() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getSession();

    if (!session || session.role !== "Teacher") {
      setMaterials([]);
      setLoading(false);
      return;
    }

    setMaterials(getTeacherStudyMaterials(session.email));
    setLoading(false);
  }, []);

  const handleDelete = (id: number) => {
    const session = getSession();

    if (!session || session.role !== "Teacher") {
      setError("Please log in with a teacher account.");
      return;
    }

    const currentMaterials = getStudyMaterials();
    const teacherMaterials = getTeacherStudyMaterials(session.email);

    const belongsToTeacher = teacherMaterials.some(
      (material) => material.id === id
    );

    if (!belongsToTeacher) {
      setError("You cannot delete this study material.");
      return;
    }

    const updatedMaterials = currentMaterials.filter(
      (material) => material.id !== id
    );

    if (!saveStudyMaterials(updatedMaterials)) {
      setError("Unable to save changes. Please check your browser storage.");
      return;
    }

    setMaterials(
      updatedMaterials.filter((material) =>
        teacherMaterials.some(
          (teacherMaterial) => teacherMaterial.teacherId === material.teacherId
        )
      ).filter((material) => material.teacherId === teacherMaterials[0]?.teacherId)
    );

    setError("");
  };

  const stats = [
    {
      title: "Total Materials",
      value: materials.length,
      icon: BookOpen,
    },
    {
      title: "PDF Files",
      value: materials.filter((item) => item.type === "PDF").length,
      icon: FileText,
    },
    {
      title: "Notes",
      value: materials.filter((item) => item.type === "Notes").length,
      icon: ClipboardList,
    },
    {
      title: "Videos",
      value: materials.filter((item) => item.type === "Video").length,
      icon: Video,
    },
  ];

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        Loading your study materials...
      </div>
    );
  }

  return (
    <div className="space-y-5">
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

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

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

      <StudyMaterialTable
        materials={materials}
        onDelete={handleDelete}
      />
    </div>
  );
}
