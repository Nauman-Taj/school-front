import TopBar from "@/components/home/TopBar";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

import Resources from "@/components/resources/Resources";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#f6f8f8]">
      <TopBar />
      <Navbar />
      <Resources />
      <Footer />
    </main>
  );
}