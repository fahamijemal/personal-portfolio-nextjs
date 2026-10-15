/**
 * Canonical site URL for sitemap, robots, and metadata.
 * Public metadata always uses the primary personal domain. Preview deployment
 * hostnames and localhost must never become search or sharing URLs by default.
 */
export const PERSONAL_ORIGIN = "https://fahami.ifaatechnologies.tech";

export function getSiteUrl(): string {
  return PERSONAL_ORIGIN;
}
