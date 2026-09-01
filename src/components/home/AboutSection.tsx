import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="bg-white py-20">

      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-2 lg:items-center">

        {/* Content */}
        <div>

          <span className="font-bold text-lg text-[#01796f]">
            About Our School
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Creating an environment where every student can thrive.
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            Garrison Grammar School is committed to providing a
            high-quality learning environment where students are
            encouraged to discover their potential, develop their
            skills and prepare for a successful future.
          </p>

          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-2 font-semibold text-[#01796f] transition-colors duration-300 hover:text-[#015f58]"
          >
            Learn more

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

        {/* Image */}
        <div className="group relative h-[360px] overflow-hidden rounded-3xl shadow-sm">

          <Image
            src="/images/school-4.png"
            alt="Students at Garrison Grammar School"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-[#01796f]/10 transition-colors duration-500 group-hover:bg-[#01796f]/5" />

        </div>

      </div>

    </section>
  );
}
