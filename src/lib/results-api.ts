import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Result } from "@/types/result";

export type ApiResult = {
  id: string;
  studentId: number;
  student: string;
  rollNo?: string;
  examId: string;
  exam?: string;
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
  status: "Pass" | "Fail";
};

function getToken(): string {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  return token;
}

export function mapApiResult(item: ApiResult): Result {
  return {
    ...item,
    status: item.status === "Pass" ? "Pass" : "Fail",
  };
}

/**
 * Loads the results for one of the signed-in parent's children.
 *
 * The backend verifies the ParentStudent link first, so an unlinked
 * studentId fails with 404 instead of exposing another child's results.
 */
export async function fetchChildResults(studentId: number) {
  const data = await apiRequest<ApiResult[]>(
    `/parents/me/children/${studentId}/results`,
    { token: getToken() }
  );

  return data.map(mapApiResult);
}
