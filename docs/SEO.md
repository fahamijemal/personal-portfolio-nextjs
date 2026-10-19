# Personal brand and search setup

The public portfolio is `https://fahami.ifaatechnologies.tech/`. Its canonical URLs use this verified domain rather than a preview hostname or the previous Vercel address. The owner confirms **Fahami Jemal Harun** is the founder of **IFAA TECHNOLOGIES**.

## What this upgrade includes

- Unique page titles, descriptions, canonical links, and Open Graph/Twitter previews for the portfolio and public collections/details.
- Consistent Person, Organization, WebSite, and homepage ProfilePage structured data. The personal identity `https://fahami.ifaatechnologies.tech/#person` matches the company website's founder reference; the company identity is `https://www.ifaatechnologies.tech/#organization`. The relationship represents founder/affiliation rather than unconfirmed employment.
- A single professional introduction combines full-stack development and the founder role, linking directly to IFAA TECHNOLOGIES. About focuses on education, experience, and interests without repeating the introduction. Legacy CMS role/subtitle fields are retained in storage; the public headline uses the unified professional presentation.
- The public site stays in English. The retired `/om` page permanently redirects (HTTP 308) to `/`; its navigation links, sitemap entry, and translation alternates have been removed. The portfolio also ignores old saved language preferences.
- Noindex metadata for account/admin pages and preview deployments. Public account routes stay crawlable so search engines can read their noindex instructions. Private/API URLs are excluded from the sitemap.
- A sitemap with public portfolio URLs, published blog articles, and public projects. Modification dates come from real publication data where available; static pages do not invent revision dates. Public data queries use the anonymous key rather than an administrator's session.
- Locally bundled Geist fonts with their OFL license, preserving the portfolio typography without a Google Fonts request during builds.

Existing portfolio content, education details, projects, certificates, blog publishing, theme controls, contact handling, and administration remain in their established routes. The SEO additions do not invent degrees, experience, customers, awards, company size, office locations, or search rankings.

## Deploy and verify

Keep the personal Vercel project's existing Supabase settings. This repository uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`; its existing administrative storage integrations may also require the server-only `SUPABASE_SERVICE_ROLE_KEY`. Never copy the company's database credentials into the personal project or commit real values. `.env.example` documents names only.

After deployment, check `/`, `/om`, `/projects`, `/blog`, `/certificates`, `/sitemap.xml`, `/robots.txt`, and `/opengraph-image`. Confirm the canonical links use the personal domain, `/om` permanently redirects to `/`, no translated-page links or language alternates remain, and private/account pages stay excluded from indexing. Inspect actual published article/project URLs as well as missing-page behavior. Local fixture checks do not prove production database access, email delivery, or authenticated admin operations.

For repeatable local checks, use Node.js 24 and run `pnpm run typecheck`, then the isolated fixture build and `pnpm run test:seo` commands in the README. The ten HTTP/data-boundary scenarios start their own read-only fixture and production app on loopback ports 3019/3018. A test-only guard rejects non-fixture server fetches. Optional `pnpm run test:seo:browser` runs five real-browser scenarios with externally supplied Playwright tooling, covering permanent redirects, English rendering despite old saved preferences, desktop/mobile fit, and bundled font loading. Run the suites sequentially; no hosted database credentials or real form submissions are needed. Fixture build settings must not replace the Vercel project's real environment settings. The repository's original ESLint command remains unconfigured; do not report it as passing.

The existing Next.js loading boundaries can stream a missing article response with HTTP 200 before `notFound()` resolves. The regression checks verify noindex, the not-found view, and withheld unpublished content; they do not claim every missing URL returns an HTTP 404. Keep missing/draft URLs out of the sitemap and review their exclusion in Search Console.

## Google Search Console

