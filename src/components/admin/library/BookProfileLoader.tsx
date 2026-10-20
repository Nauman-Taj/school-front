
"use client";

import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import BookProfile from "./BookProfile";
import { type LibraryBook } from "./BookTable";

type BookProfileLoaderProps = {
  id: string;
};

export default function BookProfileLoader({
  id,
}: BookProfileLoaderProps) {
  const [book, setBook] = useState<LibraryBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadBook() {
      try {
        setLoading(true);
        setError("");

        const token = getAuthToken();

        if (!token) {
          throw new Error("Your session has expired. Please log in again.");
        }

        const data = await apiRequest<LibraryBook>(
          `/books/${encodeURIComponent(id)}`,
          {
            method: "GET",
            token,
          },
        );

        if (!cancelled) {
          setBook(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load this book.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadBook();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        Loading book details...
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
      >
        {error}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        Book not found.
      </div>
    );
  }

  return <BookProfile book={book} />;
}
