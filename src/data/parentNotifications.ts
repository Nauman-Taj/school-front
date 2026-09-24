import { ParentNotification } from "@/types/parentNotification";

export const parentNotifications: ParentNotification[] = [
  // Ali Asif — Grade 8 - A
  {
    id: 1,
    childId: 1,
    childName: "Ali Asif",
    className: "Grade 8 - A",
    title: "Attendance Alert",
    message:
      "Ali Asif was marked absent from school today.",
    date: "2026-09-24",
    type: "Attendance",
    read: false,
  },
  {
    id: 2,
    childId: 1,
    childName: "Ali Asif",
    className: "Grade 8 - A",
    title: "Assignment Due Soon",
    message:
      "The English argumentative essay assignment is due on September 26.",
    date: "2026-09-23",
    type: "Assignment",
    read: false,
  },
  {
    id: 3,
    childId: 1,
    childName: "Ali Asif",
    className: "Grade 8 - A",
    title: "Mid Term Examination",
    message:
      "The Grade 8 mid term examination schedule has been published.",
    date: "2026-09-21",
    type: "Announcement",
    read: false,
  },
  {
    id: 4,
    childId: 1,
    childName: "Ali Asif",
    className: "Grade 8 - A",
    title: "Result Published",
    message:
      "A new Computer Science assessment result has been published.",
    date: "2026-09-19",
    type: "Result",
    read: true,
  },

  // Hassan Asif — Grade 6 - B
  {
    id: 5,
    childId: 2,
    childName: "Hassan Asif",
    className: "Grade 6 - B",
    title: "Fee Payment Reminder",
    message:
      "The monthly school fee is pending and should be submitted before the due date.",
    date: "2026-09-24",
    type: "Fee",
    read: true,
  },
  {
    id: 6,
    childId: 2,
    childName: "Hassan Asif",
    className: "Grade 6 - B",
    title: "Science Result Published",
    message:
      "The latest Science assessment result is now available to view.",
    date: "2026-09-22",
    type: "Result",
    read: true,
  },
  {
    id: 7,
    childId: 2,
    childName: "Hassan Asif",
    className: "Grade 6 - B",
    title: "School Sports Day",
    message:
      "Grade 6 students can register for the annual school sports day.",
    date: "2026-09-20",
    type: "Announcement",
    read: true,
  },
  {
    id: 8,
    childId: 2,
    childName: "Hassan Asif",
    className: "Grade 6 - B",
    title: "Attendance Alert",
    message:
      "Hassan Asif arrived late to school today.",
    date: "2026-09-19",
    type: "Attendance",
    read: true,
  },
  {
    id: 9,
    childId: 2,
    childName: "Hassan Asif",
    className: "Grade 6 - B",
    title: "Mathematics Assignment",
    message:
      "A new Mathematics assignment has been posted for Grade 6 - B.",
    date: "2026-09-18",
    type: "Assignment",
    read: false,
  },
];