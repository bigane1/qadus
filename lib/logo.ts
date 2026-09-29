/** Logo complet : symbole + texte « Qadus » (header / footer). */
export function getLogoFullUrl(logo?: string | null): string {
  const fallback = "/logo.png";
  if (!logo?.trim()) return fallback;

  const normalized = logo.trim().toLowerCase();

  if (
    normalized.includes("logo-round") ||
    normalized.includes("favicon") ||
    normalized.includes("icon-192") ||
    normalized.includes("apple-icon")
  ) {
    return fallback;
  }

  return logo.trim();
}

/** Icône ronde (symbole seul) — favicon et partage technique. */
export function getLogoMarkUrl(logo?: string | null): string {
  const fallback = "/logo-round.png";
  if (!logo?.trim()) return fallback;

  const normalized = logo.trim().toLowerCase();

  if (
    normalized.includes("logo-round") ||
    normalized.includes("favicon") ||
    normalized.includes("icon-192") ||
    normalized.includes("apple-icon")
  ) {
    return logo.trim();
  }

  if (normalized.endsWith("/logo.png") || normalized.includes("/uploads/")) {
    return fallback;
  }

  return logo.trim();
}
