import TopBar from "@/components/home/TopBar";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

import ExaminationSystem from "@/components/academics/ExaminationSystem";

export default function ExaminationSystemPage() {
  return (
    <main className="min-h-screen bg-[#f6f8f8]">
      <TopBar />

      <Navbar />

      <ExaminationSystem />

      <Footer />
    </main>
  );
}