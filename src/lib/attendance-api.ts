
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type {
  AttendanceRecord,
  AttendanceStatus,
} from "@/types/attendance";

export type ApiAttendanceStatus =
  | "PRESENT"
  | "ABSENT"
  | "LATE"
  | "LEAVE";

export type ApiAttendance = {
  id: number;
  studentId: number | null;
  teacherId: string | null;
  date: string;
  status: ApiAttendanceStatus;
  className: string | null;
  section: string | null;
  department: string | null;
  student?: {
    id: number;
    name: string;
    rollNo?: string;
    className: string;
    section: string;
  } | null;
  teacher?: {
    id: string;
    name: string;
    subject?: string | null;
  } | null;
};

export type ApiStudent = {
  id: number;
  name: string;
  className: string;
  section: string;
  status: string;
};

export type ApiTeacher = {
  id: string;
  name: string;
  subject?: string | null;
  status: string;
};

export const statusToApi = (
  status: AttendanceStatus,
): ApiAttendanceStatus => {
  return status.toUpperCase() as ApiAttendanceStatus;
};

export const statusFromApi = (
  status: ApiAttendanceStatus,
): AttendanceStatus => {
  const statuses: Record<ApiAttendanceStatus, AttendanceStatus> = {
    PRESENT: "Present",
    ABSENT: "Absent",
    LATE: "Late",
    LEAVE: "Leave",
  };

  return statuses[status];
};

export function toApiDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function toDisplayDate(value: string) {
  const datePart = value.slice(0, 10);
  const [year, month, day] = datePart.split("-").map(Number);

  if (
    !year ||
    !month ||
    month < 1 ||
    month > 12 ||
    !day ||
    day < 1 ||
    day > 31
  ) {
    return value;
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return `${String(day).padStart(2, "0")} ${months[month - 1]} ${year}`;
}

export function mapApiAttendance(
  item: ApiAttendance,
): AttendanceRecord {
  const date = toDisplayDate(item.date);
  const status = statusFromApi(item.status);

  if (item.studentId !== null) {
    return {
      id: item.id,
      studentId: item.studentId,
      name: item.student?.name ?? `Student ${item.studentId}`,
      role: "Student",
      className:
        item.student?.className ?? item.className ?? "",
      section: item.student?.section ?? item.section ?? "",
      date,
      status,
    };
  }

  return {
    id: item.id,
    teacherId: item.teacherId ?? "",
    name: item.teacher?.name ?? `Teacher ${item.teacherId ?? ""}`,
    role: "Teacher",
    department:
      item.teacher?.subject ?? item.department ?? "",
    date,
    status,
  };
}

function getToken(): string {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  return token;
}

export async function fetchAttendance(date?: string) {
  const query = date
    ? `?date=${encodeURIComponent(date)}`
    : "";

  const data = await apiRequest<ApiAttendance[]>(
    `/attendance${query}`,
    { token: getToken() },
  );

  return data.map(mapApiAttendance);
}

export async function fetchStudents() {
  return apiRequest<ApiStudent[]>("/students", {
    token: getToken(),
  });
}

export async function fetchTeachers() {
  return apiRequest<ApiTeacher[]>("/teachers", {
    token: getToken(),
  });
}

export async function saveAttendance(input: {
  existingRecordId?: number;
  studentId?: number;
  teacherId?: string;
  date: string;
  status: AttendanceStatus;
  className?: string;
  section?: string;
  department?: string;
}) {
  const {
    existingRecordId,
    studentId,
    teacherId,
    date,
    status,
    ...details
  } = input;

  const body = {
    ...(studentId !== undefined ? { studentId } : {}),
    ...(teacherId !== undefined ? { teacherId } : {}),
    date,
    status: statusToApi(status),
    ...details,
  };

  if (existingRecordId !== undefined) {
    return apiRequest<ApiAttendance>(
      `/attendance/${existingRecordId}`,
      {
        method: "PATCH",
        token: getToken(),
        body: JSON.stringify({ status: body.status }),
      },
    );
  }

  return apiRequest<ApiAttendance>("/attendance", {
    method: "POST",
    token: getToken(),
    body: JSON.stringify(body),
  });
}
