import TopBar from "@/components/home/TopBar";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

import StudentLifeHero from "@/components/student-life/StudentLifeHero";
import Activities from "@/components/student-life/Activities";
import StudentExperience from "@/components/student-life/StudentExperience";
import StudentLifeCTA from "@/components/student-life/StudentLifeCTA";

export default function StudentLifePage() {
  return (
    <main className="min-h-screen bg-[#f6f8f8]">
      <TopBar />

      <Navbar />

      <StudentLifeHero />

      <Activities />

      <StudentExperience />

      <StudentLifeCTA />

      <Footer />
    </main>
  );
}