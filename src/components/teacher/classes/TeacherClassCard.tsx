import Link from "next/link";
import {
  Eye,
  Users,
} from "lucide-react";

import { TeacherClass } from "@/types/teacher/teacherClass";

type TeacherClassCardProps = {
  classes: TeacherClass[];
};

export default function TeacherClassCard({
  classes,
}: TeacherClassCardProps) {
  return (
    <div className="space-y- md:hidden">
      {classes.length > 0 ? (
        classes.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-semibold text-gray-900">
                  {item.className} - {item.section}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {item.subject}
                </p>
              </div>

              {item.classTeacher && (
                <span className="shrink-0 rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                  Class Teacher
                </span>
              )}
            </div>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-900">
                  Room:
                </span>{" "}
                {item.room}
              </p>

              <p>
                <span className="font-medium text-gray-900">
                  Schedule:
                </span>{" "}
                {item.schedule}
              </p>

              <div className="flex items-center gap-2">
                <Users
                  size={16}
                  strokeWidth={2}
                  className="text-[#01796f]"
                />

                <span>
                  {item.students} students
                </span>
              </div>
            </div>

            <Link
              href={`/teacher/classes/${item.id}`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-[#01796f] hover:bg-[#e6f4f2] hover:text-[#01796f]"
            >
              <Eye
                size={16}
                strokeWidth={2}
              />

              View Class
            </Link>
          </div>
        ))
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          No classes found.
        </div>
      )}
    </div>
  );
}