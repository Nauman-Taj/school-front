import { UserRole } from "@/types/user";

export const rolePermissions: Record<string, UserRole[]> = {
  "/dashboard": ["Admin", "Teacher", "Student"],

  "/dashboard/profile": ["Admin", "Teacher", "Student"],

  "/dashboard/students": ["Admin", "Teacher"],
  "/dashboard/teachers": ["Admin"],
  "/dashboard/parents": ["Admin"],

  "/dashboard/attendance": ["Admin", "Teacher", "Student"],
  "/dashboard/classes": ["Admin", "Teacher", "Student"],
  "/dashboard/subjects": ["Admin", "Teacher", "Student"],
  "/dashboard/timetable": ["Admin", "Teacher", "Student"],
  "/dashboard/assignments": ["Admin", "Teacher", "Student"],
  "/dashboard/exams": ["Admin", "Teacher", "Student"],
  "/dashboard/results": ["Admin", "Teacher", "Student"],

  "/dashboard/marks": ["Teacher"],
  "/dashboard/study-material": ["Teacher", "Student"],

  "/dashboard/fees": ["Admin", "Student"],

  "/dashboard/library": ["Admin", "Teacher", "Student"],
  "/dashboard/transport": ["Admin", "Student"],
  "/dashboard/calendar": ["Admin", "Teacher", "Student"],
  "/dashboard/announcements": ["Admin", "Teacher", "Student"],
  "/dashboard/notifications": ["Admin", "Teacher", "Student"],
  "/dashboard/reports": ["Admin"],
  "/dashboard/settings": ["Admin"],
};

export const hasPermission = (
  role: UserRole,
  pathname: string
) => {
  const matchedRoute = Object.keys(rolePermissions)
    .sort((a, b) => b.length - a.length)
    .find(
      (route) =>
        pathname === route ||
        pathname.startsWith(`${route}/`)
    );

  if (!matchedRoute) {
    return false;
  }

  return rolePermissions[matchedRoute].includes(role);
};