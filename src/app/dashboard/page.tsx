import StatCard from "@/components/dashboard/StatCard";
import EnrollmentChart from "@/components/dashboard/EnrollmentChart";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import FeeChart from "@/components/dashboard/FeeChart";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import { statsData } from "@/data/dashboard";

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