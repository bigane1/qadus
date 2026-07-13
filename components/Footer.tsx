import Link from "next/link";
import Image from "next/image";
import { FACEBOOK_URL, EMAIL, TEL_DISPLAY, mailtoHref, telHref } from "@/lib/contact";

const currentYear = new Date().getFullYear();

const services = [
  { href: "/debouchage", label: "Débouchage de canalisations" },
  { href: "/debouchage", label: "Dégorgement d'urgence" },
  { href: "/curage", label: "Curage des canalisations" },
  { href: "/assainissement", label: "Assainissement" },
  { href: "/curage", label: "Nettoyage haute pression" },
  { href: "/inspection-camera", label: "Inspection caméra" },
  { href: "/chemisage", label: "Chemisage sans tranchée" },
  { href: "/#contact", label: "Fuite d'eau / Plomberie" },
];

const zones = [
  "Poissy",
  "Conflans-Sainte-Honorine",
  "Saint-Germain-en-Laye",
  "Achères",
  "Les Mureaux",
  "Andrésy",
  "Meulan-en-Yvelines",
  "Verneuil-sur-Seine",
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/logo.png"
              alt="Qadus"
              width={140}
              height={48}
              style={{ width: "auto", height: "48px" }}
            />
          </Link>
          <p className="text-sm leading-relaxed mb-5">
            Plombier, spécialiste débouchage et assainissement à Poissy et dans
            les Yvelines (78). Disponible 24h/24 — 7j/7.
          </p>
          <div className="space-y-2">
            <a
              href={telHref}
              className="flex items-center gap-2 text-orange-400 hover:text-orange-300 font-bold transition-colors"
            >
              📞 {TEL_DISPLAY}
            </a>
            <a
              href={mailtoHref}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              ✉️ {EMAIL}
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              📘 Facebook QADUS
            </a>
            <span className="flex items-center gap-2 text-sm">
              📍 Carrières-sous-Poissy (78955)
            </span>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
            Nos services
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/qui-sommes-nous" className="text-sm hover:text-white transition-colors">
                Qui sommes-nous
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-sm hover:text-white transition-colors">
                Blog / Actus
              </Link>
            </li>
            {services.map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Zones */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
            Zones desservies
          </h4>
          <ul className="space-y-2">
            {zones.map((z) => (
              <li key={z}>
                <a
                  href="#zone"
                  className="text-sm hover:text-white transition-colors"
                >
                  {z}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Urgence */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
            Urgence 24h/24
          </h4>
          <div className="bg-orange-500/15 border border-orange-500/30 rounded-2xl p-5 text-center">
            <div className="text-3xl mb-3">🚨</div>
            <p className="text-sm text-slate-300 mb-4">
              Canalisation bouchée ? Fuite d&apos;eau ? Appelez maintenant :
            </p>
            <a
              href={telHref}
              className="block bg-orange-500 hover:bg-orange-600 text-white font-black py-3 px-4 rounded-xl transition-all hover:-translate-y-0.5 text-lg"
            >
              {TEL_DISPLAY}
            </a>
            <p className="text-xs text-slate-500 mt-2">
              Disponible 24h/24 — 7j/7
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-4 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <span>© {currentYear} Qadus — Tous droits réservés</span>
          <div className="flex gap-5">
            <a href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Politique de confidentialité
            </a>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">
              Plan du site
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
