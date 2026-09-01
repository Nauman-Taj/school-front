import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StudentLifeCTA() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="rounded-3xl bg-[#01796f] px-7 py-12 text-center sm:px-12 sm:py-14">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Discover life at Garrison Grammar School.
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-teal-50">
                        Learn more about our school community, academic opportunities and
                        the experiences available to our students.
                    </p>

                    <Link
                        href="/contact"
                        className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#01796f] transition-colors duration-300 hover:bg-gray-100"
                    >
                        Get in Touch
                        <ArrowRight size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}