import { Eye, Target } from "lucide-react";

const items = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To provide high-quality education that develops academic excellence, confidence, creativity and strong character in every student.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To nurture responsible, capable and compassionate individuals who are prepared to make a positive contribution to their community and the wider world.",
  },
];

export default function MissionVision() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-6">

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            What Guides Us
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Our mission and vision
          </h2>

          <p className="mt-4 text-gray-500">
            Everything we do is focused on helping our students become
            confident learners and responsible members of society.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-[#f6f8f8] p-8 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                  <Icon size={24} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-500">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}