"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

import { fetchChildTimetable } from "@/lib/timetable-api";
import { useParentProfile } from "@/lib/useParentProfile";
import type { TimetableEntry } from "@/types/timetable";

import TimetableGrid from "@/components/timetable/TimetableGrid";

export default function ParentTimetablePage() {
  const {
    children,
    loading: profileLoading,
    error: profileError,
  } = useParentProfile();

  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  const selectedStudent = useMemo(
    () =>
      children.find((child) => child.id === selectedChildId) ??
      children[0],
    [children, selectedChildId]
  );

  const selectedStudentId = selectedStudent?.id ?? null;

  const [timetableState, setTimetableState] = useState<{
    studentId: number | null;
    entries: TimetableEntry[];
    error: string;
  }>({
    studentId: null,
    entries: [],
    error: "",
  });

  useEffect(() => {
    if (selectedStudentId === null) return;

    let active = true;

    fetchChildTimetable(selectedStudentId)
      .then((data) => {
        if (!active) return;
        setTimetableState({
          studentId: selectedStudentId,
          entries: data,
          error: "",
        });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setTimetableState({
          studentId: selectedStudentId,
          entries: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load the timetable.",
        });
      });

    return () => {
      active = false;
    };
  }, [selectedStudentId]);

  // A stored entry belongs to the previously selected child until the new
  // request resolves, so treat that mismatch as loading.
  const timetableLoading =
    selectedStudentId !== null &&
    timetableState.studentId !== selectedStudentId;

  const entries = timetableLoading ? [] : timetableState.entries;
  const timetableError = timetableLoading ? "" : timetableState.error;

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Timetable
      </h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        View your child&apos;s weekly class timetable.
      </p>
    </div>
  );

  if (profileLoading) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading timetable...
          </p>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="space-y-5">
        {header}

        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {profileError}
        </div>
      </div>
    );
  }

  if (!selectedStudent) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Child data not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            No timetable information is available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Heading */}
      {header}

      {/* Child Information + Selector */}
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Selected Child
          </p>

          <h2 className="mt-2 text-xl font-bold text-gray-900">
            {selectedStudent.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {selectedStudent.className} - Section{" "}
            {selectedStudent.section}
            {" • "}
            Roll No: {selectedStudent.rollNo}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <label
            htmlFor="child"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select Child
          </label>

          <select
            id="child"
            value={selectedStudent.id}
            onChange={(e) =>
              setSelectedChildId(Number(e.target.value))
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/20"
          >
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timetable Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
          <CalendarDays size={19} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Weekly Timetable
          </h2>

          <p className="text-sm text-gray-500">
            Class schedule for {selectedStudent.name}.
          </p>
        </div>
      </div>

      {timetableError && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {timetableError}
        </div>
      )}

      {timetableLoading ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading the weekly timetable...
          </p>
        </div>
      ) : (
        <TimetableGrid entries={entries} />
      )}
    </div>
  );
}
