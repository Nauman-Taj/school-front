"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import {
  createTeacherStudyMaterial,
  fetchTeacherStudyMaterial,
  updateTeacherStudyMaterial,
} from "@/lib/teacher-api";
import type { StudyMaterialType } from "@/lib/teacher-api";
import { useTeacherProfile } from "@/lib/useTeacherProfile";

type Props = {
  materialId?: number;
};

const materialTypes: StudyMaterialType[] = [
  "PDF",
  "Document",
  "Video",
  "Notes",
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10";

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

export default function StudyMaterialForm({ materialId }: Props) {
  const isEdit = materialId !== undefined;
  const router = useRouter();

  const { profile } = useTeacherProfile();

  const [loaded, setLoaded] = useState(!isEdit);

  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [type, setType] = useState<StudyMaterialType>("PDF");
  const [date, setDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const subjects = useMemo(() => profile?.subjects ?? [], [profile]);

  useEffect(() => {
    if (!isEdit) return;

    let active = true;

    fetchTeacherStudyMaterial(materialId)
      .then((material) => {
        if (!active) return;

        setTitle(material.title);
        setSubjectId(material.subjectId);
        setType(material.type);
        setDate(material.date);
        setDescription(material.description);
        setFileUrl(material.fileUrl ?? "");
        setFileName(material.fileName ?? "");
        setLoaded(true);
      })
      .catch((err: unknown) => {
        if (!active) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load the study material."
        );
        setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [isEdit, materialId]);

  const selectedSubject = useMemo(
    () => subjects.find((subject) => subject.id === subjectId),
    [subjects, subjectId]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !subjectId || !date) {
      setError("Title, subject and date are required.");
      return;
    }

    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const input = {
        title: title.trim(),
        description: description.trim(),
        subjectId,
        type,
        date,
        fileUrl: fileUrl.trim(),
        fileName: fileName.trim(),
      };

      if (isEdit && materialId !== undefined) {
        await updateTeacherStudyMaterial(materialId, input);
      } else {
        await createTeacherStudyMaterial(input);
      }

      setSaved(true);
      router.push("/teacher/study-material");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save the study material. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (isEdit && !loaded) {
    return (
      <div className="space-y-5">
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
      <div>
        <Link
          href="/teacher/study-material"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
        >
          <ArrowLeft size={17} />
          Back to Study Material
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {isEdit ? "Edit Material" : "Add Material"}
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          {isEdit
            ? "Update the details of your learning material."
            : "Publish a learning material for your students."}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {saved && (
        <div
          role="status"
          className="rounded-2xl border border-[#01796F]/15 bg-[#e6f4f2] p-4 text-sm text-[#015f58]"
        >
          The study material was saved successfully.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="materialTitle">
              Title
            </label>

            <input
              id="materialTitle"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              maxLength={150}
              placeholder="Enter the material title"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="materialSubject">
              Subject
            </label>

            <select
              id="materialSubject"
              value={subjectId}
              onChange={(event) => setSubjectId(event.target.value)}
              required
              className={inputClass}
            >
              <option value="">Select subject</option>

              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.className} - {subject.section})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="materialType">
              Type
            </label>

            <select
              id="materialType"
              value={type}
              onChange={(event) =>
                setType(event.target.value as StudyMaterialType)
              }
              className={inputClass}
            >
              {materialTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="materialDate">
              Date
            </label>

            <input
              id="materialDate"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="materialClass">
              Class
            </label>

            <div className="w-full rounded-xl border border-gray-100 bg-[#f6f8f8] px-4 py-3 text-sm text-gray-700">
              {selectedSubject
                ? `${selectedSubject.className} - ${selectedSubject.section}`
                : "Derived from the subject"}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="materialDescription">
              Description
            </label>

            <textarea
              id="materialDescription"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              maxLength={2000}
              rows={4}
              placeholder="Describe what this material covers"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="materialFileUrl">
              File link
            </label>

            <input
              id="materialFileUrl"
              type="url"
              value={fileUrl}
              onChange={(event) => setFileUrl(event.target.value)}
              maxLength={500}
              placeholder="https://..."
              className={inputClass}
            />

            <p className="mt-2 text-xs text-gray-500">
              Optional. Link to the file the students should download.
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="materialFileName">
              File name
            </label>

            <input
              id="materialFileName"
              type="text"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              maxLength={200}
              placeholder="Algebra Fundamentals.pdf"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-gray-500">
              Optional. The name shown when the file is downloaded.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          <Link
            href="/teacher/study-material"
            className="rounded-full border border-gray-200 px-5 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Check size={16} />
            {saving ? "Saving..." : isEdit ? "Update Material" : "Add Material"}
          </button>
        </div>
      </form>
    </div>
  );
}
