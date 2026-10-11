import { getSession } from "@/lib/auth";
import { parents } from "@/data/parents";
import { parentChildren } from "@/data/parentChildren";
import { students } from "@/data/students";

type RegisteredParent = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  childName?: string;
  childRollNo?: string;
  status?: string;
};

export const getCurrentParent = () => {
  const session = getSession();

  if (!session || session.role !== "Parent") {
    return null;
  }

  // First, find an existing shared parent by account ID.
  const sharedParent = parents.find(
    (parent) => Number(parent.id) === Number(session.id)
  );

  if (sharedParent) {
    return sharedParent;
  }

  // Then, check newly registered parents.
  let registeredParents: RegisteredParent[] = [];

  try {
    registeredParents = JSON.parse(
      localStorage.getItem("registered-parents") || "[]"
    );
  } catch {
    registeredParents = [];
  }

  const registeredParent = registeredParents.find(
    (parent) =>
      parent.id === session.id ||
      parent.email?.toLowerCase() === session.email.toLowerCase()
  );

  if (registeredParent) {
    return {
      ...registeredParent,
      id: registeredParent.id,
    };
  }

  // Backward-compatible lookup for existing shared data.
  return (
    parents.find(
      (parent) =>
        parent.email?.toLowerCase() === session.email.toLowerCase()
    ) ??
    parents.find((parent) => parent.name === session.name) ??
    null
  );
};

export const getCurrentParentChildren = () => {
  const parent = getCurrentParent();

  if (!parent) {
    return [];
  }

  // Existing relationships to official student records.
  const linkedChildren = parentChildren
    .filter((child) => child.parentId === parent.id)
    .map((child) => {
      const student = students.find(
        (student) => student.id === child.studentId
      );

      if (!student) {
        return null;
      }

      return {
        studentId: student.id,
        name: student.name,
        className: student.className,
        section: student.section,
        rollNo: student.rollNo,
      };
    })
    .filter((child): child is NonNullable<typeof child> => child !== null);

  if (linkedChildren.length > 0) {
    return linkedChildren;
  }

  // A newly registered parent may identify a child by roll number.
  const session = getSession();

  if (!session) {
    return [];
  }

  let registeredParents: RegisteredParent[] = [];

  try {
    registeredParents = JSON.parse(
      localStorage.getItem("registered-parents") || "[]"
    );
  } catch {
    registeredParents = [];
  }

  const registeredParent = registeredParents.find(
    (item) =>
      item.id === session.id ||
      item.email?.toLowerCase() === session.email.toLowerCase()
  );

  if (!registeredParent) {
    return [];
  }

  const childRollNo = registeredParent.childRollNo?.trim();

  if (childRollNo) {
    const student = students.find(
      (item) => String(item.rollNo) === childRollNo
    );

    if (student) {
      return [
        {
          studentId: student.id,
          name: student.name,
          className: student.className,
          section: student.section,
          rollNo: student.rollNo,
        },
      ];
    }
  }

  // Show the entered child details only as registration information.
  // This does not create an official student record or grant access
  // to attendance, results, fees, or other school records.
  return [];
};