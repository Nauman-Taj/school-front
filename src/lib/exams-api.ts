import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Exam } from "@/types/exam";

export type ApiExam = {
  id: string;
  name: string;
  subjectId: string;
  subject: string;
  className: string;
  section: string;
  sections?: { className: string; section: string }[];
  teacherId: string;
  teacher: string;
  examDate: string;
  totalMarks: number;
  status: string;
};

function getToken(): string {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  return token;
}

export function mapApiExam(item: ApiExam): Exam {
  return {
    ...item,
    examDate: item.examDate.slice(0, 10),
    status: item.status === "Upcoming" ? "Upcoming" : "Completed",
  };
}

/**
 * Loads the exams for one of the signed-in parent's children.
 *
 * The backend verifies the ParentStudent link, then filters by the child's
 * class and section through ExamSection, so only relevant exams are returned.
 */
export async function fetchChildExams(studentId: number) {
  const data = await apiRequest<ApiExam[]>(
    `/parents/me/children/${studentId}/exams`,
    { token: getToken() }
  );

  return data.map(mapApiExam);
}
