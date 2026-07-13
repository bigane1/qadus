import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Contact from "@/components/Contact";
import { TEL_DISPLAY, telHref, whatsappHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Devis Gratuit Plomberie & Débouchage Île-de-France — Qadus",
  description:
    "Demandez votre devis gratuit pour débouchage, curage, chemisage ou assainissement en Île-de-France. Réponse sous 2h. Sans engagement — Qadus.",
  alternates: { canonical: "https://www.qadus.fr/devis" },
};

export default function DevisPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-green-500/20 text-green-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-green-500/30">
              Formulaire direct
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-4">Demandez votre devis gratuit</h1>
            <p className="text-blue-200 mb-8">
              Le formulaire est accessible immédiatement ci-dessous, sans descendre en bas de page.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={telHref} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all">
                📞 {TEL_DISPLAY}
              </a>
              <a
                href={whatsappHref("Bonjour Qadus, je souhaite un devis pour ")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </section>

        <Contact />

        <section className="py-14 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-3">Besoin d&apos;informations rapides ?</h2>
            <p className="text-slate-500 mb-6">Consultez nos prestations détaillées ou nos tarifs indicatifs.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/#services" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-4 py-2 rounded-lg">
                Nos prestations
              </Link>
              <Link href="/#tarifs" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-4 py-2 rounded-lg">
                Tarifs
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
