import Image from "next/image";
import Link from "next/link";
import {
  Palette,
  Trophy,
  Users,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const activities = [
  {
    icon: Palette,
    title: "Creative Activities",
    description:
      "Students explore creativity through art, design, music and other expressive activities.",
  },
  {
    icon: Trophy,
    title: "Competitions",
    description:
      "Friendly competitions give students opportunities to challenge themselves and celebrate achievement.",
  },
  {
    icon: Users,
    title: "Team Activities",
    description:
      "Collaborative activities help students develop communication, teamwork and leadership skills.",
  },
  {
    icon: Lightbulb,
    title: "Learning Beyond Class",
    description:
      "Practical and engaging activities allow students to discover interests outside the traditional classroom.",
  },
];

export default function ActivitiesPage() {
  return (
    <main>
      
      <section className="bg-[#f6f8f8] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Student Life
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Discover, participate and grow beyond the classroom.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Our activities give students opportunities to explore their
              interests, develop new skills and build lasting friendships.
            </p>

            <Link
              href="/student-life"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-[#01796f] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#015f58]"
            >
              Explore Student Life
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="relative h-72 overflow-hidden rounded-3xl sm:h-96">
            <Image
              src="/images/school-3.png"
              alt="Student activities at Garrison Grammar School"
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
              alt="Students participating in school activities"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Beyond the Classroom
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Experiences that help students flourish
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              School life is about more than lessons and examinations. We
              encourage students to take part in activities that allow them to
              discover their strengths and interests.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Through participation, students develop confidence,
              responsibility and valuable social skills while enjoying their
              time at school.
            </p>
          </div>
        </div>
      </section>

      
      <section className="bg-[#f6f8f8] py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Get Involved
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Something for every student
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Students can discover new interests while developing skills that
              complement their academic education.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {activity.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {activity.description}
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
              Make every school day meaningful.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-teal-50">
              Discover a school environment where students can learn,
              participate and grow.
            </p>

            <Link
              href="/admissions"
              className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#01796f] transition-colors duration-300 hover:bg-gray-100"
            >
              Explore Admissions
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