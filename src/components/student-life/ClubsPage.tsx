import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Palette,
  Users,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const clubs = [
  {
    icon: BookOpen,
    title: "Academic Clubs",
    description:
      "Students explore subjects beyond the classroom and develop deeper interests in learning.",
  },
  {
    icon: Palette,
    title: "Creative Clubs",
    description:
      "Opportunities to express ideas through art, creativity, music and other activities.",
  },
  {
    icon: Users,
    title: "Social Clubs",
    description:
      "Students connect with others, build friendships and learn the value of collaboration.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Ideas",
    description:
      "Students are encouraged to explore new ideas, solve problems and think creatively.",
  },
];

export default function ClubsSocietiesPage() {
  return (
    <main>
      <section className="bg-[#f6f8f8] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Clubs & Societies
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Discover interests, share ideas and find your community.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Clubs and societies give students a chance to explore their
              interests, develop new skills and connect with fellow students.
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
              src="/images/school-4.png"
              alt="School clubs and societies"
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
              alt="Students working together"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Student Community
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              A place to explore what you enjoy
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Every student has different interests and strengths. Clubs and
              societies provide an environment where students can discover
              those interests outside their regular lessons.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              By participating in shared activities, students develop
              communication, leadership and teamwork while becoming an active
              part of the school community.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8f8] py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Explore & Participate
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Find something that inspires you
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our clubs and societies encourage students to learn, create,
              collaborate and pursue their interests.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clubs.map((club) => {
              const Icon = club.icon;

              return (
                <div
                  key={club.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {club.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {club.description}
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
              Find your place at Garrison Grammar School.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-teal-50">
              Learn, connect and discover new interests as part of our school
              community.
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