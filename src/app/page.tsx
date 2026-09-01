import TopBar from "@/components/home/TopBar";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import AcademicPrograms from "@/components/home/AcademicPrograms";
import NewsSection from "@/components/home/NewsSection";
import Statistics from "@/components/home/Statistics";
import AdmissionsCTA from "@/components/home/AdmissionsCTA";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f8f8]">

      <TopBar />

      <Navbar />

      <Hero />

      <AboutSection />

      <AcademicPrograms />

      <NewsSection />
            
      <Statistics />

      <AdmissionsCTA />

      <Footer />

    </main>
  );
}
