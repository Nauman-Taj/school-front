
"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  BookCheck,
  BookX,
  LibraryBig,
  Plus,
} from "lucide-react";
import Link from "next/link";

import BookTable, { type LibraryBook } from "./BookTable";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";


export default function LibraryPage() {
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadBooks() {
      try {
        setLoading(true);
        setError("");

        const token = getAuthToken();

        if (!token) {
          throw new Error("Your session has expired. Please log in again.");
        }

        const data = await apiRequest<LibraryBook[]>("/books", {
          method: "GET",
          token,
        });

        if (!cancelled) {
          setBooks(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading books.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      cancelled = true;
    };
  }, []);

  const totalBooks = books.reduce(
    (total, book) => total + book.quantity,
    0,
  );

  const availableBooks = books.reduce(
    (total, book) => total + book.availableCopies,
    0,
  );

  const borrowedBooks = books.reduce(
    (total, book) => total + (book.quantity - book.availableCopies),
    0,
  );

  const unavailableBooks = books.filter(
    (book) => book.status === "UNAVAILABLE",
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
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Library
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage and track school library books.
          </p>
        </div>

        <Link
          href="/admin/library/add"
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

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          Loading library books...
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      ) : (
        <BookTable
          books={books}
          onBookDeleted={(id) =>
            setBooks((current) => current.filter((book) => book.id !== id))
          }
        />
      )}
    </div>
  );
}
