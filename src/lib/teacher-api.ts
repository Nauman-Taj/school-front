import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { ApiTimetable, ApiTimetableDay } from "@/lib/timetable-api";
import {
  mapApiTimetable,
  toDisplayDay,
  toDisplayTime,
} from "@/lib/timetable-api";
import type { AttendanceStatus } from "@/types/attendance";
import type { TimetableEntry } from "@/types/timetable";

export type ApiTeacherClass = {
  id: number;
  name: string;
  section: string;
  teacherId: string;
  teacher: string;
  room: string;
  status: string;
  studentCount: number;
};

export type ApiTeacherSubject = {
  id: string;
  name: string;
  code: string;
  className: string;
  section: string;
  teacherId: string;
  status: string;
};

export type ApiTeacherProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  joiningDate: string | null;
  status: string;
  classes: ApiTeacherClass[];
  subjects: ApiTeacherSubject[];
};

export type ApiTeacherTimetable = {
  teacher: {
    id: string;
    name: string;
  };
  periods: ApiTimetable[];
  classes: ApiTeacherClass[];
  subjects: ApiTeacherSubject[];
};

export type ApiTeacherSchedule = {
  day: ApiTimetableDay;
  startTime: string;
  endTime: string;
};

export type ApiTeacherClassView = {
  id: number;
  className: string;
  section: string;
  subjects: string[];
  room: string;
  schedule: ApiTeacherSchedule | null;
  students: number;
  isClassTeacher: boolean;
  status: string;
};

export type ApiTeacherClassStudent = {
  id: number;
  name: string;
  rollNo: string;
  email: string;
  phone: string;
  parentName: string;
  status: string;
};

export type ApiTeacherClassDetail = {
  id: number;
  className: string;
  section: string;
  room: string;
  status: string;
  isClassTeacher: boolean;
  classTeacherName: string;
  subjects: string[];
  schedule: ApiTeacherSchedule | null;
  students: ApiTeacherClassStudent[];
};

export type TeacherClassView = {
  id: number;
  className: string;
  section: string;
  subject: string;
  room: string;
  schedule: string;
  students: number;
  classTeacher: boolean;
};

export type ApiTeacherStudent = {
  id: number;
  name: string;
  email: string;
  className: string;
  section: string;
  rollNo: string;
  parentName: string;
  phone: string;
  status: string;
};

export type TeacherStudent = Omit<ApiTeacherStudent, "status"> & {
  status: "Active" | "Inactive";
};

export function mapTeacherSchedule(
  schedule: ApiTeacherSchedule | null
): string {
  if (!schedule) return "-";

  return `${toDisplayDay(schedule.day)} ${toDisplayTime(schedule.startTime)} - ${toDisplayTime(schedule.endTime)}`;
}

export function mapTeacherClass(
  item: ApiTeacherClassView
): TeacherClassView {
  return {
    id: item.id,
    className: item.className,
    section: item.section,
    subject: item.subjects.join(", "),
    room: item.room,
    schedule: mapTeacherSchedule(item.schedule),
    students: item.students,
    classTeacher: item.isClassTeacher,
  };
}

export function mapTeacherStudent(item: ApiTeacherStudent): TeacherStudent {
  return {
    ...item,
    status: item.status.toUpperCase() === "ACTIVE" ? "Active" : "Inactive",
  };
}

function getToken(): string {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  return token;
}

/**
 * Loads the signed-in teacher.
 *
 * The backend resolves the teacher through the linked user account, so the
 * portal never has to match a teacher by name or email.
 */
export async function fetchTeacherProfile(): Promise<ApiTeacherProfile> {
  return apiRequest<ApiTeacherProfile>("/teachers/me", {
    token: getToken(),
  });
}

/**
 * Loads the teacher's own weekly periods together with the classes assigned
 * to them.
 */
export async function fetchTeacherTimetable(): Promise<{
  teacher: ApiTeacherTimetable["teacher"];
  periods: TimetableEntry[];
  classes: ApiTeacherClass[];
  subjects: ApiTeacherSubject[];
}> {
  const data = await apiRequest<ApiTeacherTimetable>(
    "/teachers/me/timetable",
    { token: getToken() }
  );

  return {
    teacher: data.teacher,
    periods: data.periods.map(mapApiTimetable),
    classes: data.classes,
    subjects: data.subjects,
  };
}

