import { getSiteContent, type PrestationPage } from "@/lib/site-content";
import { defaultPrestations } from "@/lib/prestation-defaults";

const RELATED = [
  { href: "/curage", label: "Curage canalisations", icon: "🔄" },
  { href: "/inspection-camera", label: "Inspection caméra", icon: "📷" },
  { href: "/chemisage", label: "Chemisage sans tranchée", icon: "🔧" },
  { href: "/assainissement", label: "Assainissement", icon: "🌊" },
  { href: "/devis", label: "Devis gratuit", icon: "📋" },
];

export function getPrestationPage(slug: string): PrestationPage & {
  relatedServices: typeof RELATED;
} {
  const content = getSiteContent();
  const page =
    content.prestations.find((p) => p.slug === slug) ??
    defaultPrestations.find((p) => p.slug === slug);

  if (!page) {
    throw new Error(`Prestation inconnue: ${slug}`);
  }

  return { ...page, relatedServices: RELATED };
}
