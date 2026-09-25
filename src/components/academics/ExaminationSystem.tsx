import Image from "next/image";
import {
  ClipboardCheck,
  FileCheck2,
  BarChart3,
  MessageSquareText,
} from "lucide-react";

const assessmentPoints = [
  {
    icon: ClipboardCheck,
    title: "Regular Assessments",
    description:
      "Regular classroom assessments help teachers monitor understanding and identify areas where students need additional support.",
  },
  {
    icon: FileCheck2,
    title: "Term Examinations",
    description:
      "Term examinations provide a structured evaluation of students' academic progress across their subjects.",
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description:
      "Student performance is reviewed throughout the academic year to encourage consistent learning and progress.",
  },
  {
    icon: MessageSquareText,
    title: "Feedback & Improvement",
    description:
      "Assessment results help students understand their strengths and areas for improvement.",
  },
];

export default function ExaminationSystem() {
  return (
    <main>
      <section className="bg-[#f6f8f8] py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Examination System
            </span>

            <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Assessment that supports continuous progress
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-gray-600">
              Our assessment approach combines regular evaluation with
              structured examinations to help students and teachers understand
              academic progress throughout the year.
            </p>
          </div>

          <div className="relative h-72 overflow-hidden rounded-3xl sm:h-96">
            <Image
              src="/images/school-3.png"
              alt="Students during academic activities"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Our Approach
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              How student progress is evaluated
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Assessment is used not only to measure achievement but also to
              guide students toward continued improvement.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {assessmentPoints.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-[#f6f8f8] p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}