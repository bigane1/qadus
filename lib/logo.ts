/** Icône ronde (symbole seul) — pas le logo horizontal avec texte. */
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

  // Wordmark ou upload large : évite le recadrage « QADU » dans le cercle.
  if (normalized.endsWith("/logo.png") || normalized.includes("/uploads/")) {
    return fallback;
  }

  return logo.trim();
}
