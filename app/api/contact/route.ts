import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prenom, nom, tel, ville, service, message } = body;

    if (!prenom || !nom || !tel || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e40af; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 22px;">📨 Nouvelle demande de devis — Qadus</h1>
        </div>
        <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; width: 140px;">Prénom</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${prenom}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Nom</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${nom}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Téléphone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                <a href="tel:${tel}" style="color: #1e40af; font-weight: bold;">${tel}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Ville</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${ville || "Non renseignée"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Service</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${service || "Non précisé"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #475569; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #0f172a; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 16px; text-align: center;">
          Message envoyé depuis le formulaire qadus.fr
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Qadus - Formulaire" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || "contact@qadus.fr",
      replyTo: undefined,
      subject: `[Qadus] Demande de devis — ${prenom} ${nom} (${ville || "?"})`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
