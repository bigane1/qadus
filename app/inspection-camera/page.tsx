import type { Metadata } from "next";
import PrestationPageView from "@/components/PrestationPageView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Inspection Caméra Canalisation Île-de-France — Qadus",
  description:
    "Inspection caméra endoscopique de canalisations en Île-de-France. Rapport vidéo HD. Devis gratuit — Qadus.",
};

export default function InspectionCameraPage() {
  return <PrestationPageView slug="inspection-camera" />;
}
