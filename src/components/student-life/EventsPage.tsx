import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  Trophy,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const eventTypes = [
  {
    icon: CalendarDays,
    title: "School Celebrations",
    description:
      "Memorable occasions that bring students, staff and the wider school community together.",
  },
  {
    icon: Trophy,
    title: "Competitions",
    description:
      "Academic, creative and sporting events that encourage students to participate and achieve.",
  },
  {
    icon: Users,
    title: "Community Events",
    description:
      "Opportunities for students and families to connect and celebrate the school community.",
  },
  {
    icon: Sparkles,
    title: "Special Occasions",
    description:
      "Unique school experiences that create lasting memories throughout the academic year.",
  },
];

export default function EventsPage() {
  return (
    <main>
      <section className="bg-[#f6f8f8] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Events
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Moments that bring our school community together.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              From celebrations and competitions to community gatherings,
              school events create opportunities to connect, participate and
              make lasting memories.
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
              src="/images/school-9.png"
              alt="School event at Garrison Grammar School"
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
              src="/images/school-6.png"
              alt="Students enjoying a school event"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              School Community
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Learning and celebrating together
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Events are an important part of school life. They give students
              opportunities to showcase their talents, celebrate achievements
              and enjoy experiences together.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Our events also strengthen connections between students, staff
              and families, creating a welcoming and active school community.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8f8] py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              School Calendar
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Experiences worth remembering
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Throughout the year, students have many opportunities to
              participate, celebrate and connect.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {eventTypes.map((event) => {
              const Icon = event.icon;

              return (
                <div
                  key={event.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {event.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {event.description}
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
              Be part of the experience.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-teal-50">
              Discover a school community where every year brings new
              opportunities to learn, participate and celebrate.
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