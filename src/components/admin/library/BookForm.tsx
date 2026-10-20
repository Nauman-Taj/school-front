
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Book } from "@/types/library";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type BookFormProps = {
  mode?: "add" | "edit";
  book?: Book;
};

type BookFormData = {
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher: string;
  quantity: string;
  availableCopies: string;
};

const emptyForm: BookFormData = {
  title: "",
  author: "",
  isbn: "",
  category: "",
  publisher: "",
  quantity: "",
  availableCopies: "",
};

export default function BookForm({
  mode = "add",
  book,
}: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: book?.title ?? "",
    author: book?.author ?? "",
    isbn: book?.isbn ?? "",
    category: book?.category ?? "",
    publisher: book?.publisher ?? "",
    quantity: book?.quantity?.toString() ?? "",
    availableCopies: book?.availableCopies?.toString() ?? "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep the form synchronized if the book loads after the component mounts.
  useEffect(() => {
    if (!book) return;

    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      publisher: book.publisher,
      quantity: book.quantity.toString(),
      availableCopies: book.availableCopies.toString(),
    });
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const quantity = Number(formData.quantity);
    const availableCopies = Number(formData.availableCopies);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      setError("Total quantity must be a whole number greater than zero.");
      return;
    }

    if (
      !Number.isInteger(availableCopies) ||
      availableCopies < 0 ||
      availableCopies > quantity
    ) {
      setError(
        "Available copies must be a whole number between zero and total quantity."
      );
      return;
    }

    if (mode === "edit" && !book?.id) {
      setError("The book ID is missing. Please reopen the edit page.");
      return;
    }

    const token = getAuthToken();

    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      isbn: formData.isbn.trim(),
      category: formData.category,
      publisher: formData.publisher.trim(),
      quantity,
      availableCopies,
    };

    try {
      setIsSubmitting(true);

      if (mode === "edit") {
        await apiRequest(`/books/${book!.id}`, {
          method: "PATCH",
          token,
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/books", {
          method: "POST",
          token,
          body: JSON.stringify(payload),
        });
      }

      window.location.href = "/admin/library";
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Unable to ${mode === "edit" ? "update" : "add"} the book. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/admin/library"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
      >
        <ArrowLeft size={17} />
        Back to Library
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === "edit" ? "Edit Book" : "Add Book"}
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
      >
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Book Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label
              htmlFor="author"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              id="author"
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>

          {/* ISBN */}
          <div>
            <label
              htmlFor="isbn"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              ISBN
            </label>
            <input
              id="isbn"
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            >
              <option value="">Select category</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Urdu">Urdu</option>
              <option value="Social Studies">Social Studies</option>
              <option value="Islamiyat">Islamiyat</option>
              <option value="Physics">Physics</option>
            </select>
          </div>

          {/* Publisher */}
          <div>
            <label
              htmlFor="publisher"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Publisher
            </label>
            <input
              id="publisher"
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              placeholder="Enter publisher"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Total Quantity
            </label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              min="1"
              step="1"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>

          {/* Available Copies */}
          <div>
            <label
              htmlFor="availableCopies"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Available Copies
            </label>
            <input
              id="availableCopies"
              type="number"
              name="availableCopies"
              min="0"
              max={formData.quantity || undefined}
              step="1"
              value={formData.availableCopies}
              onChange={handleChange}
              placeholder="Enter available copies"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/admin/library"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? mode === "edit"
                ? "Updating..."
                : "Adding..."
              : mode === "edit"
                ? "Update Book"
                : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
}
