import Image from "next/image";

export default function AcademicsHero() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-2">
        <div className="text-white">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Academics
          </span>

          <h1 className="mt-4 text-4xl text-black font-bold leading-tight sm:text-5xl">
            Education that builds knowledge, confidence and character.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-black sm:text-lg">
            Our academic program combines strong foundations with engaging
            learning experiences that prepare students for the challenges and
            opportunities ahead.
          </p>
        </div>

        <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96">
          <Image
            src="/images/school-5.png"
            alt="Academic learning at Garrison Grammar School"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}