import { UserRole } from "@/types/user";

export const rolePermissions: Record<string, UserRole[]> = {
  // =========================
  // ADMIN
  // =========================

  "/admin": ["Admin"],
  "/admin/profile": ["Admin"],

  "/admin/students": ["Admin"],
  "/admin/teachers": ["Admin"],
  "/admin/parents": ["Admin"],
  "/admin/classes": ["Admin"],
  "/admin/subjects": ["Admin"],
  "/admin/attendance": ["Admin"],
  "/admin/exams": ["Admin"],
  "/admin/results": ["Admin"],
  "/admin/assignments": ["Admin"],
  "/admin/fees": ["Admin"],
  "/admin/library": ["Admin"],
  "/admin/transport": ["Admin"],
  "/admin/calendar": ["Admin"],
  "/admin/announcements": ["Admin"],
  "/admin/reports": ["Admin"],
  "/admin/settings": ["Admin"],

  // =========================
  // TEACHER
  // =========================

  "/teacher": ["Teacher"],
  "/teacher/classes": ["Teacher"],
  "/teacher/students": ["Teacher"],
  "/teacher/attendance": ["Teacher"],
  "/teacher/assignments": ["Teacher"],
  "/teacher/study-material": ["Teacher"],
  "/teacher/exams": ["Teacher"],
  "/teacher/marks": ["Teacher"],
  "/teacher/timetable": ["Teacher"],
  "/teacher/announcements": ["Teacher"],
  "/teacher/profile": ["Teacher"],

  // =========================
  // STUDENT
  // =========================

  "/student": ["Student"],
  "/student/subjects": ["Student"],
  "/student/attendance": ["Student"],
  "/student/assignments": ["Student"],
  "/student/study-material": ["Student"],
  "/student/exams": ["Student"],
  "/student/results": ["Student"],
  "/student/timetable": ["Student"],
  "/student/fees": ["Student"],
  "/student/announcements": ["Student"],
  "/student/profile": ["Student"],

  // =========================
  // PARENT
  // =========================

  "/parent": ["Parent"],
  "/parent/children": ["Parent"],
  "/parent/attendance": ["Parent"],
  "/parent/assignments": ["Parent"],
  "/parent/results": ["Parent"],
  "/parent/fees": ["Parent"],
  "/parent/timetable": ["Parent"],
  "/parent/exams": ["Parent"],
  "/parent/announcements": ["Parent"],
  "/parent/notifications": ["Parent"],
  "/parent/profile": ["Parent"],
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