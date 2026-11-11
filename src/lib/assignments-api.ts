import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Assignment } from "@/types/assignment";

export type ApiAssignment = {
  id: string;
  title: string;
  subjectId: string;
  subject: string;
  className: string;
  section: string;
  teacherId: string;
  teacher: string;
  dueDate: string;
  status: Assignment["status"];
};

function getToken(): string {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  return token;
}

export function mapApiAssignment(item: ApiAssignment): Assignment {
  return {
    ...item,
    dueDate: item.dueDate.slice(0, 10),
  };
}

/**
 * Loads the assignments for one of the signed-in parent's children.
 *
 * The backend verifies the ParentStudent link first, then returns the
 * assignments of the child's class and section. Assignment status is
 * tracked per class, not per student.
 */
export async function fetchChildAssignments(studentId: number) {
  const data = await apiRequest<ApiAssignment[]>(
    `/parents/me/children/${studentId}/assignments`,
    { token: getToken() }
  );

  return data.map(mapApiAssignment);
}
