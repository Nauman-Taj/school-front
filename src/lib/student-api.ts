import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { mapApiTimetable } from "@/lib/timetable-api";
import type { ApiTimetable } from "@/lib/timetable-api";
import type { AttendanceStatus } from "@/types/attendance";
import type { TimetableEntry } from "@/types/timetable";

export type ApiStudentProfile = {
  id: number;
  userId: number | null;
  name: string;
  email: string | null;
  className: string;
  section: string;
  rollNo: string;
  parentName: string | null;
  phone: string | null;
  status: string;
  admissionDate: string | null;
  withdrawalDate: string | null;
};

export type ApiStudentSubject = {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  teacher: string;
  className: string;
  section: string;
  status: string;
};

export type ApiStudentAttendance = {
  id: number;
  studentId: number | null;
  date: string;
  status: string;
  className: string | null;
  section: string | null;
};

export type ApiStudentResult = {
  id: string;
  examId: string;
  exam: string;
  subjectId: string;
  subject: string;
  teacherId: string;
  teacher: string;
  className: string;
  section: string;
  obtainedMarks: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  status: string;
};

export type ApiStudentFee = {
  id: string;
  invoiceNumber: string;
  feeType: string;
  amount: number;
  paidAmount: number;
  remainingAmount: number;
  dueDate: string;
  status: string;
  payments: {
    id: string;
    amount: number;
    paymentDate: string;
    paymentMethod: string;
    receiptNumber: string | null;
  }[];
};

export type ApiStudentExam = {
  id: string;
  name: string;
  subjectId: string;
  subject: string;
  teacherId: string;
  teacher: string;
  className: string;
  section: string;
  examDate: string;
  totalMarks: number;
  status: string;
};

export type ApiStudentAssignment = {
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

export type ApiStudentStudyMaterial = {
  id: number;
  title: string;
  description: string;
  subjectId: string;
  subject: string;
  className: string;
  section: string;
  teacherId: string;
  teacher: string;
  type: "PDF" | "Document" | "Video" | "Notes";
  date: string;
  fileUrl: string | null;
  fileName: string | null;
};

const attendanceStatusLabels: Record<string, AttendanceStatus> = {
  PRESENT: "Present",
  ABSENT: "Absent",
  LATE: "Late",
  LEAVE: "Leave",
};

function getToken(): string {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  return token;
}

/**
 * Loads the signed-in student.
 *
 * The backend resolves the student through the linked user account, so the
 * portal never has to match a student by name or roll number.
 */
export async function fetchStudentProfile(): Promise<ApiStudentProfile> {
  return apiRequest<ApiStudentProfile>("/students/me", { token: getToken() });
}

/**
 * Updates the signed-in student's own profile.
 */
export async function updateStudentProfile(input: {
  name?: string;
  email?: string;
  phone?: string;
}): Promise<ApiStudentProfile> {
  return apiRequest<ApiStudentProfile>("/students/me", {
    method: "PATCH",
    token: getToken(),
    body: JSON.stringify(input),
  });
}

/**
 * The subjects taught in the student's class.
 */
export async function fetchStudentSubjects(): Promise<ApiStudentSubject[]> {
  return apiRequest<ApiStudentSubject[]>("/students/me/subjects", {
    token: getToken(),
  });
}

/**
 * The student's own attendance records.
 */
export async function fetchStudentAttendance(): Promise<
  {
    id: number;
    date: string;
    status: AttendanceStatus;
  }[]
> {
  const data = await apiRequest<ApiStudentAttendance[]>(
    "/students/me/attendance",
    { token: getToken() }
  );

  return data.map((record) => ({
    id: record.id,
    date: record.date.slice(0, 10),
    status:
      attendanceStatusLabels[record.status.toUpperCase()] ?? "Absent",
  }));
}

/**
 * The assignments of the student's class.
 */
export async function fetchStudentAssignments(): Promise<
  ApiStudentAssignment[]
> {
  return apiRequest<ApiStudentAssignment[]>("/students/me/assignments", {
    token: getToken(),
  });
}

/**
 * The study material published for the student's class.
 */
export async function fetchStudentStudyMaterials(): Promise<
  ApiStudentStudyMaterial[]
> {
  return apiRequest<ApiStudentStudyMaterial[]>(
    "/students/me/study-materials",
    { token: getToken() }
  );
}

/**
 * The exams of the student's class.
 */
export async function fetchStudentExams(): Promise<ApiStudentExam[]> {
  return apiRequest<ApiStudentExam[]>("/students/me/exams", {
    token: getToken(),
  });
}

/**
 * The student's own results.
 */
export async function fetchStudentResults(): Promise<ApiStudentResult[]> {
  return apiRequest<ApiStudentResult[]>("/students/me/results", {
    token: getToken(),
  });
}

/**
 * The weekly timetable of the student's class.
 */
export async function fetchStudentTimetable(): Promise<TimetableEntry[]> {
  const data = await apiRequest<ApiTimetable[]>("/students/me/timetable", {
    token: getToken(),
  });

  return data.map(mapApiTimetable);
}

/**
 * The student's fee invoices.
 */
export async function fetchStudentFees(): Promise<ApiStudentFee[]> {
  return apiRequest<ApiStudentFee[]>("/students/me/fees", {
    token: getToken(),
  });
}
