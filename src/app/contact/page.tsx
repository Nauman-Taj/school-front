import TopBar from "@/components/home/TopBar";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactCTA from "@/components/contact/ContactCTA";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f6f8f8]">
      <TopBar />

      <Navbar />

      <ContactHero />

      <section className="bg-[#f6f8f8] py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <ContactInfo />

          <ContactForm />
        </div>
      </section>

      <ContactCTA />

      <Footer />
    </main>
  );
}