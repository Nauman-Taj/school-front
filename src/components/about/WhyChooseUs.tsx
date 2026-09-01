import {
  BookOpen,
  HeartHandshake,
  Lightbulb,
  Users,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Quality Education",
    text: "A strong academic foundation supported by engaging and purposeful learning.",
  },
  {
    icon: Users,
    title: "Experienced Teachers",
    text: "Dedicated educators who guide students academically and personally.",
  },
  {
    icon: Lightbulb,
    title: "Creative Learning",
    text: "Students are encouraged to think independently, explore ideas and solve problems.",
  },
  {
    icon: HeartHandshake,
    title: "Strong Community",
    text: "A welcoming environment where students, teachers and families work together.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f6f8f8] py-20">
      <div className="mx-auto max-w-[1200px] px-6">

        <div className="mb-12">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Why Choose Us
          </span>

          <h2 className="mt-3 max-w-2xl text-3xl font-bold text-gray-900 sm:text-4xl">
            A school built around the success of every student.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}