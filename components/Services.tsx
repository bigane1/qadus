import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";
import { getContentImages } from "@/lib/content-images";
import ChemisageBeforeAfter from "@/components/ChemisageBeforeAfter";

const accentMap = [
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-teal-100 text-teal-700 border-teal-200",
  "bg-indigo-100 text-indigo-700 border-indigo-200",
  "bg-orange-100 text-orange-700 border-orange-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-red-100 text-red-700 border-red-200",
  "bg-sky-100 text-sky-700 border-sky-200",
  "bg-violet-100 text-violet-700 border-violet-200",
];

const iconBgMap = [
  "bg-blue-50",
  "bg-teal-50",
  "bg-indigo-50",
  "bg-orange-50",
  "bg-emerald-50",
  "bg-red-50",
  "bg-sky-50",
  "bg-violet-50",
];

export default function Services() {
  const content = getSiteContent();
  const images = getContentImages();
  const services = content.services;
  const section = content.servicesSection;

  return (
    <section id="services" className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            {section.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 whitespace-pre-line">
            {section.title}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <Link
              key={s.title + i}
              href={s.href}
              className="group flex flex-col bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {s.beforeAfter ? (
                <div className="grid grid-cols-2 gap-1 mb-4 rounded-xl overflow-hidden h-36">
                  <div className="relative">
                    <img src={images.chemisageBefore.src} alt={images.chemisageBefore.alt} className="w-full h-full object-cover" loading="lazy" />
                    <span className="absolute bottom-1 left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Avant</span>
                  </div>
                  <div className="relative">
                    <img src={images.chemisageAfter.src} alt={images.chemisageAfter.alt} className="w-full h-full object-cover" loading="lazy" />
                    <span className="absolute bottom-1 left-1 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Après</span>
                  </div>
                </div>
              ) : (
                <img src={s.image} alt={s.imageAlt} className="w-full h-36 object-cover rounded-xl mb-4" loading="lazy" />
              )}

              <div className="flex items-start justify-between gap-3 mb-3 px-1">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${iconBgMap[i % iconBgMap.length]}`}>
                  {s.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full border ${accentMap[i % accentMap.length]}`}>
                  {s.tag}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 mb-2 leading-snug px-1 group-hover:text-blue-700 transition-colors">
                {s.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1 px-1">
                {s.desc}
              </p>
              <div className="mt-4 flex items-center text-blue-700 text-xs font-bold px-1">
                <span>En savoir plus</span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-white border border-slate-200 rounded-3xl p-6 md:p-8">
          <ChemisageBeforeAfter compact className="mb-6" />
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="text-5xl flex-shrink-0">🔧</div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              Technologie sans tranchée
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              Chemisage CIPP — Réhabilitation sans démolition
            </h3>
            <p className="text-slate-300 text-sm">
              Canalisations fissurées ? Réhabilitez-les{" "}
              <strong className="text-white">sans travaux de terrassement</strong>.
              70% moins cher, 10x plus rapide. Garanti 10 ans.
            </p>
          </div>
          <Link
            href="/chemisage"
            className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg text-sm whitespace-nowrap"
          >
            Découvrir le chemisage →
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
