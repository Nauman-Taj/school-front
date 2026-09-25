import Image from "next/image";

export default function SchoolHistory() {
  return (
    <section className="bg-[#f6f8f8] py-20">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-3xl sm:h-[420px]">
          <Image
            src="/images/school-5.png"
            alt="Garrison Grammar School"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Our History
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Building a strong foundation for education
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            Garrison Grammar School has been focused on providing quality
            education while creating a supportive environment where students
            can learn, grow and develop their character.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            Our educational approach brings together academic learning,
            character development and activities that help students become
            confident and responsible individuals.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            We continue to focus on meaningful learning experiences that
            prepare students for future academic, personal and professional
            challenges.
          </p>
        </div>
      </div>
    </section>
  );
}