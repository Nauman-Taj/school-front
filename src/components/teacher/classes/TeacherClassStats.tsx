import {
  BookOpen,
  GraduationCap,
  Users,
  UserRoundCheck,
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
      description: "classes assigned",
      icon: GraduationCap,
    },
    {
      title: "My Students",
      value: totalStudents,
      description: "students enrolled",
      icon: Users,
    },
    {
      title: "My Subjects",
      value: totalSubjects,
      description: "subjects assigned",
      icon: BookOpen,
    },
    {
      title: "Class Teacher",
      value: classTeacherCount,
      description: "classes managed",
      icon: UserRoundCheck,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                <Icon size={21} strokeWidth={2} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="font-semibold text-[#01796f]">
                {stat.value}
              </span>

              <span className="text-gray-500">
                {stat.description}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}