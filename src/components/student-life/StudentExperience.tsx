const experiences = [
  {
    number: "01",
    title: "Build Friendships",
    text: "Students develop lasting friendships through teamwork, activities and everyday school experiences.",
  },
  {
    number: "02",
    title: "Discover Talents",
    text: "Students are encouraged to explore different interests and discover what they enjoy.",
  },
  {
    number: "03",
    title: "Develop Leadership",
    text: "Opportunities to take responsibility help students become confident and responsible leaders.",
  },
];

export default function StudentExperience() {
  return (
    <section className="bg-[#f6f8f8] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              The Student Experience
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Helping students become confident individuals.
            </h2>

            <p className="mt-5 leading-7 text-gray-500">
              Every experience at school contributes to a student's personal
              development. We aim to create an environment where students feel
              supported, included and encouraged to participate.
            </p>
          </div>

          <div className="space-y-4">
            {experiences.map((experience) => (
              <div
                key={experience.number}
                className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-6"
              >
                <span className="text-2xl font-bold text-[#01796f]">
                  {experience.number}
                </span>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {experience.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {experience.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}