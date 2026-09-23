import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  FileText,
  Wallet,
  CalendarDays,
  GraduationCap,
  Megaphone,
  Bell,
  UserRound,
} from "lucide-react";

export const parentNavigation = [
  {
    title: "Dashboard",
    href: "/parent/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Attendance",
    href: "/parent/attendance",
    icon: CalendarCheck,
  },
  {
    title: "Results",
    href: "/parent/results",
    icon: FileText,
  },
  {
    title: "Assignments",
    href: "/parent/assignments",
    icon: ClipboardList,
  },
  {
    title: "Fees",
    href: "/parent/fees",
    icon: Wallet,
  },
  {
    title: "Timetable",
    href: "/parent/timetable",
    icon: CalendarDays,
  },
  {
    title: "Exams",
    href: "/parent/exams",
    icon: GraduationCap,
  },
  {
    title: "Announcements",
    href: "/parent/announcements",
    icon: Megaphone,
  },
  {
    title: "Notifications",
    href: "/parent/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/parent/profile",
    icon: UserRound,
  },
];

