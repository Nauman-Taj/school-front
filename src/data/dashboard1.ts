// import {
//   Users,
//   GraduationCap,
//   ClipboardCheck,
//   Wallet,
// } from "lucide-react";

// import { students } from "@/data/students";
// import { teachers } from "@/data/teachers";
// import { classes } from "@/data/classes";
// import { attendance } from "@/data/attendance";
// import { fees } from "@/data/fees";
// import { calendarEvents } from "@/data/calendar";

// const studentAttendance = attendance.filter(
//   (record) => record.role === "Student"
// );

// const presentOrLate = studentAttendance.filter(
//   (record) =>
//     record.status === "Present" || record.status === "Late"
// ).length;

// const attendanceRate =
//   studentAttendance.length > 0
//     ? Number(
//         ((presentOrLate / studentAttendance.length) * 100).toFixed(1)
//       )
//     : 0;

// const totalFeeAmount = fees.reduce(
//   (total, fee) => total + fee.amount,
//   0
// );

// const totalPaidAmount = fees.reduce(
//   (total, fee) => total + fee.paidAmount,
//   0
// );

// export const feeCollectionRate =
//   totalFeeAmount > 0
//     ? Number(
//         ((totalPaidAmount / totalFeeAmount) * 100).toFixed(1)
//       )
//     : 0;

// export const statsData = [
//   {
//     title: "Total Students",
//     value: students.length.toString(),
//     change: "24",
//     description: "active students",
//     icon: Users,
//   },
//   {
//     title: "Total Teachers",
//     value: teachers.length.toString(),
//     change: "8",
//     description: "active teachers",
//     icon: GraduationCap,
//   },
//   {
//     title: "Attendance Rate",
//     value: `${attendanceRate}%`,
//     change: `${attendanceRate}%`,
//     description: "current attendance",
//     icon: ClipboardCheck,
//   },
//   {
//     title: "Fee Collection",
//     value: `${feeCollectionRate}%`,
//     change: `${feeCollectionRate}%`,
//     description: "fees collected",
//     icon: Wallet,
//   },
// ];

// export const totalClasses = classes.length;

// export const upcomingEvents = calendarEvents
//   .filter(
//     (event) =>
//       event.date >= new Date().toISOString().split("T")[0]
//   )
//   .sort((a, b) => a.date.localeCompare(b.date))
//   .slice(0, 5);

//   // Enrollment Chart

// export const enrollmentData = [
//   {
//     month: "Students",
//     students: students.length,
//   },
// ];

// // Attendance Chart

// export const attendanceChartData = [
//   ...new Set(
//     attendance
//       .filter((record) => record.role === "Student")
//       .map((record) => record.date)
//   ),
// ]
//   .sort()
//   .map((date) => {
//     const records = attendance.filter(
//       (record) =>
//         record.role === "Student" &&
//         record.date === date
//     );

//     const presentOrLate = records.filter(
//       (record) =>
//         record.status === "Present" ||
//         record.status === "Late"
//     ).length;

//     const attendancePercentage =
//       records.length > 0
//         ? Number(
//             ((presentOrLate / records.length) * 100).toFixed(1)
//           )
//         : 0;

//     return {
//       month: date,
//       attendance: attendancePercentage,
//     };
//   });

// // Fee Chart

// export const feeData = [
//   {
//     name: "Collected",
//     value: totalPaidAmount,
//   },
//   {
//     name: "Remaining",
//     value: totalFeeAmount - totalPaidAmount,
//   },
// ];