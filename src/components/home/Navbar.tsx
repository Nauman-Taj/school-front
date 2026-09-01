"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
    GraduationCap,
    ChevronDown,
    Search,
    Bell,
    Menu,
    X,
} from "lucide-react";

const navLinks = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "About Us",
        href: "/about",
    },
    {
        name: "Academics",
        href: "/academics",
        dropdown: true,
    },
    {
        name: "Admissions",
        href: "/admissions",
    },
    {
        name: "Student Life",
        href: "/student-life",
        dropdown: true,
    },
    //   {
    //     name: "Teachers",
    //     href: "/teachers",
    //   },
    //   {
    //     name: "Parent Hub",
    //     href: "/parent-hub",
    //   },
    {
        name: "Contact",
        href: "/contact",
    },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">

            <div className="mx-auto flex h-[82px] max-w-[1400px] justify-between px-6">

                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <Image
                        src="/images/school.jpg"
                        alt="School Logo"
                        width={70}
                        height={70}
                    />

                </Link>


                <nav className="hidden items-center gap-7 lg:flex">

                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-1 text-sm font-semibold transition ${link.name === "Home"
                                ? "text-[#01796f]"
                                : "text-gray-700 hover:text-[#01796f]"
                                }`}
                        >
                            {link.name}

                            {link.dropdown && (
                                <ChevronDown size={15} />
                            )}
                        </Link>
                    ))}

                </nav>

                <div className="hidden items-center gap-3 lg:flex">

                    <button
                        aria-label="Search"
                        className="rounded-xl p-2.5 text-gray-600 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                    >
                        <Search size={20} />
                    </button>


                    {/* <div className="relative">

                        <button
                            onClick={() =>
                                setNotificationsOpen(!notificationsOpen)
                            }
                            aria-label="Notifications"
                            className="relative rounded-xl p-2.5 text-gray-600 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                        >
                            <Bell
                                size={21}
                                strokeWidth={1.8}
                            />

                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#01796f]" />
                        </button>


                        {notificationsOpen && (
                            <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

                                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Notifications
                                        </h3>

                                        <p className="mt-0.5 text-xs text-gray-500">
                                            Latest school updates
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-[#e6f4f2] px-2.5 py-1 text-xs font-semibold text-[#01796f]">
                                        3 New
                                    </span>

                                </div>


                                <div className="border-b border-gray-100 px-5 py-4 transition hover:bg-gray-50">
                                    <p className="text-sm font-semibold text-gray-800">
                                        Parent meeting scheduled
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Parent-teacher meeting will be held this Friday.
                                    </p>

                                    <span className="mt-2 block text-[11px] text-gray-400">
                                        10 minutes ago
                                    </span>
                                </div>


                                <div className="border-b border-gray-100 px-5 py-4 transition hover:bg-gray-50">
                                    <p className="text-sm font-semibold text-gray-800">
                                        New admission applications
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        12 new admission applications require review.
                                    </p>

                                    <span className="mt-2 block text-[11px] text-gray-400">
                                        1 hour ago
                                    </span>
                                </div>


                                <div className="px-5 py-4 transition hover:bg-gray-50">
                                    <p className="text-sm font-semibold text-gray-800">
                                        Attendance updated
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Today's attendance records have been updated.
                                    </p>

                                    <span className="mt-2 block text-[11px] text-gray-400">
                                        2 hours ago
                                    </span>
                                </div>


                                <div className="border-t border-gray-100 p-3">
                                    <Link
                                        href="/notifications"
                                        className="block rounded-xl py-2.5 text-center text-sm font-semibold text-[#01796f] transition hover:bg-[#e6f4f2]"
                                    >
                                        View all notifications
                                    </Link>
                                </div>

                            </div>
                        )}

                    </div> */}


                    <Link
                        href="/login"
                        className="rounded-3xl bg-[#01796f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#015f58]"
                    >
                        Sign in
                    </Link>

                </div>


                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-xl p-2 text-gray-700 lg:hidden"
                    aria-label="Menu"
                >
                    {menuOpen ? (
                        <X size={25} />
                    ) : (
                        <Menu size={25} />
                    )}
                </button>

            </div >


            {
                menuOpen && (
                    <div className="border-t border-gray-200 bg-white px-6 py-5 lg:hidden">

                        <nav className="flex flex-col gap-1">

                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`rounded-xl px-4 py-3 text-sm font-semibold ${link.name === "Home"
                                        ? "bg-[#e6f4f2] text-[#01796f]"
                                        : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <Link
                                href="/login"
                                className="mt-3 rounded-xl bg-[#01796f] px-4 py-3 text-center text-sm font-semibold text-white"
                            >
                                Sign in
                            </Link>

                        </nav>

                    </div>
                )
            }

        </header >
    );
}