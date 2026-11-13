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

export type ApiTeacherAssignment = {
  id: string;
  title: string;
  subjectId: string;
  subject: string;
  className: string;
  section: string;
  teacherId: string;
  teacher: string;
  dueDate: string;
  status: string;
};

export type TeacherAssignment = Omit<ApiTeacherAssignment, "status"> & {
  status: "Pending" | "Submitted" | "Overdue";
};

export type ApiTeacherExam = {
  id: string;
  name: string;
  subjectId: string;
  subject: string;
  className: string;
  section: string;
  teacherId: string;
  teacher: string;
  examDate: string;
  totalMarks: number;
  status: string;
};

export type TeacherExam = Omit<ApiTeacherExam, "status"> & {
  status: "Upcoming" | "Completed";
};

const assignmentStatusLabels: Record<string, TeacherAssignment["status"]> = {
  PENDING: "Pending",
  SUBMITTED: "Submitted",
  OVERDUE: "Overdue",
};

export function mapTeacherAssignment(
  item: ApiTeacherAssignment
): TeacherAssignment {
  return {
    ...item,
    status: assignmentStatusLabels[item.status.toUpperCase()] ?? "Pending",
  };
}

export function mapTeacherExam(item: ApiTeacherExam): TeacherExam {
  return {
    ...item,
    status: item.status === "Upcoming" ? "Upcoming" : "Completed",
  };
}

/**
 * Loads the assignments of the subjects the signed-in teacher teaches.
 */
export async function fetchTeacherAssignments(): Promise<TeacherAssignment[]> {
  const data = await apiRequest<ApiTeacherAssignment[]>(
    "/teachers/me/assignments",
    { token: getToken() }
  );

  return data.map(mapTeacherAssignment);
}

/**
 * Loads the exams of the classes the signed-in teacher is involved in.
 */
export async function fetchTeacherExams(): Promise<TeacherExam[]> {
  const data = await apiRequest<ApiTeacherExam[]>("/teachers/me/exams", {
    token: getToken(),
  });

  return data.map(mapTeacherExam);
}

export type TeacherAssignmentInput = {
  title: string;
  subjectId: string;
  dueDate: string;
  status?: "PENDING" | "SUBMITTED" | "OVERDUE";
};

/**
 * Creates an assignment for one of the signed-in teacher's subjects.
 */
export async function createTeacherAssignment(
  input: TeacherAssignmentInput
): Promise<TeacherAssignment> {
  const data = await apiRequest<ApiTeacherAssignment>(
    "/teachers/me/assignments",
    {
      method: "POST",
      token: getToken(),
      body: JSON.stringify(input),
    }
  );

  return mapTeacherAssignment(data);
}

/**
 * Updates one of the signed-in teacher's assignments.
 */
export async function updateTeacherAssignment(
  id: string,
  input: Partial<TeacherAssignmentInput>
): Promise<TeacherAssignment> {
  const data = await apiRequest<ApiTeacherAssignment>(
    `/teachers/me/assignments/${id}`,
    {
      method: "PATCH",
      token: getToken(),
      body: JSON.stringify(input),
    }
  );

  return mapTeacherAssignment(data);
}

/**
 * Deletes one of the signed-in teacher's assignments.
 */
export async function deleteTeacherAssignment(id: string): Promise<void> {
  await apiRequest(`/teachers/me/assignments/${id}`, {
    method: "DELETE",
    token: getToken(),
  });
}

export type ApiTeacherExamStudent = {
  studentId: number;
  name: string;
  rollNo: string;
  className: string;
  section: string;
  resultId: number | null;
  obtainedMarks: number | null;
  percentage: number | null;
  grade: string | null;
  status: string | null;
};

export type ApiTeacherExamDetail = {
  exam: ApiTeacherExam;
  students: ApiTeacherExamStudent[];
};

/**
 * Loads one of the signed-in teacher's exams with its students and the marks
 * already recorded for it.
 */
export async function fetchTeacherExamDetail(
  examId: string
): Promise<ApiTeacherExamDetail> {
  return apiRequest<ApiTeacherExamDetail>(
    `/teachers/me/exams/${encodeURIComponent(examId)}`,
    { token: getToken() }
  );
}

/**
 * Records the marks of one of the teacher's students, creating the result when
 * it does not exist yet and updating it otherwise.
 */
export async function saveTeacherMark(input: {
  studentId: number;
  examId: string;
  obtainedMarks: number;
  resultId: number | null;
}): Promise<void> {
  if (input.resultId) {
    await apiRequest(`/teachers/me/results/${input.resultId}`, {
      method: "PATCH",
      token: getToken(),
      body: JSON.stringify({ obtainedMarks: input.obtainedMarks }),
    });

    return;
  }

  await apiRequest("/teachers/me/results", {
    method: "POST",
    token: getToken(),
    body: JSON.stringify({
      studentId: input.studentId,
      examId: input.examId,
      obtainedMarks: input.obtainedMarks,
    }),
  });
}

