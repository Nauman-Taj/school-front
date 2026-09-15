import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  BookOpen,
  Hash,
  GraduationCap,
  UserRound,
} from "lucide-react";

import { Subject } from "@/types/subject";

type SubjectProfileProps = {
  subject: Subject;
};

export default function SubjectProfile({
  subject,
}: SubjectProfileProps) {
  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/subjects"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
      >
        <ArrowLeft size={17} />
        Back to Subjects
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f4f2] text-[#01796F]">
            <BookOpen size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {subject.name}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Subject ID: {subject.id}
            </p>
          </div>
        </div>

        <Link
          href={`/dashboard/subjects/${subject.id}/edit`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
        >
          <Pencil size={17} />
          Edit Subject
        </Link>
      </div>

      {/* Details */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Subject Details
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Subject Name */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <BookOpen size={17} />
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Subject Name
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {subject.name}
              </p>
            </div>
          </div>

          {/* Code */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <Hash size={17} />
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Subject Code
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {subject.code}
              </p>
            </div>
          </div>

          {/* Class */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <GraduationCap size={17} />
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Class
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {subject.className}
              </p>
            </div>
          </div>

          {/* Teacher */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
              <UserRound size={17} />
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Assigned Teacher
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {subject.teacher}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}