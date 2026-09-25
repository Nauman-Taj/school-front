import {
  Users,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  BookOpenCheck,
  FileCheck,
  Megaphone,
} from "lucide-react";

export const teacherStats = [
  {
    title: "My Classes",
    value: "4",
    change: "+1",
    description: "assigned classes",
    icon: Users,
  },
  {
    title: "Total Students",
    value: "128",
    change: "+8",
    description: "students in my classes",
    icon: Users,
  },
  {
    title: "Today's Classes",
    value: "3",
    change: "Today",
    description: "scheduled classes",
    icon: CalendarDays,
  },
  {
    title: "Today's Attendance",
    value: "94%",
    change: "+2%",
    description: "from yesterday",
    icon: ClipboardCheck,
  },
  {
    title: "Pending Assignments",
    value: "6",
    change: "3 due soon",
    description: "student submissions",
    icon: ClipboardList,
  },
  {
    title: "Upcoming Exams",
    value: "2",
    change: "This month",
    description: "scheduled exams",
    icon: BookOpenCheck,
  },
  {
    title: "Unchecked Assignments",
    value: "9",
    change: "Needs review",
    description: "submissions pending",
    icon: FileCheck,
  },
];

export const teacherQuickActions = [
  {
    title: "Take Attendance",
    description: "Mark today's attendance",
    href: "/teacher/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Add Assignment",
    description: "Create a new assignment",
    href: "/teacher/assignments",
    icon: ClipboardList,
  },
  {
    title: "Enter Marks",
    description: "Enter student marks",
    href: "/teacher/marks",
    icon: FileCheck,
  },
  {
    title: "View Students",
    description: "View your students",
    href: "/teacher/students",
    icon: Users,
  },
  {
    title: "Upload Notes",
    description: "Add study material",
    href: "/teacher/study-material",
    icon: BookOpenCheck,
  },
  {
    title: "Send Announcement",
    description: "Notify your students",
    href: "/teacher/announcements",
    icon: Megaphone,
  },
];

export const todayClasses = [
  {
    subject: "Mathematics",
    className: "Grade 5 - A",
    time: "08:00 AM",
    room: "Room 101",
  },
  {
    subject: "Mathematics",
    className: "Grade 6 - A",
    time: "10:00 AM",
    room: "Room 203",
  },
  {
    subject: "Mathematics",
    className: "Grade 7 - B",
    time: "12:00 PM",
    room: "Room 205",
  },
];

export const upcomingExams = [
  {
    subject: "Mathematics",
    className: "Grade 5 - A",
    date: "Sep 28, 2026",
  },
  {
    subject: "Mathematics",
    className: "Grade 6 - A",
    date: "Oct 02, 2026",
  },
];