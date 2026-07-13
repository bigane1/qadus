import { NextRequest, NextResponse } from "next/server";
import { getSiteContent, saveSiteContent, type SiteContent } from "@/lib/site-content";
import { FALLBACK_BLOG_POSTS } from "@/lib/blog";

function isAuthorized(req: NextRequest) {
  return req.cookies.get("qadus_admin")?.value === "1";
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
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await req.json()) as SiteContent;
  if (!body.phone || !body.phoneDisplay || !body.address || !body.prestations?.length) {
    return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
  }

  saveSiteContent(body);
  return NextResponse.json({ success: true });
}
