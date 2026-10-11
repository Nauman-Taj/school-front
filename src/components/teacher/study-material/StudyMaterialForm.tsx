"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getSession } from "@/lib/auth";
import {
  getStudyMaterials,
  saveStudyMaterials,
  getTeacherByEmail,
} from "@/data/studyMaterial";
import { StudyMaterial } from "@/types/studyMaterial";
import { Teacher } from "@/types/teacher";

type StudyMaterialFormProps = {
  mode: "add" | "edit";
  material?: StudyMaterial;
};

const subjectIds: Record<string, string> = {
  Mathematics: "SUB001",
  Science: "SUB002",
  English: "SUB003",
  "Computer Science": "SUB004",
  Urdu: "SUB005",
  "Social Studies": "SUB006",
  Islamiyat: "SUB007",
  Physics: "SUB008",
};

const classOptions = [
  "Grade 5-A",
  "Grade 5-B",
  "Grade 6-A",
  "Grade 6-B",
  "Grade 7-A",
  "Grade 7-B",
  "Grade 8-A",
  "Grade 8-B",
  "Grade 9-A",
  "Grade 9-B",
  "Grade 10-A",
  "Grade 10-B",
];

export default function StudyMaterialForm({
  mode,
  material,
}: StudyMaterialFormProps) {
  const router = useRouter();

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(material?.title ?? "");
  const [classValue, setClassValue] = useState(
    material
      ? `${material.className}-${material.section}`
      : ""
  );
  const [type, setType] = useState<StudyMaterial["type"]>(
    material?.type ?? "PDF"
  );
  const [date, setDate] = useState(material?.date ?? "");
  const [description, setDescription] = useState(
    material?.description ?? ""
  );

  useEffect(() => {
    const session = getSession();

    if (!session || session.role !== "Teacher") {
      setError("Please log in with a teacher account.");
      setLoading(false);
      return;
    }

    const currentTeacher = getTeacherByEmail(session.email);

    if (!currentTeacher) {
      setError(
        "Your login email does not match a teacher record. Please check your account details."
      );
      setLoading(false);
      return;
    }

    if (mode === "edit") {
      const storedMaterial = getStudyMaterials().find(
        (item) => item.id === material?.id
      );

      if (
        !storedMaterial ||
        storedMaterial.teacherId !== currentTeacher.id
      ) {
        setError(
          "This study material does not exist or does not belong to your account."
        );
        setLoading(false);
        return;
      }

      setTitle(storedMaterial.title);
      setClassValue(
        `${storedMaterial.className}-${storedMaterial.section}`
      );
      setType(storedMaterial.type);
      setDate(storedMaterial.date);
      setDescription(storedMaterial.description);
    } else {
      setDate(new Date().toISOString().slice(0, 10));
    }

    setTeacher(currentTeacher);
    setLoading(false);
  }, [mode, material?.id]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const session = getSession();

    if (!session || session.role !== "Teacher") {
      setError("Your teacher session has expired. Please log in again.");
      return;
    }

    const currentTeacher = getTeacherByEmail(session.email);

    if (!currentTeacher || currentTeacher.id !== teacher?.id) {
      setError("Unable to verify your teacher account.");
      return;
    }

    const [selectedClass, selectedSection] = classValue.split("-");

    if (!selectedClass || !selectedSection) {
      setError("Please select a valid class and section.");
      return;
    }

    setSaving(true);

    const currentMaterials = getStudyMaterials();

    if (mode === "edit") {
      const existingMaterial = currentMaterials.find(
        (item) => item.id === material?.id
      );

      if (
        !existingMaterial ||
        existingMaterial.teacherId !== currentTeacher.id
      ) {
        setError("You cannot edit this study material.");
        setSaving(false);
        return;
      }

      const updatedMaterials = currentMaterials.map((item) =>
        item.id === existingMaterial.id
          ? {
              ...item,
              title: title.trim(),
              subject: currentTeacher.subject,
              subjectId:
                item.subjectId ||
                subjectIds[currentTeacher.subject] ||
                "SUB001",
              className: selectedClass,
              section: selectedSection,
              teacherId: currentTeacher.id,
              teacher: currentTeacher.name,
              type,
              date,
              description: description.trim(),
            }
          : item
      );

      saveStudyMaterials(updatedMaterials);
    } else {
      const nextId =
        currentMaterials.reduce(
          (maximum, item) => Math.max(maximum, item.id),
          0
        ) + 1;

      const newMaterial: StudyMaterial = {
        id: nextId,
        title: title.trim(),
        subjectId:
          subjectIds[currentTeacher.subject] || "SUB001",
        subject: currentTeacher.subject,
        className: selectedClass,
        section: selectedSection,
        teacherId: currentTeacher.id,
        teacher: currentTeacher.name,
        type,
        date,
        description: description.trim(),
      };

      saveStudyMaterials([...currentMaterials, newMaterial]);
    }

    router.push("/teacher/study-material");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        Loading study material form...
      </div>
    );
  }

  if (error && !teacher) {
    return (
      <div className="space-y-4">
        <Link
          href="/teacher/study-material"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#01796F]"
        >
          <ArrowLeft size={17} />
          Back to Study Material
        </Link>

        <div className="rounded-2xl border border-red-200 bg-white p-6 text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!teacher) return null;

  return (
    <div className="space-y-5">
      <div>
        <Link
          href="/teacher/study-material"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#01796F]"
        >
          <ArrowLeft size={17} />
          Back to Study Material
        </Link>

        <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          {mode === "add" ? "Add Study Material" : "Edit Study Material"}
        </h2>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Add learning resources for your students.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="material-title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Material Title
            </label>
            <input
              id="material-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter material title"
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          <div>
            <label
              htmlFor="material-subject"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              id="material-subject"
              value={teacher.subject}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none"
            />
            <p className="mt-1 text-xs text-gray-400">
              Your subject is assigned from your teacher profile.
            </p>
          </div>

          <div>
            <label
              htmlFor="material-class"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Class
            </label>
            <select
              id="material-class"
              value={classValue}
              onChange={(event) => setClassValue(event.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
              <option value="">Select class</option>
              {classOptions.map((classOption) => (
                <option key={classOption} value={classOption}>
                  {classOption}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="material-type"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Material Type
            </label>
            <select
              id="material-type"
              value={type}
              onChange={(event) =>
                setType(event.target.value as StudyMaterial["type"])
              }
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
              <option value="PDF">PDF</option>
              <option value="Document">Document</option>
              <option value="Video">Video</option>
              <option value="Notes">Notes</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="material-teacher"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Teacher
            </label>
            <input
              id="material-teacher"
              value={teacher.name}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="material-date"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              id="material-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="material-description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="material-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter material description"
              rows={5}
              required
              className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <Link
            href="/teacher/study-material"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : mode === "add"
                ? "Add Material"
                : "Update Material"}
          </button>
        </div>
      </form>
    </div>
  );
}