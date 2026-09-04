import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AdmissionsCTA() {
    return (
        <section className="relative overflow-hidden">

            <div className="absolute inset-0">
                <Image
                    src="/images/school-5.png"
                    alt="Garrison Grammar School"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="absolute inset-0 bg-[#01796f]/40" />

            <div className="relative mx-auto max-w-[1200px] px-6 py-20 sm:py-24">

                <div className="max-w-2xl">

                    <span className="inline-flex rounded-full bg-[#01796f] px-4 py-2 font-semibold text-sm text-white">
                        Admissions Open
                    </span>

                    <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                        Give your child a brighter future.
                    </h2>

                    <p className="mt-5 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
                        Begin your child's journey with Garrison Grammar
                        School and become part of a community committed to
                        learning, growth and excellence. Discover our programs, admission process and
                        opportunities for your child.
                    </p>


                    <div className="mt-8 flex flex-wrap gap-4">

                        <Link
                            href="/admissions"
                            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#01796f] shadow-lg transition hover:bg-gray-100"
                        >
                            Explore Admissions

                            <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full bg-[#01796f] px-6 py-3.5 text-sm font-semibold text-white transition  hover:bg-white hover:text-[#01796f]"
                        >
                            Contact Us
                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}

