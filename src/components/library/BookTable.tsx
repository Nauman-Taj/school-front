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

import { books } from "@/data/library";
import { Book } from "@/types/library";

export default function BookTable() {
  const [bookList, setBookList] = useState<Book[]>(books);
  const [search, setSearch] = useState("");

  const filteredBooks = bookList.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase()) ||
      book.isbn.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    setBookList((current) =>
      current.filter((book) => book.id !== id)
    );
  };

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

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Book
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Author
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  ISBN
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Copies
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredBooks.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex  shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                        <BookOpen size={17} />
                      </div>

                      <span className="font-medium text-sm text-gray-900">
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
            {/* Book Header */}
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

            {/* Details */}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-400">
                  Category
                </p>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {book.category}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Copies
                </p>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {book.availableCopies} / {book.quantity}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-xs text-gray-400">
                  ISBN
                </p>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {book.isbn}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end border-t border-gray-100 pt-3">
              <BookActions
                bookId={book.id}
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

function StatusBadge({
  status,
}: {
  status: Book["status"];
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        status === "Available"
          ? "bg-green-50 text-green-600"
          : status === "Borrowed"
            ? "bg-yellow-50 text-yellow-600"
            : "bg-red-50 text-red-600"
      }`}
    >
      {status}
    </span>
  );
}

function BookActions({
  bookId,
  onDelete,
}: {
  bookId: number;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        href={`/dashboard/library/${bookId}`}
        className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
      >
        <Eye size={17} />
      </Link>

      <Link
        href={`/dashboard/library/${bookId}/edit`}
        className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
      >
        <Pencil size={17} />
      </Link>

      <button
        onClick={() => onDelete(bookId)}
        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
}