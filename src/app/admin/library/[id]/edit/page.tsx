
import BookFormLoader from "@/components/admin/library/BookFormLoader";

type EditBookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBookPage({
  params,
}: EditBookPageProps) {
  const { id } = await params;

  return <BookFormLoader id={id} />;
}
