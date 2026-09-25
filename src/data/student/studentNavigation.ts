import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  Library,
  FileText,
  GraduationCap,
  CalendarDays,
  Wallet,
  Megaphone,
  UserRound,
} from "lucide-react";

export const studentNavigation = [
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
    href: "/student/assignments",
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
];