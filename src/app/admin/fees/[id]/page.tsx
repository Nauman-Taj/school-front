import FeeDetailsLoader from "@/components/admin/fees/FeeDetailsLoader";

type FeeDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FeeDetailsPage({
  params,
}: FeeDetailsPageProps) {
  const { id } = await params;

  return <FeeDetailsLoader id={id} />;
}