import { notFound } from "next/navigation";

import { transport } from "@/data/transport";
import TransportProfile from "@/components/transport/TransportProfile";

type TransportPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TransportDetailsPage({
  params,
}: TransportPageProps) {
  const { id } = await params;

  const vehicle = transport.find(
    (vehicle) => vehicle.id === Number(id)
  );

  if (!vehicle) {
    notFound();
  }

  return <TransportProfile vehicle={vehicle} />;
}