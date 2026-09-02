import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const news = [
  {
    date: "28 Sep 2026",
    title: "Parent-Teacher Meeting Announced",
    description:
      "Parents are invited to attend the upcoming parent-teacher meeting to discuss student progress and development.",
  },
  {
    date: "24 Sep 2026",
    title: "Admissions Open for New Session",
    description:
      "Applications are now open for students seeking admission to Garrison Grammar School.",
  },
  {
    date: "18 Sep 2026",
    title: "Annual Sports Activities",
    description:
      "Students will participate in a range of sports and extracurricular activities throughout the new session.",
  },
];

export default function NewsSection() {
  return (
    <section className="bg-[#f6f8f8] py-20">
      <div className="mx-auto max-w-[1200px] px-6">

        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              News & Announcements
            </span>

            <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Stay connected with what is happening at our school.
            </h2>
          </div>

          <Link
            href="/news"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#01796f] transition hover:text-[#015f58]"
          >
            View all news
            <ArrowRight size={17} />
          </Link>

        </div>


        <div className="grid gap-6 md:grid-cols-3">

          {news.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex items-center gap-2 text-sm font-medium text-[#01796f]">

                <CalendarDays size={17} />

                <span>{item.date}</span>

              </div>


              <h3 className="mt-5 text-xl font-bold leading-snug text-gray-900">
                {item.title}
              </h3>


              <p className="mt-3 text-sm leading-6 text-gray-500">
                {item.description}
              </p>


              <Link
                href="/news"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#01796f] transition hover:text-[#015f58]"
              >
                Read more
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}