"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const banners = [
    {
        image: "/images/school-1.png",
        title: "Inspiring Excellence in Education",
        description:
            "Providing quality education and creating a better future for every student.",
    },
    {
        image: "/images/school-2.png",
        title: "Building a Brighter Future",
        description:
            "A modern learning environment where students can learn, grow and succeed.",
    },
    {
        image: "/images/school-3.png",
        title: "Learning Today, Leading Tomorrow",
        description:
            "Empowering students with knowledge, confidence and the skills they need for tomorrow.",
    },
];

export default function Hero() {
    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner(
                (current) => (current + 1) % banners.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-[460px] overflow-hidden">


            <div className="absolute inset-0">

                {banners.map((banner, index) => {

                    const position =
                        index === currentBanner
                            ? "translate-x-0"
                            : index < currentBanner
                                ? "-translate-x-full"
                                : "translate-x-full";

                    return (
                        <div
                            key={banner.image}
                            className={`absolute inset-0 transition-transform duration-[1300ms] ease-in-out ${position}`}
                        >
                            <Image
                                src={banner.image}
                                alt={banner.title}
                                fill
                                loading="eager"
                                priority={index === 0}
                                className="object-cover"
                            />
                        </div>
                    );
                })}

            </div>


            <div className="absolute inset-0 bg-[#01796f]/10" />

            <div className="relative z-10 mx-auto flex h-full max-w-[1000px] items-center px-6">

                <div className="max-w-3xl">

                    <span className="mb-8 inline-flex rounded-full border border-white/20 bg-[#01796f]/80 px-4 py-2 font-semibold text-white/90">
                        Welcome to Garrison Grammar School
                    </span>

                    <h2 className="text-3xl mt-6 font-bold leading-[1.08] text-white sm:text-4xl lg:text-5xl">
                        {banners[currentBanner].title}
                    </h2>

                    <p className="mt-6 mb-8 max-w-2xl text-base leading-7 text-white sm:text-lg">
                        {banners[currentBanner].description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">

                        <Link
                            href="/admissions"
                            className="group inline-flex items-center gap-2 rounded-3xl bg-white px-6 py-3.5 text-sm font-bold text-[#01796f] transition hover:bg-gray-100"
                        >
                            Apply for Admission
                            <ArrowRight size={18}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>



                    </div>

                </div>

            </div>

            <div className="absolute bottom-8 left-6 z-20 flex items-center gap-2">

                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentBanner(index)}
                        aria-label={`Show slide ${index + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-500 ${currentBanner === index
                            ? "w-10 bg-white"
                            : "w-2.5 bg-white/50 hover:bg-white/80"
                            }`}
                    />
                ))}

            </div>

        </section>
    );
}