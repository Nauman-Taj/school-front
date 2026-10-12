import { getSession } from "@/lib/auth";
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