import {
  Users,
  UserRound,
  GraduationCap,
  Wallet,
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import EnrollmentChart from "@/components/dashboard/EnrollmentChart";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import FeeChart from "@/components/dashboard/FeeChart";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";

const stats = [
  {
    title: "Total Students",
    value: "400",
    change: "+4%",
    description: "from last month",
    icon: Users,
  },
  {
    title: "Total Teachers",
    value: "55",
    change: "+6%",
    description: "from last month",
    icon: UserRound,
  },
  {
    title: "Attendance",
    value: "90%",
    change: "+2%",
    description: "from last month",
    icon: GraduationCap,
  },
  {
    title: "Fee Collection",
    value: "75%",
    change: "+5%",
    description: "from last month",
    icon: Wallet,
  },
];

export default function DashboardPage() {
  return (
    <main className="space-y-8">

      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Welcome back. Here's what's happening at school.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
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