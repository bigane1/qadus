import type { Metadata } from "next";
import PrestationPageView from "@/components/PrestationPageView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Débouchage Canalisation Île-de-France — Intervention 24h/24",
  description:
    "Débouchage et dégorgement de canalisations en Île-de-France. Évier, WC, douche, fosse septique. Intervention rapide 24h/24 7j/7. Devis gratuit — Qadus.",
};

export default function DebouchagePage() {
  return <PrestationPageView slug="debouchage" />;
}
