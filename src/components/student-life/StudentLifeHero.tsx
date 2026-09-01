import Image from "next/image";

export default function StudentLifeHero() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-2">
        <div className="text-white">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Student Life
          </span>

          <h1 className="mt-4 text-4xl text-black font-bold leading-tight sm:text-5xl">
            Learn, connect, explore and grow beyond the classroom.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-black sm:text-lg">
            School life is about more than academics. We give students
            opportunities to discover interests, build friendships and develop
            confidence through meaningful experiences.
          </p>
        </div>

        <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96">
          <Image
            src="/images/school-5.png"
            alt="Student life at Garrison Grammar School"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}