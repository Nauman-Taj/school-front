
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchAttendance,
  fetchStudents,
  fetchTeachers,
  saveAttendance,
  toApiDate,
  type ApiStudent,
  type ApiTeacher,
} from "@/lib/attendance-api";
import type {
  AttendanceRecord,
  AttendanceStatus,
} from "@/types/attendance";

type Mode = "student" | "teacher";

type Props = {
  mode: Mode;
};

const statuses: AttendanceStatus[] = [
  "Present",
  "Absent",
  "Late",
  "Leave",
];

export default function AttendanceMarkingPanel({ mode }: Props) {
  const [date, setDate] = useState(() => toApiDate(new Date()));
  const [students, setStudents] = useState<ApiStudent[]>([]);
  const [teachers, setTeachers] = useState<ApiTeacher[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, AttendanceStatus>
  >({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const [attendanceData, people] = await Promise.all([
        fetchAttendance(date),
        mode === "student" ? fetchStudents() : fetchTeachers(),
      ]);

      const activePeople = people.filter(
        (person) => person.status === "ACTIVE" || person.status === "Active",
      );

      setRecords(attendanceData);

      if (mode === "student") {
        setStudents(activePeople as ApiStudent[]);
      } else {
        setTeachers(activePeople as ApiTeacher[]);
      }

      const nextStatuses: Record<string, AttendanceStatus> = {};

      for (const record of attendanceData) {
        const key =
          record.role === "Student"
            ? `student-${record.studentId}`
            : `teacher-${record.teacherId}`;

        nextStatuses[key] = record.status;
      }

      setSelectedStatuses(nextStatuses);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load attendance data.",
      );
    } finally {
      setLoading(false);
    }
  }, [date, mode]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  function getExistingRecord(
    personId: number | string,
  ): AttendanceRecord | undefined {
    return records.find((record) =>
      mode === "student"
        ? record.role === "Student" && record.studentId === personId
        : record.role === "Teacher" && record.teacherId === personId,
    );
  }

  async function handleSave(personId: number | string) {
    const key = `${mode}-${personId}`;
    const existing = getExistingRecord(personId);
    const status = selectedStatuses[key] ?? "Present";

    setSavingId(key);
    setError("");
    setMessage("");

    try {
      await saveAttendance({
        ...(mode === "student"
          ? { studentId: Number(personId) }
          : { teacherId: String(personId) }),
        ...(existing ? { existingRecordId: existing.id } : {}),
        date,
        status,
        ...(mode === "student" && existing?.role === "Student"
          ? {
              className: existing.className,
              section: existing.section,
            }
          : mode === "student"
            ? {
                className: students.find((s) => s.id === personId)?.className,
                section: students.find((s) => s.id === personId)?.section,
              }
            : {
                department: teachers.find((t) => t.id === personId)?.subject ?? "",
              }),
      });

      setMessage("Attendance saved successfully.");
      await loadData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save attendance.",
      );
    } finally {
      setSavingId(null);
    }
  }

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Mark {mode === "student" ? "Student" : "Teacher"} Attendance
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Select a date and save each person's attendance.
          </p>
        </div>

        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {message && (
        <p role="status" className="mt-4 rounded-xl border border-[#cce7e3] bg-[#e6f4f2] p-3 text-sm text-[#015f58]">
          {message}
        </p>
      )}

      {loading ? (
        <div className="py-10 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">Loading attendance...</p>
        </div>
      ) : (
        <>
        <div className="mt-5 hidden overflow-hidden rounded-2xl border border-gray-100 lg:block">
          <div className="overflow-x-auto">
          <table className="w-full min-w-[620px]">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                  Name / ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                  Class / Subject
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {mode === "student" &&
                students.map((student) => {
                  const key = `student-${student.id}`;
                  const existing = getExistingRecord(student.id);

                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Student ID: {student.id}
                        </p>
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-600">
                        {student.className}-{student.section}
                      </td>

                      <td className="px-4 py-3">
                        <select
                          value={selectedStatuses[key] ?? "Present"}
                          onChange={(event) =>
                            setSelectedStatuses((previous) => ({
                              ...previous,
                              [key]: event.target.value as AttendanceStatus,
                            }))
                          }
                          className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          disabled={savingId === key}
                          onClick={() => void handleSave(student.id)}
                          className="rounded-full bg-[#01796f] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#015f58] disabled:opacity-50"
                        >
                          {savingId === key
                            ? "Saving..."
                            : existing
                              ? "Update"
                              : "Save"}
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {mode === "teacher" &&
                teachers.map((teacher) => {
                  const key = `teacher-${teacher.id}`;
                  const existing = getExistingRecord(teacher.id);

                  return (
                    <tr key={teacher.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">
                          {teacher.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Teacher ID: {teacher.id}
                        </p>
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-600">
                        {teacher.subject || "—"}
                      </td>

                      <td className="px-4 py-3">
                        <select
                          value={selectedStatuses[key] ?? "Present"}
                          onChange={(event) =>
                            setSelectedStatuses((previous) => ({
                              ...previous,
                              [key]: event.target.value as AttendanceStatus,
                            }))
                          }
                          className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          disabled={savingId === key}
                          onClick={() => void handleSave(teacher.id)}
                          className="rounded-full bg-[#01796f] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#015f58] disabled:opacity-50"
                        >
                          {savingId === key
                            ? "Saving..."
                            : existing
                              ? "Update"
                              : "Save"}
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {mode === "student" && students.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-500">
                    No active students found.
                  </td>
                </tr>
              )}

              {mode === "teacher" && teachers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-500">
                    No active teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {(mode === "student"
            ? students.map((person) => ({
                id: person.id,
                name: person.name,
                identifier: `Student ID: ${person.id}`,
                detail: `${person.className}-${person.section}`,
              }))
            : teachers.map((person) => ({
                id: person.id,
                name: person.name,
                identifier: `Teacher ID: ${person.id}`,
                detail: person.subject || "—",
              }))
          ).map((person) => {
            const key = `${mode}-${person.id}`;
            const existing = getExistingRecord(person.id);

            return (
              <article key={key} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900">{person.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{person.identifier}</p>
                <div className="mt-4 grid grid-cols-2 items-end gap-3 border-t border-gray-100 pt-4">
                  <div>
                    <p className="mb-1.5 text-xs text-gray-400">Class / Subject</p>
                    <p className="text-sm font-medium text-gray-700">{person.detail}</p>
                  </div>
                  <div>
                    <label htmlFor={`status-${key}`} className="mb-1.5 block text-xs text-gray-400">Status</label>
                    <select
                      id={`status-${key}`}
                      value={selectedStatuses[key] ?? "Present"}
                      onChange={(event) =>
                        setSelectedStatuses((previous) => ({
                          ...previous,
                          [key]: event.target.value as AttendanceStatus,
                        }))
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={savingId === key}
                  onClick={() => void handleSave(person.id)}
                  className="mt-4 w-full rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {savingId === key ? "Saving..." : existing ? "Update Attendance" : "Save Attendance"}
                </button>
              </article>
            );
          })}

          {((mode === "student" && students.length === 0) ||
            (mode === "teacher" && teachers.length === 0)) && (
            <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
              {mode === "student" ? "No active students found." : "No active teachers found."}
            </div>
          )}
        </div>
        </>
      )}
    </section>
  );
}
