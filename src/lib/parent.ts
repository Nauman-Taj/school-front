import { getSession } from "@/lib/auth";
import { parents } from "@/data/parents";
import { parentChildren } from "@/data/parentChildren";

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

  return parentChildren.filter(
    (child) => child.parentId === parent.id
  );
};
