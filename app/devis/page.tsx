import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Link from "next/link";
import { TEL_DISPLAY, telHref, whatsappHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Devis Gratuit Plomberie & Débouchage Île-de-France — Qadus",
  description:
    "Demandez votre devis gratuit pour débouchage, curage, chemisage ou assainissement en Île-de-France. Réponse sous 2h. Sans engagement — Qadus.",
  keywords: [
    "devis débouchage gratuit Île-de-France",
    "devis plombier gratuit",
    "devis assainissement sans engagement",
    "tarif débouchage canalisation",
  ],
  alternates: { canonical: "https://www.qadus.fr/devis" },
  openGraph: {
    title: "Devis Gratuit — Qadus Débouchage & Assainissement IDF",
    description:
      "Devis gratuit sans engagement pour tous vos travaux de plomberie et assainissement en Île-de-France. Réponse sous 2h.",
    url: "https://www.qadus.fr/devis",
  },
};

const services = [
  { href: "/debouchage", icon: "🚿", label: "Débouchage / Dégorgement", desc: "Évier, WC, douche, réseau bouché" },
  { href: "/curage", icon: "🔄", label: "Curage haute pression", desc: "Nettoyage complet du réseau" },
  { href: "/inspection-camera", icon: "📷", label: "Inspection caméra", desc: "Diagnostic vidéo HD du réseau" },
  { href: "/chemisage", icon: "🔧", label: "Chemisage sans tranchée", desc: "Réhabilitation sans démolition" },
  { href: "/assainissement", icon: "🌊", label: "Assainissement", desc: "Bac à graisse, poste de relevage" },
  { href: "/#contact", icon: "🔩", label: "Plomberie générale", desc: "Fuite, installation, chauffe-eau" },
];

export default function DevisPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-green-500/20 text-green-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-green-500/30">
              100% Gratuit — Sans engagement
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-4">
              Devis Gratuit en 2h
            </h1>
            <p className="text-xl text-blue-200 mb-10">
              Décrivez votre problème, nous vous recontactons rapidement avec un devis clair et sans surprise.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-300">
              <span>✅ Réponse sous 2h en journée</span>
              <span>✅ Technicien certifié</span>
              <span>✅ Prix fixe avant intervention</span>
              <span>✅ Île-de-France</span>
            </div>
          </div>
        </section>

        {/* Choix du service */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 text-center mb-3">
              Quel service vous intéresse ?
            </h2>
            <p className="text-slate-500 text-center mb-10">
              Cliquez sur un service pour plus d&apos;informations, ou contactez-nous directement.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="bg-white border-2 border-slate-200 hover:border-blue-400 rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 group"
                >
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                    {s.label}
                  </h3>
                  <p className="text-sm text-slate-500">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact direct */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 text-center mb-3">
              Contactez-nous maintenant
            </h2>
            <p className="text-slate-500 text-center mb-10">
              Par téléphone, WhatsApp ou formulaire — choisissez votre moyen préféré.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <a
                href={telHref}
                className="flex flex-col items-center gap-3 bg-orange-50 border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-100 rounded-2xl p-6 text-center transition-all group"
              >
                <span className="text-4xl">📞</span>
                <div>
                  <div className="font-black text-orange-600 text-lg">{TEL_DISPLAY}</div>
                  <div className="text-xs text-slate-500 mt-1">Disponible 24h/24</div>
                </div>
              </a>
              <a
                href={whatsappHref("Bonjour Qadus, je voudrais un devis pour ")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 bg-green-50 border-2 border-green-200 hover:border-green-400 hover:bg-green-100 rounded-2xl p-6 text-center transition-all"
              >
                <span className="text-4xl">💬</span>
                <div>
                  <div className="font-black text-green-600 text-lg">WhatsApp</div>
                  <div className="text-xs text-slate-500 mt-1">Photos & vidéos acceptées</div>
                </div>
              </a>
              <Link
                href="/#contact"
                className="flex flex-col items-center gap-3 bg-blue-50 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-100 rounded-2xl p-6 text-center transition-all"
              >
                <span className="text-4xl">📋</span>
                <div>
                  <div className="font-black text-blue-600 text-lg">Formulaire</div>
                  <div className="text-xs text-slate-500 mt-1">Réponse sous 2h</div>
                </div>
              </Link>
            </div>

            {/* Réassurance */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-center">Ce que comprend notre devis gratuit</h3>
              <ul className="space-y-3">
                {[
                  "Diagnostic téléphonique de votre problème",
                  "Estimation du coût et de la durée d'intervention",
                  "Présentation des solutions possibles",
                  "Prix ferme communiqué avant toute intervention",
                  "Aucune obligation d'achat",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
