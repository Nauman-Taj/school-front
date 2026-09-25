import {
  LayoutDashboard,
  UserRound,
  Users,
  ClipboardCheck,
  BookOpen,
  FileText,
  Library,
  GraduationCap,
  CalendarDays,
  Megaphone,
  Wallet,
  School,
  CalendarCheck,
  Bell,
  Settings,
  Bus,
  ClipboardList,
} from "lucide-react";

import { UserRole } from "@/types/user";

export type NavigationItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export const navigationByRole: Record<UserRole, NavigationItem[]> = {
  Admin: [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Students",
      href: "/admin/students",
      icon: Users,
    },
    {
      label: "Teachers",
      href: "/admin/teachers",
      icon: GraduationCap,
    },
    {
      label: "Parents",
      href: "/admin/parents",
      icon: Users,
    },
    {
      label: "Classes",
      href: "/admin/classes",
      icon: GraduationCap,
    },
    {
      label: "Subjects",
      href: "/admin/subjects",
      icon: BookOpen,
    },
    {
      label: "Attendance",
      href: "/admin/attendance",
      icon: ClipboardCheck,
    },
    {
      label: "Exams",
      href: "/admin/exams",
      icon: FileText,
    },
    {
      label: "Results",
      href: "/admin/results",
      icon: GraduationCap,
    },
    {
      label: "Assignments",
      href: "/admin/assignments",
      icon: ClipboardList,
    },
    {
      label: "Fees",
      href: "/admin/fees",
      icon: Wallet,
    },
    {
      label: "Library",
      href: "/admin/library",
      icon: Library,
    },
    {
      label: "Transport",
      href: "/admin/transport",
      icon: Bus,
    },
    {
      label: "Calendar",
      href: "/admin/calendar",
      icon: CalendarDays,
    },
    {
      label: "Announcements",
      href: "/admin/announcements",
      icon: Megaphone,
    },
    {
      label: "Reports",
      href: "/admin/reports",
      icon: FileText,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ],

  Teacher: [
    {
      label: "Dashboard",
      href: "/teacher",
      icon: LayoutDashboard,
    },
    {
      label: "My Classes",
      href: "/teacher/classes",
      icon: GraduationCap,
    },
    {
      label: "Students",
      href: "/teacher/students",
      icon: Users,
    },
    {
      label: "Attendance",
      href: "/teacher/attendance",
      icon: ClipboardCheck,
    },
    {
      label: "Assignments",
      href: "/teacher/assignments",
      icon: ClipboardList,
    },
    {
      label: "Study Material",
      href: "/teacher/study-material",
      icon: BookOpen,
    },
    {
      label: "Exams",
      href: "/teacher/exams",
      icon: FileText,
    },
    {
      label: "Marks",
      href: "/teacher/marks",
      icon: GraduationCap,
    },
    {
      label: "Timetable",
      href: "/teacher/timetable",
      icon: CalendarDays,
    },
    {
      label: "Announcements",
      href: "/teacher/announcements",
      icon: Megaphone,
    },
    {
      label: "Profile",
      href: "/teacher/profile",
      icon: UserRound,
    },
  ],

  Student: [
    {
      label: "Dashboard",
      href: "/student",
      icon: LayoutDashboard,
    },
    {
      label: "Subjects",
      href: "/student/subjects",
      icon: BookOpen,
    },
    {
      label: "Attendance",
      href: "/student/attendance",
      icon: ClipboardCheck,
    },
    {
      label: "Assignments",
      href: "/student/studentassignments",
      icon: ClipboardList,
    },
    {
      label: "Study Material",
      href: "/student/study-material",
      icon: Library,
    },
    {
      label: "Exams",
      href: "/student/exams",
      icon: FileText,
    },
    {
      label: "Results",
      href: "/student/results",
      icon: GraduationCap,
    },
    {
      label: "Timetable",
      href: "/student/timetable",
      icon: CalendarDays,
    },
    {
      label: "Fees",
      href: "/student/fees",
      icon: Wallet,
    },
    {
      label: "Announcements",
      href: "/student/announcements",
      icon: Megaphone,
    },
    {
      label: "Profile",
      href: "/student/profile",
      icon: UserRound,
    },
  ],

  Parent: [
    {
      label: "Dashboard",
      href: "/parent",
      icon: LayoutDashboard,
    },
    {
      label: "Attendance",
      href: "/parent/attendance",
      icon: CalendarCheck,
    },
    {
      label: "Results",
      href: "/parent/results",
      icon: FileText,
    },
    {
      label: "Assignments",
      href: "/parent/assignments",
      icon: ClipboardList,
    },
    {
      label: "Fees",
      href: "/parent/fees",
      icon: Wallet,
    },
    {
      label: "Timetable",
      href: "/parent/timetable",
      icon: CalendarDays,
    },
    {
      label: "Exams",
      href: "/parent/exams",
      icon: GraduationCap,
    },
    {
      label: "Announcements",
      href: "/parent/announcements",
      icon: Megaphone,
    },
    {
      label: "Notifications",
      href: "/parent/notifications",
      icon: Bell,
    },
    {
      label: "Profile",
      href: "/parent/profile",
      icon: UserRound,
    },
  ],
};