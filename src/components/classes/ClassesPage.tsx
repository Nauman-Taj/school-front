import {
  UserRoundGroup,
  Users,
  UserRound,
  DoorOpen,
  Plus,
} from "lucide-react";

import ClassTable from "@/components/classes/ClassTable";
import Link from "next/link";
import { classes } from "@/data/classes";
import { students } from "@/data/students";

export default function ClassesPage() {
  const totalClasses = classes.length;

  const totalStudents = students.length;

  const totalTeachers = new Set(
    classes.map((schoolClass) => schoolClass.teacher)
  ).size;

  const totalRooms = new Set(
    classes.map((schoolClass) => schoolClass.room)
  ).size;

  const stats = [
    {
      title: "Total Classes",
      value: totalClasses,
      description: "Active school classes",
      icon: UserRoundGroup,
    },
    {
      title: "Total Students",
      value: totalStudents,
      description: "Students across classes",
      icon: Users,
    },
    {
      title: "Class Teachers",
      value: totalTeachers,
      description: "Assigned class teachers",
      icon: UserRound,
    },
    {
      title: "Classrooms",
      value: totalRooms,
      description: "Assigned classrooms",
      icon: DoorOpen,
    },
  ];

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Classes
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage school classes, sections, teachers, and classrooms.
          </p>
        </div>

        <Link
          href="/dashboard/classes/add"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
        >
          <Plus size={17} />
          Add Class
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
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

                <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Classes */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Class List
          </h2>

          {/* <p className="mt-1 text-sm text-gray-500">
            View and manage all school classes.
          </p> */}
        </div>

        <ClassTable />
      </div>

    </div>
  );
}