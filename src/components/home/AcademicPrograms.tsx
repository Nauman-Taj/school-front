import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    image: "/images/school-1.png",
    title: "Primary School",
    description:
      "Building strong foundations through curiosity, creativity and engaging learning.",
  },
  {
    image: "/images/school-2.png",
    title: "Middle School",
    description:
      "Developing knowledge, confidence and independent thinking through active learning.",
  },
  {
    image: "/images/school-3.png",
    title: "Senior School",
    description:
      "Preparing students for higher education, professional life and future success.",
  },
];

export default function AcademicPrograms() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-6">

        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Academics
            </span>

            <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Learning designed for every stage of a student's journey.
            </h2>
          </div>

          <Link
            href="/academics"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#01796f] transition hover:text-[#015f58]"
          >
            Explore academics
            <ArrowRight size={17} />
          </Link>

        </div>


        <div className="grid gap-6 md:grid-cols-3">

          {programs.map((program) => (
            <Link
              key={program.title}
              href="/academics"
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="relative h-56 overflow-hidden">

                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-500"
                />

                <div className="absolute inset-0 bg-[#01796f]/10 transition group-hover:bg-[#01796f]/0" />

              </div>


              <div className="p-6">

                <h3 className="text-xl font-bold text-gray-900 transition group-hover:text-[#01796f]">
                  {program.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {program.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#01796f]">

                  Learn more

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </span>

              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}