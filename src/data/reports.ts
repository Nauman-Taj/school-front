import { Report } from "@/types/report";

export const reports: Report[] = [
  {
    id: 1,
    name: "Student List",
    category: "Student",
    description: "View a complete list of students.",
  },
  {
    id: 2,
    name: "New Admissions",
    category: "Student",
    description: "View recently admitted students.",
  },
  {
    id: 3,
    name: "Withdrawals",
    category: "Student",
    description: "View students who have withdrawn.",
  },
  {
    id: 4,
    name: "Class-wise Students",
    category: "Student",
    description: "View students grouped by class.",
  },
  {
    id: 5,
    name: "Student Attendance",
    category: "Attendance",
    description: "View individual student attendance.",
  },
  {
    id: 6,
    name: "Class Attendance",
    category: "Attendance",
    description: "View attendance by class.",
  },
  {
    id: 7,
    name: "Teacher Attendance",
    category: "Attendance",
    description: "View teacher attendance records.",
  },
  {
    id: 8,
    name: "Monthly Attendance",
    category: "Attendance",
    description: "View monthly attendance summary.",
  },
  {
    id: 9,
    name: "Exam Results",
    category: "Academic",
    description: "View examination results.",
  },
  {
    id: 10,
    name: "Subject Performance",
    category: "Academic",
    description: "Analyze performance by subject.",
  },
  {
    id: 11,
    name: "Class Performance",
    category: "Academic",
    description: "Analyze overall class performance.",
  },
  {
    id: 12,
    name: "Top Students",
    category: "Academic",
    description: "View students with the highest results.",
  },
  {
    id: 13,
    name: "Failed Students",
    category: "Academic",
    description: "View students who failed subjects.",
  },
  {
    id: 14,
    name: "Total Collection",
    category: "Financial",
    description: "View total fee collection.",
  },
  {
    id: 15,
    name: "Pending Fees",
    category: "Financial",
    description: "View pending student fees.",
  },
  {
    id: 16,
    name: "Overdue Fees",
    category: "Financial",
    description: "View overdue fee payments.",
  },
  {
    id: 17,
    name: "Monthly Income",
    category: "Financial",
    description: "View monthly school income.",
  },
];