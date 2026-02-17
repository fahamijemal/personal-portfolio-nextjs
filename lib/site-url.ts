/**
 * Canonical site URL for sitemap, robots, and metadata.
 * On Vercel production: use NEXT_PUBLIC_SITE_URL or default production URL.
 * On preview/local: use VERCEL_URL or localhost fallback.
 */
const PRODUCTION_URL = "https://fahamijemal.vercel.app";

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // Production deployment: always use canonical URL
  if (process.env.VERCEL_ENV === "production") {
    return PRODUCTION_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local development fallback
  return "http://localhost:3000";
}
