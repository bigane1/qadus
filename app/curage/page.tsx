import type { Metadata } from "next";
import PrestationPageView from "@/components/PrestationPageView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Curage & Hydrocurage Canalisations Île-de-France — Qadus",
  description:
    "Curage et hydrocurage haute pression de canalisations en Île-de-France. Camion hydrocureur, réseaux EU/EP. Devis gratuit — Qadus.",
};

export default function CuragePage() {
  return <PrestationPageView slug="curage" />;
}
