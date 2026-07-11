import Link from "next/link";
import { serviceImages } from "@/lib/images";

const services = [
  {
    title: "Débouchage & Dégorgement",
    desc: "WC, évier, douche, colonne. Résultat garanti ou remboursé. Intervention en moins de 2h.",
    tag: "Garanti",
    icon: "🚽",
    href: "/debouchage",
    accent: "bg-blue-100 text-blue-700 border-blue-200",
    iconBg: "bg-blue-50",
    image: serviceImages.debouchage.src,
    imageAlt: serviceImages.debouchage.alt,
  },
  {
    title: "Curage Haute Pression",
    desc: "Nettoyage complet du réseau par hydrocurage jusqu'à 350 bars. Camion hydrocureur disponible.",
    tag: "Préventif",
    icon: "💦",
    href: "/curage",
    accent: "bg-teal-100 text-teal-700 border-teal-200",
    iconBg: "bg-teal-50",
    image: serviceImages.curage.src,
    imageAlt: serviceImages.curage.alt,
  },
  {
    title: "Inspection Caméra",
    desc: "Caméra endoscopique HD + robot d'inspection. Rapport vidéo complet agréé assurances.",
    tag: "Diagnostic",
    icon: "📷",
    href: "/inspection-camera",
    accent: "bg-indigo-100 text-indigo-700 border-indigo-200",
    iconBg: "bg-indigo-50",
    image: serviceImages.inspectionCamera.src,
    imageAlt: serviceImages.inspectionCamera.alt,
  },
  {
    title: "Chemisage Sans Tranchée",
    desc: "Réhabilitation CIPP sans démolition. Économie jusqu'à 70% vs remplacement classique. Garanti 10 ans.",
    tag: "Sans tranchée",
    icon: "🔧",
    href: "/chemisage",
    accent: "bg-orange-100 text-orange-700 border-orange-200",
    iconBg: "bg-orange-50",
    image: serviceImages.chemisage.src,
    imageAlt: serviceImages.chemisage.alt,
  },
  {
    title: "Assainissement & Réseaux",
    desc: "Bacs à graisse, postes de relevage, réseaux EU/EV/EP. Particuliers, restaurants, collectivités.",
    tag: "Réseaux",
    icon: "♻️",
    href: "/assainissement",
    accent: "bg-emerald-100 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-50",
    image: serviceImages.assainissement.src,
    imageAlt: serviceImages.assainissement.alt,
  },
  {
    title: "Urgence 24h/24",
    desc: "Nuit, week-end, jours fériés. Appel gratuit, déplacement gratuit. Tarif annoncé avant intervention.",
    tag: "Toujours dispo",
    icon: "⚡",
    href: "/#contact",
    accent: "bg-red-100 text-red-700 border-red-200",
    iconBg: "bg-red-50",
    image: serviceImages.urgence.src,
    imageAlt: serviceImages.urgence.alt,
  },
  {
    title: "Fuite & Dégât des eaux",
    desc: "Détection et réparation de fuites, robinets, joints, tuyaux encastrés. Agréé assurances.",
    tag: "Urgence",
    icon: "💧",
    href: "/#contact",
    accent: "bg-sky-100 text-sky-700 border-sky-200",
    iconBg: "bg-sky-50",
    image: serviceImages.fuite.src,
    imageAlt: serviceImages.fuite.alt,
  },
  {
    title: "Salle de bain & Sanitaire",
    desc: "Installation et rénovation complète : douche, baignoire, WC, lavabo. Travail soigné et garanti.",
    tag: "Rénovation",
    icon: "🚿",
    href: "/#contact",
    accent: "bg-violet-100 text-violet-700 border-violet-200",
    iconBg: "bg-violet-50",
    image: serviceImages.salleDeBain.src,
    imageAlt: serviceImages.salleDeBain.alt,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Nos prestations
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Tous vos besoins,<br />une seule équipe
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Du dépannage d&apos;urgence au chemisage sans tranchée — interventions
            pour particuliers, syndics, collectivités et industries en Île-de-France.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group flex flex-col bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {/* Photo au premier plan — pas de fond, pas d'overlay */}
              <img
                src={s.image}
                alt={s.imageAlt}
                className="w-full h-36 object-cover rounded-xl mb-4"
                loading="lazy"
              />

              <div className="flex items-start justify-between gap-3 mb-3 px-1">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${s.iconBg}`}
                >
                  {s.icon}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full border ${s.accent}`}
                >
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

        <div className="mt-10 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
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
    </section>
  );
}
