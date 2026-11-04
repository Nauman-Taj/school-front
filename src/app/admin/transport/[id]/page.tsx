import TransportLoader from "@/components/admin/transport/TransportLoader";

type TransportPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TransportDetailsPage({
  params,
}: TransportPageProps) {
  const { id } = await params;

  return <TransportLoader id={id} mode="profile" />;
}
