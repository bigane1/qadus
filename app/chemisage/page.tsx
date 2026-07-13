import type { Metadata } from "next";
import PrestationPageView from "@/components/PrestationPageView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chemisage Canalisation Sans Tranchée Île-de-France — Qadus",
  description:
    "Réhabilitation de canalisations par chemisage sans tranchée en Île-de-France. Technique CIPP. Devis gratuit — Qadus.",
};

export default function ChemisagePage() {
  return <PrestationPageView slug="chemisage" />;
}
