import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/hero";
import HowItWorks from "@/app/components/HowItWorks";
import Services from "@/app/components/Services";
import Specialists from "@/app/components/Specialists";
import CTA from "@/app/components/CTA";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F3]">

      <Navbar />

      <Hero />

      <HowItWorks />

      <Services />

      <Specialists />

      <CTA />
       
      <Footer />

    </main>
  );
}