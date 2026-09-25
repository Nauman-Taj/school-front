"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { subjects } from "@/data/subjects";
import { StudyMaterial } from "@/types/studyMaterial";

type TeacherStudyMaterialFormProps = {
  onClose: () => void;
};

export default function TeacherStudyMaterialForm({
  onClose,
}: TeacherStudyMaterialFormProps) {
  const [form, setForm] = useState({
    title: "",
    subjectId: "",
    className: "",
    section: "",
    type: "PDF" as StudyMaterial["type"],
    date: "",
    description: "",
  });

  const selectedSubject = subjects.find(
    (subject) => subject.id === form.subjectId
  );

  const handleChange = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Study material:", {
      ...form,
      subject: selectedSubject?.name ?? "",
      teacherId: selectedSubject?.teacherId ?? "",
      teacher: selectedSubject?.teacher ?? "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Add Study Material
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add learning material for your students.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title
              </label>

              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  handleChange("title", e.target.value)
                }
                placeholder="Enter material title"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f]"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Subject
              </label>

              <select
                value={form.subjectId}
                onChange={(e) =>
                  handleChange("subjectId", e.target.value)
                }
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f]"
              >
                <option value="">Select subject</option>

                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Class
              </label>

              <input
                type="text"
                value={form.className}
                onChange={(e) =>
                  handleChange("className", e.target.value)
                }
                placeholder="e.g. Grade 10"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f]"
              />
            </div>

            {/* Section */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Section
              </label>

              <select
                value={form.section}
                onChange={(e) =>
                  handleChange("section", e.target.value)
                }
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f]"
              >
                <option value="">Select section</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Material Type
              </label>

              <select
                value={form.type}
                onChange={(e) =>
                  handleChange(
                    "type",
                    e.target.value as StudyMaterial["type"]
                  )
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f]"
              >
                <option value="PDF">PDF</option>
                <option value="Document">Document</option>
                <option value="Video">Video</option>
                <option value="Notes">Notes</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Date
              </label>

              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  handleChange("date", e.target.value)
                }
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f]"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                placeholder="Enter material description"
                rows={4}
                required
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
            >
              Add Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}