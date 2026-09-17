"use client";

import {
  BookOpen,
  BookCheck,
  BookX,
  LibraryBig,
  Plus,
} from "lucide-react";

import Link from "next/link";
import { books } from "@/data/library";
import BookTable from "./BookTable";

export default function LibraryPage() {
  const totalBooks = books.reduce(
    (total, book) => total + book.quantity,
    0
  );

  const availableBooks = books.reduce(
    (total, book) => total + book.availableCopies,
    0
  );

  const borrowedBooks = books.reduce(
    (total, book) => total + (book.quantity - book.availableCopies),
    0
  );

  const unavailableBooks = books.filter(
    (book) => book.status === "Unavailable"
  ).length;

  const stats = [
    {
      title: "Total Books",
      value: totalBooks,
      icon: LibraryBig,
      description: "Books in library",
    },
    {
      title: "Available",
      value: availableBooks,
      icon: BookCheck,
      description: "Books available",
    },
    {
      title: "Borrowed",
      value: borrowedBooks,
      icon: BookOpen,
      description: "Currently borrowed",
    },
    {
      title: "Unavailable",
      value: unavailableBooks,
      icon: BookX,
      description: "Currently unavailable",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Library
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track school library books.
          </p>
        </div>

        <Link
          href="/dashboard/library/add"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
        >
          <Plus size={17} />
          Add Book
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      <BookTable />
    </div>
  );
}