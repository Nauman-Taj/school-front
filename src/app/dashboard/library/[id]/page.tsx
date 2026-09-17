import { notFound } from "next/navigation";

import { books } from "@/data/library";
import BookProfile from "@/components/library/BookProfile";

type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookPage({
  params,
}: BookPageProps) {
  const { id } = await params;

  const book = books.find(
    (book) => book.id === Number(id)
  );

  if (!book) {
    notFound();
  }

  return <BookProfile book={book} />;
}