export type UpdateTeacherProfileInput = {
  name?: string;
  email?: string;
  phone?: string;
  qualification?: string;
  joiningDate?: string;
};

/**
 * Updates the signed-in teacher's own profile.
 *
 * Only the fields a teacher owns can be changed here; the id, the linked
 * account, the status and the class and subject assignments are managed by the
 * school administration.
 */
export async function updateTeacherProfile(
  input: UpdateTeacherProfileInput
): Promise<ApiTeacherProfile> {
  return apiRequest<ApiTeacherProfile>("/teachers/me", {
    method: "PATCH",
    token: getToken(),
    body: JSON.stringify(input),
  });
}

/**
 * Changes the password of the signed-in account.
 *
 * The password belongs to the login account, so it goes through
 * `PATCH /auth/me` with the current password for verification.
 */
export async function changeTeacherPassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  await apiRequest("/auth/me", {
    method: "PATCH",
    token: getToken(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export type StudyMaterialType = "PDF" | "Document" | "Video" | "Notes";

export type ApiStudyMaterial = {
  id: number;
  title: string;
  description: string;
  subjectId: string;
  subject: string;
  className: string;
  section: string;
  teacherId: string;
  teacher: string;
  type: StudyMaterialType;
  date: string;
  fileUrl: string | null;
  fileName: string | null;
};

export type TeacherStudyMaterialInput = {
  title: string;
  description: string;
  subjectId: string;
  type: StudyMaterialType;
  date: string;
  fileUrl?: string;
  fileName?: string;
};

/**
 * The API stores the type as an enum, the portal shows it in words.
 */
const studyMaterialTypeToApi: Record<StudyMaterialType, string> = {
  PDF: "PDF",
  Document: "DOCUMENT",
  Video: "VIDEO",
  Notes: "NOTES",
};

/**
 * Loads the study material of the signed-in teacher.
 */
export async function fetchTeacherStudyMaterials(): Promise<
  ApiStudyMaterial[]
> {
  return apiRequest<ApiStudyMaterial[]>("/teachers/me/study-materials", {
    token: getToken(),
  });
}

/**
 * Loads one of the signed-in teacher's study materials.
 */
export async function fetchTeacherStudyMaterial(
  id: number
): Promise<ApiStudyMaterial> {
  return apiRequest<ApiStudyMaterial>(
    `/teachers/me/study-materials/${id}`,
    { token: getToken() }
  );
}

/**
 * Publishes a study material for one of the teacher's subjects.
 */
export async function createTeacherStudyMaterial(
  input: TeacherStudyMaterialInput
): Promise<ApiStudyMaterial> {
  return apiRequest<ApiStudyMaterial>("/teachers/me/study-materials", {
    method: "POST",
    token: getToken(),
    body: JSON.stringify({
      ...input,
      type: studyMaterialTypeToApi[input.type],
    }),
  });
}

/**
 * Updates one of the signed-in teacher's study materials.
 */
export async function updateTeacherStudyMaterial(
  id: number,
  input: Partial<TeacherStudyMaterialInput>
): Promise<ApiStudyMaterial> {
  return apiRequest<ApiStudyMaterial>(
    `/teachers/me/study-materials/${id}`,
    {
      method: "PATCH",
      token: getToken(),
      body: JSON.stringify({
        ...input,
        ...(input.type
          ? { type: studyMaterialTypeToApi[input.type] }
          : {}),
      }),
    }
  );
}

/**
 * Removes one of the signed-in teacher's study materials.
 */
export async function deleteTeacherStudyMaterial(id: number): Promise<void> {
  await apiRequest(`/teachers/me/study-materials/${id}`, {
    method: "DELETE",
    token: getToken(),
  });
}

/**
 * Today's date, in the same UTC convention the API uses for the due dates.
 */
export function teacherToday(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * The status a teacher sees for an assignment.
 *
 * The stored status is class level and is whatever the last edit set, so a
 * pending assignment whose due date has already passed is shown as overdue:
 * that is the assignment the teacher still has to chase.
 */
export function teacherAssignmentStatus(
  assignment: TeacherAssignment,
  today: string
): TeacherAssignment["status"] {
  if (assignment.status === "Overdue") return "Overdue";

  if (assignment.status === "Pending" && assignment.dueDate < today) {
    return "Overdue";
  }

  return assignment.status;
}
