import { getSession } from "@/lib/auth";
import { parents } from "@/data/parents";
import { parentChildren } from "@/data/parentChildren";
import { students } from "@/data/students";

export const getCurrentParent = () => {
  const session = getSession();

  if (!session || session.role !== "Parent") {
    return null;
  }

  return (
    parents.find((parent) => parent.name === session.name) ??
    parents.find((parent) => parent.email === session.email) ??
    null
  );
};

export const getCurrentParentChildren = () => {
  const parent = getCurrentParent();

  if (!parent) {
    return [];
  }

  return parentChildren
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
};