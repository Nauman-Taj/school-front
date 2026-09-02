import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Lightbulb,
  Users,
  Target,
  Heart,
  ArrowRight,
} from "lucide-react";

const approaches = [
  {
    icon: BookOpen,
    title: "Strong Academic Foundations",
    description:
      "We build essential knowledge and skills through structured, engaging and purposeful learning.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity & Creativity",
    description:
      "Students are encouraged to ask questions, explore ideas and approach challenges creatively.",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description:
      "Working together helps students develop communication, teamwork and respect for others.",
  },
  {
    icon: Target,
    title: "Independent Thinking",
    description:
      "Students gradually develop the confidence to think critically, solve problems and take responsibility.",
  },
  {
    icon: Heart,
    title: "Character Development",
    description:
      "We value responsibility, kindness, confidence and positive character alongside academic achievement.",
  },
];

export default function LearningApproach() {
  return (
    <main>
      <section className="bg-[#f6f8f8] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Learning Approach
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Learning designed to help every student thrive.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              We create meaningful learning experiences that develop
              knowledge, confidence, curiosity and character at every stage of
              a student's education.
            </p>

            <Link
              href="/academics"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-[#01796f] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#015f58]"
            >
              Explore Academics
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="relative h-72 overflow-hidden rounded-3xl sm:h-96">
            <Image
              src="/images/school-4.png"
              alt="Learning at Garrison Grammar School"
              fill
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
              src="/images/school-5.png"
              alt="Students learning together"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Our Philosophy
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              More than just academic achievement
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              We believe effective education should develop the whole student.
              Academic knowledge provides the foundation, but confidence,
              communication, creativity and character are equally important.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Our learning environment encourages students to participate,
              explore their interests and gradually become responsible for
              their own progress.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8f8] py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              How We Learn
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              A balanced approach to education
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our approach combines academic learning with the skills students
              need to succeed in school and beyond.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {approaches.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                    <Icon size={23} />
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

      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="rounded-3xl bg-[#01796f] px-7 py-12 text-center sm:px-12 sm:py-14">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Discover our academic environment.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-teal-50">
              Explore our academic programs and discover how we support
              students at every stage.
            </p>

            <Link
              href="/academics"
              className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#01796f] transition-colors duration-300 hover:bg-gray-100"
            >
              View Academics
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