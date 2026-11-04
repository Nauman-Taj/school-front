import TransportLoader from "@/components/admin/transport/TransportLoader";

type EditTransportPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTransportPage({
  params,
}: EditTransportPageProps) {
  const { id } = await params;

  return <TransportLoader id={id} mode="edit" />;
}
