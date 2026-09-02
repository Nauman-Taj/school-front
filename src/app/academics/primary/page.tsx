import TopBar from "@/components/home/TopBar";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import PrimarySchool from "@/components/academics/PrimarySchool";

export default function PrimaryPage() {
  return (
    <>
      <TopBar />
      <Navbar />

      <PrimarySchool />

      <Footer />
    </>
  );
}