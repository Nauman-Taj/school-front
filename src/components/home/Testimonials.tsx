import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha's Parent",
    role: "Parent",
    message:
      "The school provides a supportive learning environment where students are encouraged to learn, participate and grow with confidence.",
  },
  {
    name: "Muhammad Ali",
    role: "Student",
    message:
      "I enjoy the balance between classroom learning and activities. Teachers encourage us to ask questions and take part in different events.",
  },
  {
    name: "Hassan Ahmed",
    role: "Alumni",
    message:
      "My time at the school helped me develop strong academic foundations as well as confidence, discipline and communication skills.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f6f8f8] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Testimonials
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            What our school community says
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Experiences from parents, students and alumni who have been part
            of our school community.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                <Quote size={21} />
              </div>

              <p className="mt-5 text-sm leading-7 text-gray-600">
                “{testimonial.message}”
              </p>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <p className="font-bold text-gray-900">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-sm text-[#01796f]">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}