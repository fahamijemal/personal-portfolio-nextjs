export function formatCredentialDate(value: string) {
  const date = new Date(value);
  return Number.isFinite(date.getTime())
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(date)
    : "";
}
export function credentialIssuer(c: {
  issuer: string | null;
  title_en: string;
  credential_url: string;
}) {
  if (c.issuer) return c.issuer;
  if (c.credential_url.includes("coursera.org")) return "Coursera";
  return "Professional credential";
}
export function usableImageUrl(url?: string | null) {
  if (!url) return null;
  try {
    const parsed = new URL(url, "https://fahami.ifaatechnologies.tech");
    if (!["https:", "http:"].includes(parsed.protocol)) return null;
    if (
      parsed.hostname.endsWith("credly.com") &&
      parsed.pathname.startsWith("/badges/")
    )
      return null;
    return url;
  } catch {
    return null;
  }
}
