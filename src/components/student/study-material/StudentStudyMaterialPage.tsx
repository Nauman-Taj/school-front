import { BookOpen, ClipboardList, FileText, Video } from "lucide-react";

import { students } from "@/data/students";
import { studyMaterial } from "@/data/studyMaterial";
import StudentStudyMaterialTable from "./StudentStudyMaterialTable";

export default function StudentStudyMaterialPage() {
  const currentStudent = students.find(
    (student) => student.id === 1
  );

  const studentMaterials = currentStudent
    ? studyMaterial.filter(
        (item) =>
          item.className === currentStudent.className &&
          item.section === currentStudent.section
      )
    : [];

  const total = studentMaterials.length;

  const pdfs = studentMaterials.filter(
    (item) => item.type === "PDF"
  ).length;

  const notes = studentMaterials.filter(
    (item) => item.type === "Notes"
  ).length;

  const videos = studentMaterials.filter(
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
    <main className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Study Material
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Access your available educational learning materials.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
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
                  <Icon size={21} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <StudentStudyMaterialTable
        materials={studentMaterials}
      />
    </main>
  );
}