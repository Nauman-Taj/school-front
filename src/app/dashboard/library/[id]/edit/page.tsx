import { notFound } from "next/navigation";

import { books } from "@/data/library";
import BookForm from "@/components/library/BookForm";

type EditBookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBookPage({
  params,
}: EditBookPageProps) {
  const { id } = await params;

  const book = books.find(
    (book) => book.id === Number(id)
  );

  if (!book) {
    notFound();
  }

  return <BookForm mode="edit" book={book} />;
}