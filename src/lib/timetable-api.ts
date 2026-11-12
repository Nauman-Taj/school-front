import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { TimetableEntry } from "@/types/timetable";

export type ApiTimetableDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY";

export type ApiTimetable = {
  id: string;
  classId: number;
  className: string;
  section: string;
  subjectId: string;
  subject: string;
  teacherId: string;
  teacher: string;
  day: ApiTimetableDay;
  /** 24-hour "HH:MM" value. */
  startTime: string;
  /** 24-hour "HH:MM" value. */
  endTime: string;
  room: string;
};

const dayLabels: Record<ApiTimetableDay, TimetableEntry["day"]> = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
};

/**
 * Converts a 24-hour "HH:MM" value into the 12-hour label used on screen.
 */
export function toDisplayTime(value: string): string {
  const [hours, minutes] = value.split(":").map(Number);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return value;
  }

  const suffix = hours >= 12 ? "PM" : "AM";
  const hour = hours % 12 === 0 ? 12 : hours % 12;

  return `${hour}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function mapApiTimetable(item: ApiTimetable): TimetableEntry {
  return {
    ...item,
    day: dayLabels[item.day] ?? "Monday",
    startTime: toDisplayTime(item.startTime),
    endTime: toDisplayTime(item.endTime),
  };
}

/**
 * Converts the backend day name into the label used on screen.
 */
export function toDisplayDay(day: ApiTimetableDay): TimetableEntry["day"] {
  return dayLabels[day] ?? "Monday";
}

function getToken(): string {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  return token;
}

/**
 * Loads the weekly timetable for one of the signed-in parent's children.
 *
 * The backend verifies the ParentStudent link first, then returns the
 * timetable of the child's class and section.
 */
export async function fetchChildTimetable(studentId: number) {
  const data = await apiRequest<ApiTimetable[]>(
    `/parents/me/children/${studentId}/timetable`,
    { token: getToken() }
  );

  return data.map(mapApiTimetable);
}
