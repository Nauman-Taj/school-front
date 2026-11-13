"use client";

import {
  BookOpen,
  GraduationCap,
  UserRoundCheck,
  Users,
} from "lucide-react";

type TeacherClassStatsProps = {
  totalClasses: number;
  totalStudents: number;
  totalSubjects: number;
  classTeacherCount: number;
};

export default function TeacherClassStats({
  totalClasses,
  totalStudents,
  totalSubjects,
  classTeacherCount,
}: TeacherClassStatsProps) {
  const stats = [
    {
      title: "My Classes",
      value: totalClasses,
      icon: GraduationCap,
    },
    {
      title: "My Students",
      value: totalStudents,
      icon: Users,
    },
    {
      title: "My Subjects",
      value: totalSubjects,
      icon: BookOpen,
    },
    {
      title: "Class Teacher",
      value: classTeacherCount,
      icon: UserRoundCheck,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{stat.title}</p>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                <Icon size={20} />
              </div>
            </div>

            <p className="mt-2 text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
