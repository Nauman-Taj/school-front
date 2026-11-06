"use client";

import { useEffect, useRef, useState } from "react";
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
  useSchoolSettingError,
} from "@/lib/schoolSettings";

type ClassRecord = { name: string; section: string };
type SubjectRecord = { name: string };
type ExamRecord = { name: string };

const selectClassName =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10 disabled:opacity-60";

const yearOptions = ["2026-2027", "2025-2026", "2024-2025"];

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function withCurrent(options: string[], current: string) {
  if (current && !options.includes(current)) return [current, ...options];
  return options;
}

export default function AcademicSettings() {
  const school = useSchoolSetting();
  const loadError = useSchoolSettingError();
  const edited = useRef(false);
  const [classes, setClasses] = useState<string[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [terms, setTerms] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState(school.selectedClass ?? "");
  const [selectedSection, setSelectedSection] = useState(school.selectedSection ?? "");
  const [selectedSubject, setSelectedSubject] = useState(school.selectedSubject ?? "");
  const [gradingSystem, setGradingSystem] = useState(school.gradingSystem ?? "");
  const [academicYear, setAcademicYear] = useState(school.academicYear);
  const [selectedTerm, setSelectedTerm] = useState(school.term ?? "");
  const [loaded, setLoaded] = useState(
    Boolean(school.selectedClass || school.academicYear || school.email),
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (edited.current) return;
    if (!school.schoolName && !school.email && !school.selectedClass && !school.academicYear) {
      return;
    }

    setLoaded(true);
    setSelectedClass(school.selectedClass ?? "");
    setSelectedSection(school.selectedSection ?? "");
    setSelectedSubject(school.selectedSubject ?? "");
    setGradingSystem(school.gradingSystem ?? "");
    setAcademicYear(school.academicYear);
    setSelectedTerm(school.term ?? "");
  }, [school]);

  useEffect(() => {
    if (loadError) setMessage(loadError);
  }, [loadError]);

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

        setClasses(
          unique(classRecords.map((item) => item.name)).sort((left, right) => {
            const leftNumber = Number(left.match(/\d+/)?.[0] ?? 0);
            const rightNumber = Number(right.match(/\d+/)?.[0] ?? 0);
            return rightNumber - leftNumber;
          }),
        );
        setSections(unique(classRecords.map((item) => item.section)));
        setSubjects(unique(subjectRecords.map((item) => item.name)));
        setTerms(
          unique(
            examRecords.map((item) => {
              const match = item.name.match(/mid-term|final-term|final/i);
              if (!match) return "";
              return match[0].toLowerCase() === "mid-term" ? "Mid-Term" : match[0];
            }),
          ),
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
  }, []);

  const editValue =
    (update: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      edited.current = true;
      update(event.target.value);
    };

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
          gradingSystem,
          academicYear,
          term: selectedTerm,
        }),
      });
      edited.current = false;
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

  const classOptions = withCurrent(classes, selectedClass);
  const sectionOptions = withCurrent(sections, selectedSection);
  const subjectOptions = withCurrent(subjects, selectedSubject);
  const termOptions = withCurrent(terms, selectedTerm);
  const gradingOptions = withCurrent(
    gradingSystem === "Percentage and letter grades" || gradingSystem === ""
      ? ["Percentage and letter grades"]
      : ["Percentage and letter grades"],
    gradingSystem,
  );
  const academicYearOptions = withCurrent(yearOptions, academicYear);

  return (
    <section className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
          <GraduationCap size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Academic Settings</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="settings-classes">
            <GraduationCap size={16} />
            Classes
          </label>
          <select
            id="settings-classes"
            value={selectedClass}
            onChange={editValue(setSelectedClass)}
            disabled={!loaded}
            className={selectClassName}
          >
            {selectedClass === "" && <option value=""></option>}
            {classOptions.map((item) => (
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
            onChange={editValue(setSelectedSection)}
            disabled={!loaded}
            className={selectClassName}
          >
            {selectedSection === "" && <option value=""></option>}
            {sectionOptions.map((item) => (
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
            onChange={editValue(setSelectedSubject)}
            disabled={!loaded}
            className={selectClassName}
          >
            {selectedSubject === "" && <option value=""></option>}
            {subjectOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="settings-grading">
            <Award size={16} />
            Grading System
          </label>
          <select
            id="settings-grading"
            value={gradingSystem}
            onChange={editValue(setGradingSystem)}
            disabled={!loaded}
            className={selectClassName}
          >
            {gradingSystem === "" && <option value=""></option>}
            {gradingOptions.filter(Boolean).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="settings-academic-year">
            <CalendarDays size={16} />
            Academic Year
          </label>
          <select
            id="settings-academic-year"
            value={academicYear}
            onChange={editValue(setAcademicYear)}
            disabled={!loaded}
            className={selectClassName}
          >
            {academicYear === "" && <option value=""></option>}
            {academicYearOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
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
            onChange={editValue(setSelectedTerm)}
            disabled={!loaded}
            className={selectClassName}
          >
            {selectedTerm === "" && <option value=""></option>}
            {termOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          disabled={saving || !loaded}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#01665d] disabled:opacity-60 sm:w-auto"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}

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
