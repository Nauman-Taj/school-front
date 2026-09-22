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
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Students",
      href: "/dashboard/students",
      icon: Users,
    },
    {
      label: "Teachers",
      href: "/dashboard/teachers",
      icon: GraduationCap,
    },
    {
      label: "Parents",
      href: "/dashboard/parents",
      icon: Users,
    },
    {
      label: "Attendance",
      href: "/dashboard/attendance",
      icon: ClipboardCheck,
    },
    {
      label: "Classes",
      href: "/dashboard/classes",
      icon: GraduationCap,
    },
    {
      label: "Subjects",
      href: "/dashboard/subjects",
      icon: BookOpen,
    },
    {
      label: "Timetable",
      href: "/dashboard/timetable",
      icon: CalendarDays,
    },
    {
      label: "Assignments",
      href: "/dashboard/assignments",
      icon: ClipboardList,
    },
    {
      label: "Exams",
      href: "/dashboard/exams",
      icon: FileText,
    },
    {
      label: "Results",
      href: "/dashboard/results",
      icon: GraduationCap,
    },
    {
      label: "Fees",
      href: "/dashboard/fees",
      icon: Wallet,
    },
    {
      label: "Library",
      href: "/dashboard/library",
      icon: Library,
    },
    {
      label: "Transport",
      href: "/dashboard/transport",
      icon: Bus,
    },
    {
      label: "Calendar",
      href: "/dashboard/calendar",
      icon: CalendarDays,
    },
    {
      label: "Announcements",
      href: "/dashboard/announcements",
      icon: Megaphone,
    },
    {
      label: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
    },
    {
      label: "Reports",
      href: "/dashboard/reports",
      icon: FileText,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],

  Teacher: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Classes",
      href: "/dashboard/classes",
      icon: GraduationCap,
    },
    {
      label: "Students",
      href: "/dashboard/students",
      icon: Users,
    },
    {
      label: "Attendance",
      href: "/dashboard/attendance",
      icon: ClipboardCheck,
    },
    {
      label: "Assignments",
      href: "/dashboard/assignments",
      icon: ClipboardList,
    },
    {
      label: "Study Material",
      href: "/dashboard/study-material",
      icon: BookOpen,
    },
    {
      label: "Exams",
      href: "/dashboard/exams",
      icon: FileText,
    },
    {
      label: "Marks",
      href: "/dashboard/marks",
      icon: GraduationCap,
    },
    {
      label: "Timetable",
      href: "/dashboard/timetable",
      icon: CalendarDays,
    },
    {
      label: "Announcements",
      href: "/dashboard/announcements",
      icon: Megaphone,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
  ],

  Student: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Subjects",
      href: "/dashboard/subjects",
      icon: BookOpen,
    },
    {
      label: "Attendance",
      href: "/dashboard/attendance",
      icon: ClipboardCheck,
    },
    {
      label: "Assignments",
      href: "/dashboard/assignments",
      icon: ClipboardList,
    },
    {
      label: "Study Material",
      href: "/dashboard/study-material",
      icon: Library,
    },
    {
      label: "Exams",
      href: "/dashboard/exams",
      icon: FileText,
    },
    {
      label: "Results",
      href: "/dashboard/results",
      icon: GraduationCap,
    },
    {
      label: "Timetable",
      href: "/dashboard/timetable",
      icon: CalendarDays,
    },
    {
      label: "Fees",
      href: "/dashboard/fees",
      icon: Wallet,
    },
    {
      label: "Announcements",
      href: "/dashboard/announcements",
      icon: Megaphone,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
  ],

  Parent: [],
};