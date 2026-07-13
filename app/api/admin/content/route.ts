import { NextRequest, NextResponse } from "next/server";
import { getSiteContent, saveSiteContent, type SiteContent } from "@/lib/site-content";

function isAuthorized(req: NextRequest) {
  return req.cookies.get("qadus_admin")?.value === "1";
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  return NextResponse.json(getSiteContent());
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await req.json()) as SiteContent;
  if (!body.phone || !body.phoneDisplay || !body.address) {
    return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
  }

  saveSiteContent(body);
  return NextResponse.json({ success: true });
}
