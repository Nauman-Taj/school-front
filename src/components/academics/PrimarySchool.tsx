import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Lightbulb,
  Users,
  Target,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Strong Foundations",
    description:
      "Developing essential literacy, numeracy and communication skills through engaging classroom experiences.",
  },
  {
    icon: Lightbulb,
    title: "Curious Learners",
    description:
      "Encouraging children to ask questions, explore ideas and develop a genuine love for learning.",
  },
  {
    icon: Users,
    title: "Social Development",
    description:
      "Helping students build confidence, teamwork, communication and positive relationships.",
  },
  {
    icon: Target,
    title: "Personal Growth",
    description:
      "Supporting every child in becoming responsible, confident and independent.",
  },
];

export default function PrimarySchool() {
  return (
    <main>
      <section className="bg-[#f6f8f8] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Primary School
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Building strong foundations for a bright future.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Our primary school provides a supportive and engaging
              environment where children develop essential academic skills,
              confidence and a lifelong love of learning.
            </p>

            <Link
              href="/admissions"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-[#01796f] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#015f58]"
            >
              Explore Admissions
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="relative h-72 overflow-hidden rounded-3xl sm:h-96">
            <Image
              src="/images/school-1.png"
              alt="Primary students at Garrison Grammar School"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-2">
          <div className="relative h-80 overflow-hidden rounded-3xl sm:h-[420px]">
            <Image
              src="/images/school-2.png"
              alt="Learning environment at Garrison Grammar School"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Our Approach
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Learning that grows with every child
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              The primary years are an important stage in every child's
              development. We combine structured learning with opportunities
              for creativity, exploration and collaboration.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Our teachers create a positive classroom environment where
              students feel encouraged to participate, make progress and
              develop confidence in their abilities.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8f8] py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              What We Focus On
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Developing the whole child
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our primary program balances academic development with the
              personal and social growth children need to thrive.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="rounded-3xl bg-[#01796f] px-7 py-12 text-center sm:px-12 sm:py-14">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to begin your child's journey?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-teal-50">
              Discover how Garrison Grammar School can provide the right
              foundation for your child's future.
            </p>

            <Link
              href="/admissions"
              className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#01796f] transition-colors duration-300 hover:bg-gray-100"
            >
              Apply for Admission
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}