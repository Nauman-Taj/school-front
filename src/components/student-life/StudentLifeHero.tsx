import Image from "next/image";

export default function StudentLifeHero() {
  return (
    <section className="bg-[#f6f8f8] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">

        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Student Life
          </span>

          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Learn, connect, explore and grow beyond the classroom.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            School life is about more than academics. We give students
            opportunities to discover interests, build friendships and develop
            confidence through meaningful experiences.
          </p>
        </div>

        <div className="relative h-72 overflow-hidden rounded-3xl sm:h-96">
          <Image
            src="/images/school-9.png"
            alt="Student life at Garrison Grammar School"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/5" />
        </div>

      </div>
    </section>
  );
}