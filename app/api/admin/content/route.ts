import { NextRequest, NextResponse } from "next/server";
import {
  getSiteContent,
  mergeSiteContent,
  saveSiteContent,
  type SiteContent,
} from "@/lib/site-content";
import { FALLBACK_BLOG_POSTS } from "@/lib/blog";

function isAuthorized(req: NextRequest) {
  return req.cookies.get("qadus_admin")?.value === "1";
}

function validateContent(content: SiteContent): string | null {
  if (!content.phone?.trim()) return "Le téléphone (brut) est obligatoire.";
  if (!content.phoneDisplay?.trim()) return "Le téléphone (affichage) est obligatoire.";
  if (!content.address?.trim()) return "L'adresse est obligatoire.";
  if (!content.prestations?.length) return "Les pages prestations sont manquantes.";
  if (!content.images?.hero) return "L'image hero est manquante.";
  return null;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const content = getSiteContent();

  if (req.nextUrl.searchParams.get("seedBlog") === "1") {
    const updated = { ...content, blog: FALLBACK_BLOG_POSTS };
    saveSiteContent(updated);
    return NextResponse.json(updated);
  }

  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Non autorisé — reconnectez-vous." }, { status: 401 });
  }

  try {
    const body = (await req.json()) as Partial<SiteContent>;
    const merged = mergeSiteContent({ ...getSiteContent(), ...body });
    const validationError = validateContent(merged);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    saveSiteContent(merged);
    return NextResponse.json({ success: true, content: merged });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur enregistrement";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