/**
 * Loads the classes the signed-in teacher is involved in.
 */
export async function fetchTeacherClasses(): Promise<TeacherClassView[]> {
  const data = await apiRequest<ApiTeacherClassView[]>(
    "/teachers/me/classes",
    { token: getToken() }
  );

  return data.map(mapTeacherClass);
}

/**
 * Loads one of the signed-in teacher's classes with its students.
 */
export async function fetchTeacherClass(
  classId: number
): Promise<ApiTeacherClassDetail> {
  return apiRequest<ApiTeacherClassDetail>(
    `/teachers/me/classes/${classId}`,
    { token: getToken() }
  );
}

/**
 * Loads the students of the signed-in teacher's classes.
 */
export async function fetchTeacherStudents(): Promise<TeacherStudent[]> {
  const data = await apiRequest<ApiTeacherStudent[]>(
    "/teachers/me/students",
    { token: getToken() }
  );

  return data.map(mapTeacherStudent);
}

/**
 * Loads one of the signed-in teacher's students.
 */
export async function fetchTeacherStudent(
  studentId: number
): Promise<TeacherStudent> {
  const data = await apiRequest<ApiTeacherStudent>(
    `/teachers/me/students/${studentId}`,
    { token: getToken() }
  );

  return mapTeacherStudent(data);
}

export type ApiTeacherAttendanceRow = {
  studentId: number;
  name: string;
  rollNo: string;
  className: string;
  section: string;
  recordId: number | null;
  status: string | null;
};

export type ApiTeacherAttendanceSheet = {
  date: string;
  classes: { className: string; section: string }[];
  students: ApiTeacherAttendanceRow[];
};

export type TeacherAttendanceRow = {
  studentId: number;
  recordId: number | null;
  name: string;
  rollNo: string;
  className: string;
  section: string;
  status: AttendanceStatus | null;
};

const attendanceStatusLabels: Record<string, AttendanceStatus> = {
  PRESENT: "Present",
  ABSENT: "Absent",
  LATE: "Late",
  LEAVE: "Leave",
};

export function attendanceStatusToApi(status: AttendanceStatus): string {
  return status.toUpperCase();
}

export function mapTeacherAttendanceRow(
  item: ApiTeacherAttendanceRow
): TeacherAttendanceRow {
  return {
    studentId: item.studentId,
    recordId: item.recordId,
    name: item.name,
    rollNo: item.rollNo,
    className: item.className,
    section: item.section,
    status: item.status
      ? (attendanceStatusLabels[item.status.toUpperCase()] ?? null)
      : null,
  };
}

/**
 * Loads the attendance sheet of the signed-in teacher for one date.
 */
export async function fetchTeacherAttendanceSheet(
  date: string
): Promise<{
  date: string;
  classes: { className: string; section: string }[];
  students: TeacherAttendanceRow[];
}> {
  const data = await apiRequest<ApiTeacherAttendanceSheet>(
    `/teachers/me/attendance?date=${encodeURIComponent(date)}`,
    { token: getToken() }
  );

  return {
    date: data.date,
    classes: data.classes,
    students: data.students.map(mapTeacherAttendanceRow),
  };
}

/**
 * Records the attendance of one student for a date.
 */
export async function markTeacherAttendance(
  studentId: number,
  date: string,
  status: AttendanceStatus
): Promise<void> {
  await apiRequest("/teachers/me/attendance", {
    method: "POST",
    token: getToken(),
    body: JSON.stringify({
      studentId,
      date,
      status: attendanceStatusToApi(status),
    }),
  });
}

/**
 * Updates a status the teacher already recorded.
 */
export async function updateTeacherAttendance(
  recordId: number,
  status: AttendanceStatus
): Promise<void> {
  await apiRequest(`/teachers/me/attendance/${recordId}`, {
    method: "PATCH",
    token: getToken(),
    body: JSON.stringify({ status: attendanceStatusToApi(status) }),
  });
}
