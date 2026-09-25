import Image from "next/image";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Globe,
  Laptop,
  Languages,
  Trophy,
  Palette,
  Mic2,
} from "lucide-react";

const subjects = [
  {
    icon: BookOpen,
    title: "English",
    description:
      "Reading, writing, communication, grammar and literature skills.",
  },
  {
    icon: Calculator,
    title: "Mathematics",
    description:
      "Numeracy, problem-solving, logical thinking and mathematical reasoning.",
  },
  {
    icon: FlaskConical,
    title: "Science",
    description:
      "Scientific concepts, observation, investigation and practical learning.",
  },
  {
    icon: Globe,
    title: "Social Studies",
    description:
      "History, geography, society, culture and awareness of the world around us.",
  },
  {
    icon: Laptop,
    title: "Computer Studies",
    description:
      "Digital literacy, computer fundamentals and technology-based learning.",
  },
  {
    icon: Languages,
    title: "Languages",
    description:
      "Language development that supports communication, comprehension and expression.",
  },
];

const activities = [
  {
    icon: Trophy,
    title: "Sports",
    description:
      "Physical activities and sports that encourage teamwork, discipline and healthy competition.",
    image: "/images/school-6.png",
  },
  {
    icon: Palette,
    title: "Arts & Creativity",
    description:
      "Creative activities that allow students to express ideas, explore interests and develop imagination.",
    image: "/images/school-7.png",
  },
  {
    icon: Mic2,
    title: "Speaking & Events",
    description:
      "Presentations, speeches, school events and other activities that build confidence and communication skills.",
    image: "/images/school-8.png",
  },
];

export default function SubjectsCurriculum() {
  return (
    <main>
      {/* Subjects */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Subjects
            </span>

            <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
              A balanced academic curriculum
            </h1>

            <p className="mt-5 leading-7 text-gray-600">
              Students develop knowledge and skills across key academic areas
              while building curiosity, critical thinking and confidence.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => {
              const Icon = subject.icon;

              return (
                <div
                  key={subject.title}
                  className="rounded-2xl border border-gray-200 bg-[#f6f8f8] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                    <Icon size={22} />
                  </div>

                  <h2 className="mt-5 text-lg font-bold text-gray-900">
                    {subject.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {subject.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="bg-[#f6f8f8] py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-2">
          <div className="relative h-80 overflow-hidden rounded-3xl sm:h-[420px]">
            <Image
              src="/images/school-2.png"
              alt="Students learning at Garrison Grammar School"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Curriculum
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Learning beyond textbooks
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Our curriculum combines academic knowledge with activities and
              learning experiences that help students understand concepts,
              develop practical skills and become confident learners.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Students are encouraged to participate, ask questions, work
              collaboratively and apply what they learn in meaningful
              situations.
            </p>
          </div>
        </div>
      </section>

      {/* Co-Curricular Activities */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Co-Curricular Activities
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Learning continues beyond the classroom
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Activities outside regular classroom learning help students
              develop teamwork, confidence, creativity and communication.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="relative h-52">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-gray-900">
                      {activity.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}