import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function isAuthorized(req: NextRequest) {
  return req.cookies.get("qadus_admin")?.value === "1";
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Non autorisé — reconnectez-vous." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Fichier manquant." }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase() || ".jpg";
    const base = path
      .basename(file.name, path.extname(file.name))
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .slice(0, 80);
    const filename = `${Date.now()}-${base}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    fs.mkdirSync(uploadDir, { recursive: true, mode: 0o775 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const dest = path.join(uploadDir, filename);
    fs.writeFileSync(dest, buffer, { mode: 0o664 });

    if (!fs.existsSync(dest)) {
      return NextResponse.json({ error: "Échec écriture fichier sur le serveur." }, { status: 500 });
    }

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
