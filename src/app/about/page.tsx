import TopBar from "@/components/home/TopBar";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f6f8f8]">

      <TopBar />

      <Navbar />

      <AboutHero />

      <MissionVision />

      <WhyChooseUs />

      <AboutCTA />

      <Footer />

    </main>
  );
}