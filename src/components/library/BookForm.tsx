"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Book } from "@/types/library";

type BookFormProps = {
  mode?: "add" | "edit";
  book?: Book;
};

export default function BookForm({
  mode = "add",
  book,
}: BookFormProps) {
  const [formData, setFormData] = useState({
    title: book?.title ?? "",
    author: book?.author ?? "",
    isbn: book?.isbn ?? "",
    category: book?.category ?? "",
    publisher: book?.publisher ?? "",
    quantity: book?.quantity.toString() ?? "",
    availableCopies: book?.availableCopies.toString() ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  window.location.href = "/dashboard/library";
};

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/dashboard/library"
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

        {/* <p className="mt-1 text-sm text-gray-500">
          {mode === "edit"
            ? "Update the book information."
            : "Add a new book to the school library."}
        </p> */}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl max-w-5xl border border-gray-200 bg-white p-5 sm:p-6"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Book Title
            </label>

            <input
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
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Author
            </label>

            <input
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
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              ISBN
            </label>

            <input
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
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Category
            </label>

            <select
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
              <option value="Computer Science">
                Computer Science
              </option>
              <option value="Urdu">Urdu</option>
              <option value="Social Studies">
                Social Studies
              </option>
              <option value="Islamiyat">Islamiyat</option>
              <option value="Physics">Physics</option>
            </select>
          </div>

          {/* Publisher */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Publisher
            </label>

            <input
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
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Total Quantity
            </label>

            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>

          {/* Available */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Available Copies
            </label>

            <input
              type="number"
              name="availableCopies"
              min="0"
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
            href="/dashboard/library"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            {mode === "edit" ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
}