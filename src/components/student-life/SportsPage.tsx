import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Dumbbell,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Competitive Spirit",
    description:
      "Students develop determination, discipline and confidence through healthy competition.",
  },
  {
    icon: Dumbbell,
    title: "Active Lifestyle",
    description:
      "Regular physical activity helps students build healthy habits and enjoy an active lifestyle.",
  },
  {
    icon: Users,
    title: "Teamwork",
    description:
      "Team sports teach communication, cooperation and respect for teammates and opponents.",
  },
  {
    icon: Target,
    title: "Personal Growth",
    description:
      "Students learn perseverance, responsibility and how to work towards meaningful goals.",
  },
];

export default function SportsAthleticsPage() {
  return (
    <main>
      <section className="bg-[#f6f8f8] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Sports & Athletics
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Building teamwork, confidence and a healthy competitive spirit.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Sports provide students with opportunities to stay active,
              challenge themselves and develop valuable skills both on and off
              the field.
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
              src="/images/school-6.png"
              alt="Sports and athletics at Garrison Grammar School"
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
              src="/images/school-7.png"
              alt="Students participating in sports"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Active Students
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Learning valuable lessons through sport
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              We believe physical activity plays an important role in a
              student's overall development. Sports encourage discipline,
              resilience and confidence.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Whether competing as part of a team or improving individual
              abilities, students learn to set goals and celebrate progress.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8f8] py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Benefits of Sport
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Growing stronger together
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Sport helps students develop habits and qualities that support
              them throughout school and beyond.
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
              Find your strength. Build your team.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-teal-50">
              Give your child opportunities to stay active, develop confidence
              and enjoy the spirit of teamwork.
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