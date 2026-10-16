# Personal brand and search setup

The public portfolio is `https://fahami.ifaatechnologies.tech/`. Its canonical URLs use this verified domain rather than a preview hostname or the previous Vercel address. The owner confirms **Fahami Jemal Harun** is the founder of **IFAA TECHNOLOGIES**.

## What this upgrade includes

- Unique page titles, descriptions, canonical links, and Open Graph/Twitter previews for the portfolio and public collections/details.
- Consistent Person, Organization, WebSite, and homepage ProfilePage structured data. The personal identity `https://fahami.ifaatechnologies.tech/#person` matches the company website's founder reference; the company identity is `https://www.ifaatechnologies.tech/#organization`. The relationship represents founder/affiliation rather than unconfirmed employment.
- A visible founder section linking the existing portfolio to IFAA TECHNOLOGIES, with useful content about practical technology for Ethiopia and Oromia.
- The public site stays in English. The retired `/om` page permanently redirects (HTTP 308) to `/`; its navigation links, sitemap entry, and translation alternates have been removed. The portfolio also ignores old saved language preferences.
- Noindex metadata for account/admin pages and preview deployments. Public account routes stay crawlable so search engines can read their noindex instructions. Private/API URLs are excluded from the sitemap.
- A sitemap with public portfolio URLs, published blog articles, and public projects. Modification dates come from real publication data where available; static pages do not invent revision dates. Public data queries use the anonymous key rather than an administrator's session.
- Locally bundled Geist fonts with their OFL license, preserving the portfolio typography without a Google Fonts request during builds.

Existing portfolio content, education details, projects, certificates, blog publishing, theme controls, contact handling, and administration remain in their established routes. The SEO additions do not invent degrees, experience, customers, awards, company size, office locations, or search rankings.

## Deploy and verify

Keep the personal Vercel project's existing Supabase settings. This repository uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`; its existing administrative storage integrations may also require the server-only `SUPABASE_SERVICE_ROLE_KEY`. Never copy the company's database credentials into the personal project or commit real values. `.env.example` documents names only.

After deployment, check `/`, `/om`, `/projects`, `/blog`, `/certificates`, `/sitemap.xml`, `/robots.txt`, and `/opengraph-image`. Confirm the canonical links use the personal domain, `/om` permanently redirects to `/`, no translated-page links or language alternates remain, and private/account pages stay excluded from indexing. Inspect actual published article/project URLs as well as missing-page behavior. Local fixture checks do not prove production database access, email delivery, or authenticated admin operations.

For repeatable local checks, use Node.js 24 and run `pnpm run typecheck`, then the isolated fixture build and `pnpm run test:seo` commands in the README. The eight HTTP/data-boundary scenarios start their own read-only fixture and production app on loopback ports 3019/3018. A test-only guard rejects non-fixture server fetches. Optional `pnpm run test:seo:browser` runs two real-browser scenarios with externally supplied Playwright tooling, covering permanent redirects, English rendering despite old saved preferences, desktop/mobile fit, and bundled font loading. Run the suites sequentially; no hosted database credentials or real form submissions are needed. Fixture build settings must not replace the Vercel project's real environment settings. The repository's original ESLint command remains unconfigured; do not report it as passing.

The existing Next.js loading boundaries can stream a missing article response with HTTP 200 before `notFound()` resolves. The regression checks verify noindex, the not-found view, and withheld unpublished content; they do not claim every missing URL returns an HTTP 404. Keep missing/draft URLs out of the sitemap and review their exclusion in Search Console.

## Google Search Console

1. Open the already verified **Domain property** `ifaatechnologies.tech` in [Google Search Console](https://search.google.com/search-console). The owner confirmed DNS verification is complete. Keep the verification TXT record in DNS; no new token or verification step is needed. The property covers company, personal, and entrance subdomains.
2. Submit both `https://www.ifaatechnologies.tech/sitemap.xml` and `https://fahami.ifaatechnologies.tech/sitemap.xml` in the Sitemaps report. Submit the independent entrance platform's sitemap separately after verifying its actual URL.
3. After deploying both repositories, inspect the personal homepage, company homepage, `/about`, `/products`, and `/products/ifaa-entrance`. Confirm each retired `/om` URL redirects to its homepage. Request indexing for the English destination pages; do not submit `/om` as an indexable URL.
4. Review Page indexing and Search performance as Google collects data. Filter queries for the founder's full name, IFAA TECHNOLOGIES, and relevant English/Afaan Oromoo topics. Deployment does not verify ownership, submit URLs, or guarantee indexing/rankings.

## Grow the brand with useful content

Keep the name **Fahami Jemal Harun**, founder role, and website consistent across owner-managed public profiles. Link original technical writing, real projects, and the company where relevant. Publish first-hand articles about software development, learning, and practical technology for Ethiopian and Oromo audiences.

Use the supplied names **Ifaa Technologies**, **Ifaa Technology**, **Ifaa Tech**, **Ifaa Tech Ethiopia**, and **IFAA**, together with **Fahami Jemal Harun**, **Ethiopia**, and **Oromia** in relevant English content. The Oromo brand variants **Ifaa Teknoonoojii** and **Teknoolojii Ifaa** appear as brand names; **qormaata interaansii** appears in context for **IFAA ENTRANCE** and entrance exam preparation. These phrases do not imply translated pages. Keep the founder and company identities consistent across owner-managed profiles. Avoid hidden keywords, repetition, fake offices, or unsupported ranking claims. Google does not use the keywords meta tag for ranking; useful visible content, real links, and accurate structured data matter.
