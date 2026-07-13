import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { TEL_DISPLAY, telHref } from "@/lib/contact";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Qui sommes-nous ? — Qadus, spécialiste assainissement en Île-de-France",
  description:
    "Découvrez Qadus : entreprise de débouchage, curage, chemisage et assainissement basée à Carrières-sous-Poissy. Intervention 24h/24 en Île-de-France.",
};

export default function QuiSommesNousPage() {
  const { about } = getSiteContent();

  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-orange-500/30">
              {about.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">{about.title}</h1>
            <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">{about.intro}</p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">{about.missionTitle}</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                {about.missionParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <p>
                  <strong className="text-slate-900">{about.commitment}</strong>
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={telHref} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-all">
                  📞 {TEL_DISPLAY}
                </a>
                <Link href="/devis" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-3 rounded-xl transition-all">
                  Devis gratuit →
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={about.missionImage} alt="Équipe Qadus en intervention" className="w-full h-80 object-cover" />
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-3">{about.valuesTitle}</h2>
              <p className="text-slate-500 max-w-xl mx-auto">{about.valuesSubtitle}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {about.values.map((v) => (
                <div key={v.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all">
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
              <img src={about.sideImage1} alt="Intervention chemisage" className="rounded-2xl h-48 w-full object-cover" />
              <img src={about.sideImage2} alt="Inspection caméra" className="rounded-2xl h-48 w-full object-cover mt-8" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">{about.clientsTitle}</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {about.clients.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                    <span className="text-blue-600">✓</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">{about.locationTitle}</h2>
            <p className="text-blue-200 mb-2">📍 {about.locationText}</p>
            <p className="text-blue-200 mb-8">{about.zoneText}</p>
            <Link href="/#zone" className="inline-block bg-white text-blue-900 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all">
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
