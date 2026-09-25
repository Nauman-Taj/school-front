import {
  Users,
  GraduationCap,
  ClipboardCheck,
  Wallet,
} from "lucide-react";

import StatCard from "@/components/admin/StatCard";
import EnrollmentChart from "@/components/admin/EnrollmentChart";
import AttendanceChart from "@/components/admin/AttendanceChart";
import FeeChart from "@/components/admin/FeeChart";
import UpcomingEvents from "@/components/admin/UpcomingEvents";

import { students } from "@/data/students";
import { teachers } from "@/data/teachers";
import { attendance } from "@/data/attendance";
import { fees } from "@/data/fees";

const activeStudents = students.filter(
  (student) => student.status === "Active"
).length;

const studentAttendance = attendance.filter(
  (record) => record.role === "Student"
);

const presentOrLate = studentAttendance.filter(
  (record) =>
    record.status === "Present" ||
    record.status === "Late"
).length;

const attendanceRate =
  studentAttendance.length > 0
    ? Number(
        ((presentOrLate / studentAttendance.length) * 100).toFixed(1)
      )
    : 0;

const totalFeeAmount = fees.reduce(
  (total, fee) => total + fee.amount,
  0
);

const totalPaidAmount = fees.reduce(
  (total, fee) => total + fee.paidAmount,
  0
);

const feeCollectionRate =
  totalFeeAmount > 0
    ? Number(
        ((totalPaidAmount / totalFeeAmount) * 100).toFixed(1)
      )
    : 0;

const statsData = [
  {
    title: "Total Students",
    value: students.length.toString(),
    change: activeStudents.toString(),
    description: "active students",
    icon: Users,
  },
  {
    title: "Total Teachers",
    value: teachers.length.toString(),
    change: teachers.length.toString(),
    description: "teachers",
    icon: GraduationCap,
  },
  {
    title: "Attendance Rate",
    value: `${attendanceRate}%`,
    change: `${attendanceRate}%`,
    description: "current attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Fee Collection",
    value: `${feeCollectionRate}%`,
    change: `${feeCollectionRate}%`,
    description: "fees collected",
    icon: Wallet,
  },
];

export default function AdminDashboard() {
  return (
    <main className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Welcome back. Here's what's happening at school.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statsData.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <EnrollmentChart />
        <AttendanceChart />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <FeeChart />
        <UpcomingEvents />
      </div>
    </main>
  );
}