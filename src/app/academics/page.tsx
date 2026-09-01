import TopBar from "@/components/home/TopBar";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

import AcademicsHero from "@/components/academics/AcademicsHero";
import AcademicLevels from "@/components/academics/AcademicLevels";
import LearningApproach from "@/components/academics/LearningApproach";
import AcademicsCTA from "@/components/academics/AcademicsCTA";

export default function AcademicsPage() {
  return (
    <main className="min-h-screen bg-[#f6f8f8]">
      <TopBar />

      <Navbar />

      <AcademicsHero />

      <AcademicLevels />

      <LearningApproach />

      <AcademicsCTA />

      <Footer />
    </main>
  );
}