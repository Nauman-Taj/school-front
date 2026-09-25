import TopBar from "@/components/home/TopBar";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

import SubjectsCurriculum from "@/components/academics/SubjectsCurriculum";

export default function SubjectsCurriculumPage() {
  return (
    <main className="min-h-screen bg-[#f6f8f8]">
      <TopBar />

      <Navbar />

      <SubjectsCurriculum />

      <Footer />
    </main>
  );
}