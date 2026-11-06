"use client";

import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
  Clock3,
  GraduationCap,
  Layers3,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import {
  notifySchoolSettingsUpdated,
  useSchoolSetting,
} from "@/lib/schoolSettings";

type ClassRecord = { name: string; section: string };
type SubjectRecord = { name: string };
type ExamRecord = { name: string };

const selectClassName =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10";

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

export default function AcademicSettings() {
  const school = useSchoolSetting();
  const [classes, setClasses] = useState<string[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [terms, setTerms] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadAcademicRecords = async () => {
      const token = getAuthToken();
      if (!token) {
        if (active) setMessage("Your session has expired. Please log in again.");
        return;
      }

      try {
        const [classRecords, subjectRecords, examRecords] = await Promise.all([
          apiRequest<ClassRecord[]>("/classes", { token }),
          apiRequest<SubjectRecord[]>("/subjects", { token }),
          apiRequest<ExamRecord[]>("/exams", { token }),
        ]);
        if (!active) return;

        const classNames = unique(classRecords.map((item) => item.name)).sort(
          (left, right) => {
            const leftNumber = Number(left.match(/\d+/)?.[0] ?? 0);
            const rightNumber = Number(right.match(/\d+/)?.[0] ?? 0);
            return rightNumber - leftNumber;
          },
        );
        const sectionNames = unique(classRecords.map((item) => item.section));
        const subjectNames = unique(subjectRecords.map((item) => item.name));
        const termNames = unique(
          examRecords.map((item) => {
            const match = item.name.match(/mid-term|final-term|final/i);
            if (!match) return "";
            return match[0].toLowerCase() === "mid-term" ? "Mid-Term" : match[0];
          }),
        );

        setClasses(classNames);
        setSections(sectionNames);
        setSubjects(subjectNames);
        setTerms(termNames);
        setSelectedClass(
          school.selectedClass && classNames.includes(school.selectedClass)
            ? school.selectedClass
            : classNames[0] ?? "",
        );
        setSelectedSection(
          school.selectedSection && sectionNames.includes(school.selectedSection)
            ? school.selectedSection
            : sectionNames[0] ?? "",
        );
        setSelectedSubject(
          school.selectedSubject && subjectNames.includes(school.selectedSubject)
            ? school.selectedSubject
            : subjectNames[0] ?? "",
        );
        setSelectedTerm(
          school.term && termNames.includes(school.term) ? school.term : termNames[0] ?? "",
        );
      } catch (error) {
        if (active) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Unable to load academic settings.",
          );
        }
      }
    };

    void loadAcademicRecords();
    return () => {
      active = false;
    };
  }, [school.selectedClass, school.selectedSection, school.selectedSubject, school.term]);

  const saveAcademicSettings = async () => {
    const token = getAuthToken();
    if (!token) {
      setMessage("Your session has expired. Please log in again.");
      setShowConfirm(false);
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      await apiRequest("/school-settings", {
        method: "PATCH",
        token,
        body: JSON.stringify({
          selectedClass,
          selectedSection,
          selectedSubject,
          gradingSystem: "Percentage and letter grades",
          academicYear: school.academicYear,
          term: selectedTerm,
        }),
      });
      notifySchoolSettingsUpdated();
      setShowConfirm(false);
      setMessage("Academic settings were saved.");
    } catch (error) {
      setShowConfirm(false);
      setMessage(
        error instanceof Error ? error.message : "Unable to save academic settings.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
          <GraduationCap size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Academic Settings</h2>
      </div>

      {message && <p className="mb-4 text-sm text-gray-600">{message}</p>}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="settings-classes">
            <GraduationCap size={16} />
            Classes
          </label>
          <select
            id="settings-classes"
            value={selectedClass}
            onChange={(event) => setSelectedClass(event.target.value)}
            className={selectClassName}
          >
            {classes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="settings-sections">
            <Layers3 size={16} />
            Sections
          </label>
          <select
            id="settings-sections"
            value={selectedSection}
            onChange={(event) => setSelectedSection(event.target.value)}
            className={selectClassName}
          >
            {sections.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="settings-subjects">
            <BookOpen size={16} />
            Subjects
          </label>
          <select
            id="settings-subjects"
            value={selectedSubject}
            onChange={(event) => setSelectedSubject(event.target.value)}
            className={selectClassName}
          >
            {subjects.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="settings-grading">
            <Award size={16} />
            Grading System
          </label>
          <select id="settings-grading" className={selectClassName} defaultValue="Percentage and letter grades">
            <option>Percentage and letter grades</option>
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="settings-academic-year">
            <CalendarDays size={16} />
            Academic Year
          </label>
          <select id="settings-academic-year" className={selectClassName} value={school.academicYear} onChange={() => undefined}>
            <option>{school.academicYear}</option>
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="settings-term">
            <Clock3 size={16} />
            Term
          </label>
          <select
            id="settings-term"
            value={selectedTerm}
            onChange={(event) => setSelectedTerm(event.target.value)}
            className={selectClassName}
          >
            {terms.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#01665d] disabled:opacity-60 sm:w-auto"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-10">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Save Changes?</h3>
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
                disabled={saving}
                onClick={() => {
                  void saveAcademicSettings();
                }}
                className="rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d] disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
