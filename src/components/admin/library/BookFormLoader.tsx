
"use client";

import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Book, BookStatus } from "@/types/library";
import BookForm from "./BookForm";

type BackendBook = Omit<Book, "status"> & {
  status: "AVAILABLE" | "BORROWED" | "UNAVAILABLE";
};

type BookFormLoaderProps = {
  id: string;
};

function mapBookStatus(status: BackendBook["status"]): BookStatus {
  switch (status) {
    case "AVAILABLE":
      return "Available";
    case "BORROWED":
      return "Borrowed";
    case "UNAVAILABLE":
      return "Unavailable";
  }
}

export default function BookFormLoader({ id }: BookFormLoaderProps) {
  const [book, setBook] = useState<Book | null>(null);
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
          throw new Error(
            "Your session has expired. Please log in again."
          );
        }

        const data = await apiRequest<BackendBook>(
          `/books/${encodeURIComponent(id)}`,
          {
            method: "GET",
            token,
          }
        );

        const mappedBook: Book = {
          ...data,
          status: mapBookStatus(data.status),
        };

        if (!cancelled) {
          setBook(mappedBook);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load book details."
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

  return <BookForm mode="edit" book={book} />;
}
