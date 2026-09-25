import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  ClipboardList,
  BookOpen,
  FileText,
  PenLine,
  CalendarDays,
  Megaphone,
  UserRound,
} from "lucide-react";

export const teacherNavigation = [
  {
    label: "Dashboard",
    href: "/teacher",
    icon: LayoutDashboard,
  },
  {
    label: "My Classes",
    href: "/teacher/classes",
    icon: Users,
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
    icon: PenLine,
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
];