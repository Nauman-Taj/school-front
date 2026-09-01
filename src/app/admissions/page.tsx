import TopBar from "@/components/home/TopBar";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

import AdmissionsHero from "@/components/admissions/AdmissionsHero";
import AdmissionProcess from "@/components/admissions/AdmissionProcess";
import AdmissionsInfo from "@/components/admissions/AdmissionsInfo";
import AdmissionsCTA from "@/components/admissions/AdmissionsCTA";

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen bg-[#f6f8f8]">
      <TopBar />

      <Navbar />

      <AdmissionsHero />

      <AdmissionProcess />

      <AdmissionsInfo />

      <AdmissionsCTA />

      <Footer />
    </main>
  );
}