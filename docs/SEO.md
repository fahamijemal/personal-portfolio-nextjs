# Personal brand and search setup

The public portfolio is `https://fahami.ifaatechnologies.tech/`. Its canonical URLs use this verified domain rather than a preview hostname or the previous Vercel address. The owner confirms **Fahami Jemal Harun** is the founder of **IFAA TECHNOLOGIES**.

## What this upgrade includes

- Unique page titles, descriptions, canonical links, and Open Graph/Twitter previews for the portfolio and public collections/details.
- Consistent Person, Organization, WebSite, and homepage ProfilePage structured data. The personal identity `https://fahami.ifaatechnologies.tech/#person` matches the company website's founder reference; the company identity is `https://www.ifaatechnologies.tech/#organization`. The relationship represents founder/affiliation rather than unconfirmed employment.
- A visible founder section linking the existing portfolio to IFAA TECHNOLOGIES, with useful content about practical technology for Ethiopia and Oromia.
- A server-rendered Afaan Oromoo overview at `/om`. Only the English homepage and its Oromo overview declare reciprocal `en`, `om`, and `x-default` language alternatives. Existing client-side translations and saved language preferences remain available.
- Noindex metadata for account/admin pages and preview deployments. Public account routes stay crawlable so search engines can read their noindex instructions. Private/API URLs are excluded from the sitemap.
- A sitemap with public portfolio URLs, published blog articles, and public projects. Modification dates come from real publication data where available; static pages do not invent revision dates. Public data queries use the anonymous key rather than an administrator's session.
- Locally bundled Geist fonts with their OFL license, preserving the portfolio typography without a Google Fonts request during builds.

Existing portfolio content, education details, projects, certificates, blog publishing, theme controls, contact handling, and administration remain in their established routes. The SEO additions do not invent degrees, experience, customers, awards, company size, office locations, or search rankings.

## Deploy and verify

Keep the personal Vercel project's existing Supabase settings. This repository uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`; its existing administrative storage integrations may also require the server-only `SUPABASE_SERVICE_ROLE_KEY`. Never copy the company's database credentials into the personal project or commit real values. `.env.example` documents names only.

After deployment, check `/`, `/om`, `/projects`, `/blog`, `/certificates`, `/sitemap.xml`, `/robots.txt`, and `/opengraph-image`. Confirm the canonical links use the personal domain, English/Oromo language links work in both directions, and private/account pages stay excluded from indexing. Inspect actual published article/project URLs as well as missing-page behavior. Local fixture checks do not prove production database access, email delivery, or authenticated admin operations.

For repeatable local checks, use Node.js 24 and run `pnpm run typecheck`, then the isolated fixture build and `pnpm run test:seo` commands in the README. The seven HTTP/data-boundary scenarios start their own read-only fixture and production app on loopback ports 3019/3018. A test-only guard rejects non-fixture server fetches. Optional `pnpm run test:seo:browser` runs two real-browser scenarios with externally supplied Playwright tooling, covering language roundtrips, saved preferences, desktop/mobile fit, and bundled font loading. Run the suites sequentially; no hosted database credentials or real form submissions are needed. Fixture build settings must not replace the Vercel project's real environment settings. The repository's original ESLint command remains unconfigured; do not report it as passing.

The existing Next.js loading boundaries can stream a missing article response with HTTP 200 before `notFound()` resolves. The regression checks verify noindex, the not-found view, and withheld unpublished content; they do not claim every missing URL returns an HTTP 404. Keep missing/draft URLs out of the sitemap and review their exclusion in Search Console.

## Google Search Console

1. Add or open the **Domain property** `ifaatechnologies.tech` in [Google Search Console](https://search.google.com/search-console). Verify the exact DNS TXT record Google supplies at the domain's DNS provider. A verified Domain property covers the company, personal, and entrance subdomains.
2. Submit both `https://www.ifaatechnologies.tech/sitemap.xml` and `https://fahami.ifaatechnologies.tech/sitemap.xml` in the Sitemaps report. Submit the independent entrance platform's sitemap separately after verifying its actual URL.
3. Inspect the personal homepage and `/om`, plus the company `/about` and `/om`. Review fetching, canonical selection, and indexing eligibility, then request indexing where appropriate.
4. Review Page indexing and Search performance as Google collects data. Filter queries for the founder's full name, IFAA TECHNOLOGIES, and relevant English/Afaan Oromoo topics. Deployment does not verify ownership, submit URLs, or guarantee indexing/rankings.

## Grow the brand with useful content

Keep the name **Fahami Jemal Harun**, founder role, and website consistent across owner-managed public profiles. Link original technical writing, real projects, and the company where relevant. Publish first-hand articles about software development, learning, and practical technology for Ethiopian and Oromo audiences.

Use terms such as “misooma sooftiweerii,” “misooma marsariitii,” “teeknooloojii,” “Itoophiyaa,” and “Oromiyaa” in useful visible content where the topic calls for them. Have a fluent speaker review Oromo copy as it evolves. Avoid keyword lists, duplicate location pages, fake offices, unverified metrics, and unsupported ranking claims. Google does not use the keywords meta tag as a ranking shortcut.
