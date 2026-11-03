
"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import Link from "next/link";

import BookTable, { type LibraryBook } from "./BookTable";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";


export default function LibraryPage() {
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState("");

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const data = await apiRequest<LibraryBook[]>("/books", {
        method: "GET",
        token,
      });
      setBooks(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading books.",
      );
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    void loadBooks();
  }, [loadBooks]);

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
    },
    {
      title: "Available",
      value: availableBooks,
    },
    {
      title: "Borrowed",
      value: borrowedBooks,
    },
    {
      title: "Unavailable",
      value: unavailableBooks,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          <Plus size={18} />
          Add Book
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="mt-2 text-2xl font-bold text-gray-800">
                {loading ? "0" : stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {loading && !hasLoaded && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">Loading library books...</p>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void loadBooks()}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 font-medium transition hover:bg-red-100"
          >
            <RefreshCw size={15} />
            Try again
          </button>
        </div>
      )}

      {hasLoaded && (
        <BookTable
          books={books}
          loading={loading}
          onRefresh={loadBooks}
          onBookDeleted={(id) =>
            setBooks((current) => current.filter((book) => book.id !== id))
          }
        />
      )}
    </div>
  );
}
