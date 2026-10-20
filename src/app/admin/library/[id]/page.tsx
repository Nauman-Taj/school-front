
import BookProfileLoader from "@/components/admin/library/BookProfileLoader";

type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookPage({
  params,
}: BookPageProps) {
  const { id } = await params;

  return <BookProfileLoader id={id} />;
}
