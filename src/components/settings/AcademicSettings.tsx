"use client";

import { useState } from "react";
import {
  GraduationCap,
  Layers3,
  BookOpen,
  Award,
  CalendarDays,
  Clock3,
  Save,
} from "lucide-react";

import { academicSettings } from "@/data/settings";

export default function AcademicSettings() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [classes, setClasses] = useState(academicSettings.classes);
  const [sections, setSections] = useState(academicSettings.sections);
  const [subjects, setSubjects] = useState(academicSettings.subjects);
  const [gradingSystem, setGradingSystem] = useState(
    academicSettings.gradingSystem
  );
  const [academicYear, setAcademicYear] = useState(
    academicSettings.academicYear
  );
  const [term, setTerm] = useState(academicSettings.term);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
            <GraduationCap size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Academic Settings
            </h2>

            {/* <p className="text-sm text-gray-500">
              Manage classes, subjects, grading, and academic periods.
            </p> */}
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Classes */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <GraduationCap size={16} />
            Classes
          </label>

          <select
            value={classes}
            onChange={(e) => setClasses(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option>Primary</option>
            <option>Middle</option>
            <option>Senior</option>
          </select>
        </div>

        {/* Sections */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Layers3 size={16} />
            Sections
          </label>

          <select
            value={sections}
            onChange={(e) => setSections(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>

        {/* Subjects */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <BookOpen size={16} />
            Subjects
          </label>

          <select
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option>English, Mathematics, Science</option>
            <option>English, Mathematics, Computer</option>
            <option>All Core Subjects</option>
          </select>
        </div>

        {/* Grading */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Award size={16} />
            Grading System
          </label>

          <select
            value={gradingSystem}
            onChange={(e) => setGradingSystem(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option>Percentage</option>
            <option>Grade A-F</option>
            <option>GPA</option>
          </select>
        </div>

        {/* Academic Year */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <CalendarDays size={16} />
            Academic Year
          </label>

          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option>2026-2027</option>
            <option>2025-2026</option>
            <option>2024-2025</option>
          </select>
        </div>

        {/* Term */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Clock3 size={16} />
            Term
          </label>

          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option>Term 1</option>
            <option>Term 2</option>
            <option>Term 3</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
        >
          {/* <Save size={17} /> */}
          Save Changes
        </button>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">
              Save Changes?
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to save these academic settings?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                }}
                className="rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}