import {
  Award,
  Lightbulb,
  MessageCircle,
  Users,
} from "lucide-react";

const approaches = [
  {
    icon: Lightbulb,
    title: "Critical Thinking",
    text: "Students are encouraged to ask questions, explore ideas and develop solutions independently.",
  },
  {
    icon: MessageCircle,
    title: "Communication",
    text: "We help students express their ideas clearly and communicate with confidence.",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    text: "Students learn through teamwork, discussion and meaningful classroom activities.",
  },
  {
    icon: Award,
    title: "Personal Growth",
    text: "Academic progress is supported alongside confidence, responsibility and character development.",
  },
];

export default function LearningApproach() {
  return (
    <section className="bg-[#f6f8f8] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Our Approach
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            More than just classroom learning.
          </h2>

          <p className="mt-4 leading-7 text-gray-500">
            We create learning experiences that help students become capable,
            curious and confident individuals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {approaches.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
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