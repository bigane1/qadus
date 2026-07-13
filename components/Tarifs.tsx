import Link from "next/link";
import { serviceImages } from "@/lib/images";
import { TEL_DISPLAY, telHref } from "@/lib/contact";
import { getSiteContent } from "@/lib/site-content";

const fallbackTarifs = [
  {
    title: "Débouchage évier / lavabo",
    price: "À partir de 120 EUR",
    desc: "Débouchage mécanique ou hydrocurage léger pour cuisine et salle d'eau.",
    image: serviceImages.debouchage.src,
  },
  {
    title: "Débouchage WC",
    price: "À partir de 150 EUR",
    desc: "Intervention rapide avec diagnostic et test d'écoulement en fin d'opération.",
    image: serviceImages.debouchage.src,
  },
  {
    title: "Curage haute pression",
    price: "À partir de 290 EUR",
    desc: "Nettoyage complet des canalisations avec camion hydrocureur.",
    image: serviceImages.curage.src,
  },
  {
    title: "Inspection caméra",
    price: "À partir de 180 EUR",
    desc: "Passage caméra avec rapport et recommandations après visite.",
    image: serviceImages.inspectionCamera.src,
  },
  {
    title: "Chemisage sans tranchée",
    price: "Sur devis",
    desc: "Tarif selon diamètre, longueur et accès du réseau à réhabiliter.",
    image: serviceImages.chemisageAfter.src,
  },
  {
    title: "Assainissement / poste relevage",
    price: "Sur devis",
    desc: "Installation, entretien et dépannage pour particuliers et professionnels.",
    image: serviceImages.assainissement.src,
  },
];

export default function Tarifs() {
  const content = getSiteContent();
  const section = content.tarifsSection;
  const tarifs = content.tarifs.length
    ? content.tarifs.map((item) => ({
        ...item,
        image: item.image || serviceImages.debouchage.src,
      }))
    : fallbackTarifs;

  return (
    <section id="tarifs" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            {section.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            {section.title}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tarifs.map((item) => (
            <article
              key={item.title}
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" loading="lazy" />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Qadus</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-blue-700 font-black text-base mb-3">{item.price}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <p className="text-slate-700 mb-4">
            Besoin d&apos;un tarif précis pour votre situation ? Devis gratuit et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={telHref}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              Appeler {TEL_DISPLAY}
            </a>
            <Link href="/devis" className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl transition-all">
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
