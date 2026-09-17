import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  UserRound,
  Building2,
  Hash,
  Layers3,
  Pencil,
} from "lucide-react";

import { Book } from "@/types/library";

type BookProfileProps = {
  book: Book;
};

export default function BookProfile({
  book,
}: BookProfileProps) {
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Book Details
          </h1>

          {/* <p className="mt-1 text-sm text-gray-500">
            View library book information.
          </p> */}
        </div>

        <Link
          href={`/dashboard/library/${book.id}/edit`}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
        >
          <Pencil size={17} />
          Edit Book
        </Link>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        {/* Book Heading */}
        <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e6f4f2] text-[#01796F]">
            <BookOpen size={30} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {book.title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {book.author}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem
            icon={UserRound}
            label="Author"
            value={book.author}
          />

          <DetailItem
            icon={Hash}
            label="ISBN"
            value={book.isbn}
          />

          <DetailItem
            icon={Layers3}
            label="Category"
            value={book.category}
          />

          <DetailItem
            icon={Building2}
            label="Publisher"
            value={book.publisher}
          />

          <DetailItem
            icon={BookOpen}
            label="Total Copies"
            value={book.quantity.toString()}
          />

          <DetailItem
            icon={BookOpen}
            label="Available Copies"
            value={book.availableCopies.toString()}
          />
        </div>

        {/* Status */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <p className="text-sm font-medium text-gray-500">
            Status
          </p>

          <span
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${book.status === "Available"
              ? "bg-green-50 text-green-600"
              : book.status === "Borrowed"
                ? "bg-yellow-50 text-yellow-600"
                : "bg-red-50 text-red-600"
              }`}
          >
            {book.status}
          </span>
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-gray-400">
        <Icon size={16} />
        <p className="text-xs">{label}</p>
      </div>

      <p className="mt-1 text-sm font-medium text-gray-800">
        {value}
      </p>
    </div>
  );
}