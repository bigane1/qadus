import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { ADDRESS_DISPLAY, TEL_DISPLAY, telHref } from "@/lib/contact";
import { heroImage, serviceImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Qui sommes-nous ? — Qadus, spécialiste assainissement en Île-de-France",
  description:
    "Découvrez Qadus : entreprise de débouchage, curage, chemisage et assainissement basée à Carrières-sous-Poissy. Intervention 24h/24 en Île-de-France.",
};

const values = [
  {
    icon: "🎯",
    title: "Proximité & réactivité",
    text: "Basés en Yvelines, nous intervenons rapidement à Poissy, Saint-Germain-en-Laye, Conflans et dans toute l'Île-de-France.",
  },
  {
    icon: "🔬",
    title: "Expertise technique",
    text: "Caméra endoscopique, hydrocureur, chemisage CIPP : nous maîtrisons les techniques modernes de réhabilitation sans tranchée.",
  },
  {
    icon: "💬",
    title: "Transparence",
    text: "Devis gratuit, tarif annoncé avant intervention, rapport d'intervention fourni aux particuliers, syndics et assurances.",
  },
  {
    icon: "⚡",
    title: "Disponibilité 7j/7",
    text: "Urgences de nuit, week-ends et jours fériés : une équipe joignable en permanence au 06 67 25 08 85.",
  },
];

const clients = [
  "Particuliers",
  "Copropriétés & syndics",
  "Agences immobilières",
  "Hôtels & restaurants",
  "Collectivités",
  "Professionnels du bâtiment",
];

export default function QuiSommesNousPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-orange-500/30">
              À propos de Qadus
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
              Qui sommes-nous ?
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Qadus est une entreprise spécialisée dans le débouchage, le curage, le chemisage et
              l&apos;assainissement en Île-de-France. Nous accompagnons particuliers et
              professionnels avec des solutions fiables, rapides et durables.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Notre mission</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Face à une canalisation bouchée, une fuite ou un réseau d&apos;assainissement
                  défaillant, chaque minute compte. Qadus a été créé pour apporter une réponse
                  professionnelle, claire et rapide aux habitants et professionnels d&apos;Île-de-France.
                </p>
                <p>
                  Notre équipe intervient sur tous types de réseaux : éviers, WC, colonnes,
                  collecteurs, bacs à graisse, postes de relevage. Nous privilégions toujours la
                  méthode la moins invasive — débouchage mécanique, curage haute pression,
                  inspection caméra ou chemisage sans tranchée.
                </p>
                <p>
                  <strong className="text-slate-900">Notre engagement :</strong> pas débouché, pas
                  facturé. Le devis et le déplacement sont gratuits.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-all"
                >
                  📞 {TEL_DISPLAY}
                </a>
                <Link
                  href="/devis"
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-3 rounded-xl transition-all"
                >
                  Devis gratuit →
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-3">Nos valeurs</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Des engagements concrets au service de votre tranquillité.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all"
                >
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={serviceImages.chemisage.src}
                alt={serviceImages.chemisage.alt}
                className="rounded-2xl h-48 w-full object-cover"
              />
              <img
                src={serviceImages.inspectionCamera.src}
                alt={serviceImages.inspectionCamera.alt}
                className="rounded-2xl h-48 w-full object-cover mt-8"
              />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Nos clients</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Nous intervenons auprès de particuliers en urgence comme pour des projets planifiés
                en copropriété ou en milieu professionnel.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {clients.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-2 text-slate-700 font-medium text-sm"
                  >
                    <span className="text-blue-600">✓</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">Où nous trouver ?</h2>
            <p className="text-blue-200 mb-2">📍 {ADDRESS_DISPLAY}</p>
            <p className="text-blue-200 mb-8">
              Zone d&apos;intervention : Yvelines (78), Hauts-de-Seine (92), Val-d&apos;Oise (95),
              Paris et toute l&apos;Île-de-France.
            </p>
            <Link
              href="/#zone"
              className="inline-block bg-white text-blue-900 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all"
            >
              Voir nos zones d&apos;intervention
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
