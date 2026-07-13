import { faqSchema } from "@/lib/schema";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UrgenceBand from "@/components/UrgenceBand";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Tarifs from "@/components/Tarifs";
import Process from "@/components/Process";
import Engagements from "@/components/Engagements";
import Clients from "@/components/Clients";
import Realisations from "@/components/Realisations";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Zone from "@/components/Zone";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      {/* FAQ JSON-LD rich snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />
      <main>
        <Hero />
        <UrgenceBand />
        <Stats />
        <Services />
        <Tarifs />
        <Process />
        <Engagements />
        <Clients />
        <Realisations />
        <Testimonials />
        <FAQ />
        <Zone />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