1. Open the already verified **Domain property** `ifaatechnologies.tech` in [Google Search Console](https://search.google.com/search-console). The owner confirmed DNS verification is complete. Keep the verification TXT record in DNS; no new token or verification step is needed. The property covers company, personal, and entrance subdomains.
2. Submit both `https://www.ifaatechnologies.tech/sitemap.xml` and `https://fahami.ifaatechnologies.tech/sitemap.xml` in the Sitemaps report. Submit the independent entrance platform's sitemap separately after verifying its actual URL.
3. After deploying both repositories, inspect the personal homepage, company homepage, `/about`, `/products`, and `/products/ifaa-entrance`. Confirm each retired `/om` URL redirects to its homepage. Request indexing for the English destination pages; do not submit `/om` as an indexable URL.
4. Review Page indexing and Search performance as Google collects data. Filter queries for the founder's full name, IFAA TECHNOLOGIES, and relevant English/Afaan Oromoo topics. Deployment does not verify ownership, submit URLs, or guarantee indexing/rankings.

## Grow the brand with useful content

Keep the name **Fahami Jemal Harun**, founder role, and website consistent across owner-managed public profiles. Link original technical writing, real projects, and the company where relevant. Publish first-hand articles about software development, learning, and practical technology for Ethiopian and Oromo audiences.

Use the supplied names **Ifaa Technologies**, **Ifaa Technology**, **Ifaa Tech**, **Ifaa Tech Ethiopia**, and **IFAA**, together with **Fahami Jemal Harun**, **Ethiopia**, and **Oromia** in relevant English content. The Oromo brand variants **Ifaa Teknoonoojii** and **Teknoolojii Ifaa** remain in organization aliases and metadata; **qormaata interaansii** remains in metadata. The company’s product page provides relevant entrance exam content. The personal biography avoids keyword lists and duplicate brand paragraphs. These phrases do not imply translated pages. Keep the founder and company identities consistent across owner-managed profiles. Avoid hidden keywords, repetition, fake offices, or unsupported ranking claims. Google does not use the keywords meta tag for ranking; useful visible content, real links, and accurate structured data matter.

## Personal name discovery and AI answers (GEO)

The canonical identity is **Fahami Jemal Harun**, a software developer and founder
of **IFAA TECHNOLOGIES**. The owner supplied these search spelling variants:
**Fahami**, **Fami**, **Fahmi**, **Fahami Jemal**, **Fahami Jamal**, and
**Fahami Jamel**. Person.alternateName connects them to one identity; they are
not separate people, pages, companies, or additional biographies. Keep the full
name as the visible heading and in titles. Do not create duplicate typo pages or
place a spelling list into the professional introduction.

The Person, ProfilePage, WebSite and Organization nodes share stable references.
The profile uses the existing public location Adama, Oromia, Ethiopia and the
professional topics already described on the site. Geography does not imply an
office address, service coverage guarantee, nationality, or invented credentials.
Original projects/articles, a concise server-rendered introduction, profile links,
and accurate metadata help both search engines and AI answer systems understand
the same facts. Public pages allow snippets and large image previews; private
pages remain noindex. GEO here means generative engine optimization, alongside
accurate geographic context. There is no special metadata tag that guarantees
AI citations, and no assumption that an llms.txt file is required.

After deployment, open the **homepage** in URL Inspection, use Test live URL,
then Request indexing if eligible. Submit the sitemap in the Sitemaps report;
the sitemap is a discovery file, not the page expected to rank for your name.
Check whether the homepage is indexed before diagnosing positions for spelling
variants. Google does not use meta keywords as a ranking signal. Neither the
name variants nor structured data guarantees indexing, AI inclusion, or first
place for short/ambiguous queries such as Fami or Fahmi.

Use the canonical full name and personal URL consistently on owner-managed
LinkedIn, GitHub and company profiles. In Search Console, compare query results
for the full name and supplied variants after Google has crawled the deployment;
do not interpret local regression tests as live indexing or ranking evidence.

## Current developer/founder portfolio

The visible portfolio now reflects the owner's current work with agentic AI,
spec-driven development, prompt/context engineering, RAG and entrepreneurship.
The same facts are included in Person.knowsAbout and the homepage description;
these are professional practices, not invented certifications or measured scores.

Completed work is presented as two source-controlled case studies under `/work/`.
Both have individual canonicals, sharing metadata, CreativeWork structured data
attributed to the same Person, and sitemap entries. Public screenshots and scoped
project descriptions distinguish implementation evidence from unverified hosted
account behavior, email delivery or business/learning outcomes. Old CMS projects
are retained in the archive without being presented as the two selected shipped
products. No translated routes, duplicate biographies, typo landing pages or
unsupported achievement claims were added.
