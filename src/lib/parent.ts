import { apiRequest } from "@/lib/api";
import { getAuthToken, getSession } from "@/lib/auth";
import type { Parent, ParentChild } from "@/types/parent";
import { parents } from "@/data/parents";
import { parentChildren } from "@/data/parentChildren";
import { students } from "@/data/students";

type RegisteredParent = {
  id: number;
  name: string;
  email: string;
  childRollNo?: string;
  phone?: string;
  status?: string;
};

const getRegisteredParents = (): RegisteredParent[] => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(
      localStorage.getItem("registered-parents") || "[]"
    ) as RegisteredParent[];
  } catch {
    return [];
  }
};

export const getCurrentParent = () => {
  const session = getSession();

  if (!session || session.role !== "Parent") return null;

  const email = session.email.trim().toLowerCase();

  return (
    getRegisteredParents().find(
      (parent) => parent.email?.trim().toLowerCase() === email
    ) ??
    parents.find(
      (parent) => parent.email?.trim().toLowerCase() === email
    ) ??
    null
  );
};

export const getCurrentParentChildren = () => {
  const session = getSession();

  if (!session || session.role !== "Parent") return [];

  const email = session.email.trim().toLowerCase();

  const sharedParent = parents.find(
    (parent) => parent.email?.trim().toLowerCase() === email
  );

  if (sharedParent) {
    return parentChildren
      .filter(
        (relationship) =>
          Number(relationship.parentId) === Number(sharedParent.id)
      )
      .flatMap((relationship) => {
        const student = students.find(
          (item) => Number(item.id) === Number(relationship.studentId)
        );

        return student
          ? [{
              studentId: student.id,
              name: student.name,
              className: student.className,
              section: student.section,
              rollNo: student.rollNo,
            }]
          : [];
      });
  }

  const registeredParent = getRegisteredParents().find(
    (parent) => parent.email?.trim().toLowerCase() === email
  );

  const student = students.find(
    (item) =>
      registeredParent?.childRollNo?.trim() &&
      String(item.rollNo).trim() === registeredParent.childRollNo.trim()
  );

  return student
    ? [{
        studentId: student.id,
        name: student.name,
        className: student.className,
        section: student.section,
        rollNo: student.rollNo,
      }]
    : [];
};

/*
 * API-backed parent portal data.
 *
 * The Parent portal reads the signed-in parent through GET /parents/me.
 * The response uses backend enum values (for example ACTIVE) and ISO dates,
 * so it is mapped to the existing frontend Parent/ParentChild types here.
 */

export type ApiParentChild = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  parentName: string | null;
  className: string;
  section: string;
  rollNo: string;
  status: string;
  admissionDate: string | null;
  withdrawalDate: string | null;
};

export type ApiParentProfile = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  occupation: string | null;
  status: string;
  children: ApiParentChild[];
};

const toDisplayStatus = (status: string): "Active" | "Inactive" =>
  status.toUpperCase() === "ACTIVE" ? "Active" : "Inactive";

const toDisplayDate = (value: string | null) =>
  value ? value.slice(0, 10) : null;

export function mapParentChild(child: ApiParentChild): ParentChild {
  return {
    id: child.id,
    name: child.name,
    className: child.className,
    section: child.section,
    rollNo: child.rollNo,
    status: toDisplayStatus(child.status),
    email: child.email,
    phone: child.phone,
    parentName: child.parentName,
    admissionDate: toDisplayDate(child.admissionDate),
    withdrawalDate: toDisplayDate(child.withdrawalDate),
  };
}

export function mapParentProfile(profile: ApiParentProfile): Parent {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    phone: profile.phone ?? "",
    address: profile.address ?? "",
    occupation: profile.occupation ?? "",
    status: toDisplayStatus(profile.status),
    children: profile.children.map(mapParentChild),
  };
}

export async function fetchParentProfile(): Promise<Parent> {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const profile = await apiRequest<ApiParentProfile>("/parents/me", {
    token,
  });

  return mapParentProfile(profile);
}