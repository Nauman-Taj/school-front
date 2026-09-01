import {
  BookOpen,
  Dumbbell,
  Palette,
  Trophy,
} from "lucide-react";

const activities = [
  {
    icon: Trophy,
    title: "Sports & Athletics",
    text: "Students develop teamwork, discipline and confidence through sports and physical activities.",
  },
  {
    icon: Palette,
    title: "Arts & Creativity",
    text: "Creative activities give students opportunities to express themselves and explore their talents.",
  },
  {
    icon: BookOpen,
    title: "Clubs & Societies",
    text: "A variety of clubs encourage students to explore interests beyond their regular classroom subjects.",
  },
  {
    icon: Dumbbell,
    title: "Health & Wellness",
    text: "We encourage healthy habits, active lifestyles and a balanced approach to student wellbeing.",
  },
];

export default function Activities() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Activities
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Something for every student
          </h2>

          <p className="mt-4 leading-7 text-gray-500">
            Students can discover new interests and develop valuable skills
            through a wide range of activities.
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {activity.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {activity.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}