"use client";

import { useMemo, useState } from "react";

import { getSession } from "@/lib/auth";
import { Plus } from "lucide-react";


import { teachers } from "@/data/teachers";
import { studyMaterial } from "@/data/studyMaterial";

import TeacherStudyMaterialTable from "./TeacherStudyMaterialTable";
import TeacherStudyMaterialForm from "./TeacherStudyMaterialForm";

export default function TeacherStudyMaterialPage() {
  const session = getSession();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const currentTeacher =
    teachers.find(
      (teacher) =>
        teacher.email === session?.email ||
        teacher.name === session?.name
    ) ?? teachers[0];

  const teacherMaterials = useMemo(() => {
    return studyMaterial.filter(
      (material) => material.teacherId === currentTeacher.id
    );
  }, [currentTeacher.id]);

  const filteredMaterials = teacherMaterials.filter(
    (material) => {
      const value = search.toLowerCase();

      return (
        material.title.toLowerCase().includes(value) ||
        material.subject.toLowerCase().includes(value) ||
        material.className.toLowerCase().includes(value) ||
        material.section.toLowerCase().includes(value) ||
        material.type.toLowerCase().includes(value)
      );
    }
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Study Material
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Upload and manage study material for your students.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center rounded-full gap-2 bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          <Plus size={17} />
          Add Material
        </button>
      </div>

      <TeacherStudyMaterialTable
        materials={filteredMaterials}
        search={search}
        setSearch={setSearch}
      />

      {showForm && (
        <TeacherStudyMaterialForm
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}