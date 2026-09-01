import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const levels = [
  {
    title: "Primary School",
    years: "Early Years - Grade 5",
    description:
      "Building strong foundations in literacy, numeracy, creativity and social development.",
  },
  {
    title: "Middle School",
    years: "Grade 6 - Grade 8",
    description:
      "Encouraging curiosity, independent thinking and deeper understanding across subjects.",
  },
  {
    title: "Senior School",
    years: "Grade 9 - Grade 12",
    description:
      "Preparing students for higher education through focused academic and personal development.",
  },
];

export default function AcademicLevels() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Academic Levels
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Learning for every stage
          </h2>

          <p className="mt-4 leading-7 text-gray-500">
            Our programs are designed to meet students where they are and help
            them progress with confidence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {levels.map((level) => (
            <Link
              key={level.title}
              href="/academics"
              className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01796f]/20 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                <BookOpen size={23} />
              </div>

              <p className="mt-6 text-sm font-semibold text-[#01796f]">
                {level.years}
              </p>

              <h3 className="mt-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#01796f]">
                {level.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {level.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#01796f]">
                Learn more
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}