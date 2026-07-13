import type { Metadata } from "next";
import Link from "next/link";
import { ADDRESS_DISPLAY, TEL_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Qadus — Zakaria Boukhari, entrepreneur individuel, SIRET 990 840 019 00014.",
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Mentions légales</h1>

      <section className="space-y-8 text-slate-700">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Éditeur du site</h2>
          <ul className="space-y-1 text-sm">
            <li><strong>Nom commercial :</strong> QADUS</li>
            <li><strong>Nom :</strong> BOUKHARI Zakaria</li>
            <li><strong>Statut juridique :</strong> Entrepreneur individuel</li>
            <li><strong>SIREN :</strong> 990 840 019</li>
            <li><strong>SIRET (siège) :</strong> 990 840 019 00014</li>
            <li><strong>Code APE :</strong> 43.22A — Travaux d&apos;installation d&apos;eau et de gaz en tous locaux</li>
            <li><strong>Adresse :</strong> {ADDRESS_DISPLAY}</li>
            <li><strong>Téléphone :</strong> {TEL_DISPLAY}</li>
            <li><strong>Email :</strong> <a href="mailto:qadus.paris@gmail.com" className="text-blue-700 hover:underline">qadus.paris@gmail.com</a></li>
            <li><strong>Date de création :</strong> 02 septembre 2025</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Conception & développement</h2>
          <ul className="space-y-1 text-sm">
            <li><strong>Société :</strong> Abdellatif BIGANE — Entrepreneur individuel</li>
            <li><strong>SIRET :</strong> 912 464 625 00017</li>
            <li><strong>Site web :</strong> <a href="https://biganeway.fr" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">biganeway.fr</a></li>
            <li><strong>Téléphone :</strong> 06 32 98 46 29</li>
            <li><strong>Email :</strong> <a href="mailto:biganeway@gmail.com" className="text-blue-700 hover:underline">biganeway@gmail.com</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Hébergement</h2>
          <ul className="space-y-1 text-sm">
            <li><strong>Site web :</strong> https://www.qadus.fr</li>
            <li><strong>Hébergeur :</strong> VPS OVHcloud</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Propriété intellectuelle</h2>
          <p className="text-sm leading-relaxed">
            L&apos;ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive de QADUS — Zakaria Boukhari.
            Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Données personnelles</h2>
          <p className="text-sm leading-relaxed">
            Les informations collectées via le formulaire de contact sont utilisées uniquement
            pour répondre à vos demandes de devis. Elles ne sont ni cédées ni vendues à des tiers.
            Conformément au RGPD, vous pouvez exercer vos droits en écrivant à contact@qadus.fr.
          </p>
        </div>
      </section>

      <div className="mt-10">
        <Link href="/" className="text-blue-700 hover:text-blue-900 font-semibold text-sm">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
