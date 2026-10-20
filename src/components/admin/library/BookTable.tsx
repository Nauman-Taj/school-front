
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  BookOpen,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

export type LibraryBook = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher: string;
  quantity: number;
  availableCopies: number;
  status: "AVAILABLE" | "BORROWED" | "UNAVAILABLE";
};

type BookTableProps = {
  books: LibraryBook[];
  onBookDeleted: (id: number) => void;
};

export default function BookTable({
  books,
  onBookDeleted,
}: BookTableProps) {
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const filteredBooks = books.filter((book) => {
    const query = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query) ||
      book.isbn.toLowerCase().includes(query)
    );
  });

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmed) return;

    try {
      setError("");
      setDeletingId(id);

      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      await apiRequest(`/books/${id}`, {
        method: "DELETE",
        token,
      });

      onBookDeleted(id);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete the book.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search books"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                {[
                  "Book",
                  "Author",
                  "Category",
                  "ISBN",
                  "Copies",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className={`px-6 py-4 text-sm font-semibold text-gray-600 ${
                      heading === "Action" ? "text-center" : ""
                    }`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex shrink-0 items-center justify-center text-[#01796F]">
                        <BookOpen size={19} />
                      </div>

                      <span className="text-sm font-medium text-gray-900">
                        {book.title}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {book.author}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {book.category}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {book.isbn}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {book.availableCopies} / {book.quantity}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={book.status} />
                  </td>

                  <td className="px-6 py-4">
                    <BookActions
                      bookId={book.id}
                      deleting={deletingId === book.id}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="rounded-2xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                <BookOpen size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900">
                  {book.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {book.author}
                </p>
              </div>

              <StatusBadge status={book.status} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-400">Category</p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {book.category}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Copies</p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {book.availableCopies} / {book.quantity}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-xs text-gray-400">ISBN</p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {book.isbn}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-center border-t border-gray-100 pt-3">
              <BookActions
                bookId={book.id}
                deleting={deletingId === book.id}
                onDelete={handleDelete}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">
          No books found.
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: LibraryBook["status"] }) {
  const label =
    status === "AVAILABLE"
      ? "Available"
      : status === "BORROWED"
        ? "Borrowed"
        : "Unavailable";

  const styles =
    status === "AVAILABLE"
      ? "bg-green-50 text-green-600"
      : status === "BORROWED"
        ? "bg-yellow-50 text-yellow-600"
        : "bg-red-50 text-red-600";

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${styles}`}
    >
      {label}
    </span>
  );
}

function BookActions({
  bookId,
  deleting,
  onDelete,
}: {
  bookId: number;
  deleting: boolean;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        href={`/admin/library/${bookId}`}
        aria-label="View book"
        className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
      >
        <Eye size={17} />
      </Link>

      <Link
        href={`/admin/library/${bookId}/edit`}
        aria-label="Edit book"
        className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
      >
        <Pencil size={17} />
      </Link>

      <button
        type="button"
        disabled={deleting}
        onClick={() => onDelete(bookId)}
        aria-label="Delete book"
        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {deleting ? (
          <span className="text-xs">...</span>
        ) : (
          <Trash2 size={17} />
        )}
      </button>
    </div>
  );
}
