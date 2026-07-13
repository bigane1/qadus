import type { Metadata } from "next";
import PrestationPageView from "@/components/PrestationPageView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Assainissement Île-de-France — Bacs à graisse, relevage — Qadus",
  description:
    "Assainissement, bacs à graisse, postes de relevage en Île-de-France. Particuliers et professionnels. Devis gratuit — Qadus.",
};

export default function AssainissementPage() {
  return <PrestationPageView slug="assainissement" />;
}
