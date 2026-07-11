import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { localBusinessSchema } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.qadus.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Qadus — Débouchage, Assainissement & Réhabilitation Île-de-France | 24h/24",
    template: "%s | Qadus — Débouchage & Assainissement IDF",
  },
  description:
    "Qadus — Spécialiste débouchage, assainissement et réhabilitation de canalisations en Île-de-France. Curage, hydrocurage, chemisage sans tranchée, inspection caméra, bacs à graisse, postes de relevage. Intervention 24h/24 7j/7. Devis gratuit.",
  keywords: [
    "débouchage canalisation Île-de-France",
    "plombier Poissy",
    "débouchage Poissy",
    "assainissement Île-de-France",
    "curage canalisation Paris",
    "chemisage canalisation sans tranchée",
    "inspection caméra canalisation",
    "inspection robotisée canalisation",
    "hydrocurage Yvelines",
    "bac à graisse Île-de-France",
    "poste de relevage réparation",
    "réhabilitation canalisation IDF",
    "dégorgement urgence 24h",
    "débouchage Conflans-Sainte-Honorine",
    "plombier Saint-Germain-en-Laye",
    "Qadus",
    "qadus.fr",
  ],
  authors: [{ name: "Qadus", url: SITE_URL }],
  creator: "Qadus",
  publisher: "Qadus",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Qadus",
    title:
      "Qadus — Plombier, Débouchage & Assainissement Poissy | 24h/24 7j/7",
    description:
      "Plombier, spécialiste débouchage et assainissement à Poissy. Curage, hydrocurage, caméra endoscopique. Intervention 24h/24. Devis gratuit.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Qadus — Plombier Débouchage Assainissement Poissy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qadus — Plombier, Débouchage & Assainissement Poissy",
    description:
      "Intervention 24h/24 à Poissy et Yvelines (78). Devis gratuit.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <meta name="theme-color" content="#0D1B2A" />
      </head>
      <body className="bg-white text-slate-700 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
