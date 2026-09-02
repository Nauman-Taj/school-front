"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
    ChevronDown,
    Search,
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
        items: [
            {
                name: "Primary School",
                href: "/academics/primary",
            },
            {
                name: "Middle School",
                href: "/academics/middle",
            },
            {
                name: "Senior School",
                href: "/academics/senior",
            },
            {
                name: "Learning Approach",
                href: "/academics/learning-approach",
            },
        ],
    },
    {
        name: "Admissions",
        href: "/admissions",
    },
    {
        name: "Student Life",
        href: "/student-life",
        dropdown: true,
        items: [
            {
                name: "Activities",
                href: "/student-life/activities",
            },
            {
                name: "Sports & Athletics",
                href: "/student-life/sports",
            },
            {
                name: "Clubs & Societies",
                href: "/student-life/clubs",
            },
            {
                name: "Events",
                href: "/student-life/events",
            },
        ],
    },
    {
        name: "Contact",
        href: "/contact",
    },
];

export default function Navbar() {
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">

            <div className="mx-auto flex h-[82px] max-w-[1400px] items-center justify-between px-6">

                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <Image
                        src="/images/school.jpg"
                        alt="School Logo"
                        width={70}
                        height={70}
                        className="object-contain"
                    />
                </Link>

                <nav className="hidden items-center gap-7 lg:flex">

                    {navLinks.map((link) => {

                        const active = isActive(link.href);

                        return (
                            <div
                                key={link.name}
                                className="relative"
                                onMouseEnter={() =>
                                    link.dropdown &&
                                    setOpenDropdown(link.name)
                                }
                                onMouseLeave={() =>
                                    link.dropdown &&
                                    setOpenDropdown(null)
                                }
                            >

                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-1 text-sm font-semibold transition ${active
                                            ? "text-[#01796f]"
                                            : "text-gray-700 hover:text-[#01796f]"
                                        }`}
                                >
                                    {link.name}

                                    {link.dropdown && (
                                        <ChevronDown
                                            size={15}
                                            className={`transition-transform ${openDropdown === link.name
                                                    ? "rotate-180"
                                                    : ""
                                                }`}
                                        />
                                    )}
                                </Link>

                                {link.dropdown &&
                                    openDropdown === link.name && (
                                        <div className="absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-4">

                                            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-lg">

                                                {link.items?.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={`block px-4 py-3 text-sm font-medium transition ${isActive(item.href)
                                                                ? "bg-[#e6f4f2] text-[#01796f]"
                                                                : "text-gray-700 hover:bg-[#f5faf9] hover:text-[#01796f]"
                                                            }`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}

                                            </div>

                                        </div>
                                    )}

                            </div>
                        );
                    })}

                </nav>

                <div className="hidden items-center gap-3 lg:flex">

                    <button
                        aria-label="Search"
                        className="rounded-xl p-2.5 text-gray-600 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                    >
                        <Search size={20} />
                    </button>

                    
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
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    {menuOpen ? (
                        <X size={25} />
                    ) : (
                        <Menu size={25} />
                    )}
                </button>

            </div>

            
            {menuOpen && (
                <div className="border-t border-gray-200 bg-white px-6 py-5 lg:hidden">

                    <nav className="flex flex-col gap-1">

                        {navLinks.map((link) => {

                            const active = isActive(link.href);
                            const dropdownOpen =
                                openDropdown === link.name;

                            return (
                                <div key={link.name}>

                                    <div className="flex items-center">

                                        
                                        <Link
                                            href={link.href}
                                            onClick={() => setMenuOpen(false)}
                                            className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${active
                                                    ? "bg-[#e6f4f2] text-[#01796f]"
                                                    : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            {link.name}
                                        </Link>

                                        
                                        {link.dropdown && (
                                            <button
                                                onClick={() =>
                                                    setOpenDropdown(
                                                        dropdownOpen
                                                            ? null
                                                            : link.name
                                                    )
                                                }
                                                aria-label={`Open ${link.name} submenu`}
                                                className="rounded-xl p-3 text-gray-600 transition hover:bg-gray-50 hover:text-[#01796f]"
                                            >
                                                <ChevronDown
                                                    size={17}
                                                    className={`transition-transform ${dropdownOpen
                                                            ? "rotate-180"
                                                            : ""
                                                        }`}
                                                />
                                            </button>
                                        )}

                                    </div>

                                    
                                    {link.dropdown && dropdownOpen && (
                                        <div className="ml-4 border-l border-gray-200 pl-3">

                                            {link.items?.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() =>
                                                        setMenuOpen(false)
                                                    }
                                                    className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition ${isActive(item.href)
                                                            ? "text-[#01796f]"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-[#01796f]"
                                                        }`}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}

                                        </div>
                                    )}

                                </div>
                            );
                        })}

                        
                        <Link
                            href="/login"
                            onClick={() => setMenuOpen(false)}
                            className="mt-3 rounded-xl bg-[#01796f] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#015f58]"
                        >
                            Sign in
                        </Link>

                    </nav>

                </div>
            )}

        </header>
    );
}

