import { notFound } from "next/navigation";

import { transport } from "@/data/transport";
import TransportForm from "@/components/transport/TransportForm";

type EditTransportPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTransportPage({
  params,
}: EditTransportPageProps) {
  const { id } = await params;

  const vehicle = transport.find(
    (vehicle) => vehicle.id === Number(id)
  );

  if (!vehicle) {
    notFound();
  }

  return (
    <TransportForm
      mode="edit"
      vehicle={vehicle}
    />
  );
}