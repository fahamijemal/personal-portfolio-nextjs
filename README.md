# Personal Portfolio Website

A modern, responsive portfolio site built with Next.js, TypeScript, Tailwind CSS, and Supabase. Includes a public portfolio/blog and a protected admin dashboard for managing content.

The public site is [fahami.ifaatechnologies.tech](https://fahami.ifaatechnologies.tech/), featuring **Fahami Jemal Harun**, founder of **IFAA TECHNOLOGIES**. Search Console steps, canonical URLs, founder identity, and English brand/search-phrase guidance are documented in [SEO setup](docs/SEO.md).

## Features

- Landing page with hero, about, skills, projects, blog, and contact sections
- Blog with markdown-like content fields stored in Supabase
- Admin dashboard for projects, blog posts, messages, and settings
- Contact form saves messages to Supabase
- English public content with contextual Oromo brand/search phrases
- Permanent `/om` redirect to `/`, without translated pages or language links
- Founder/company structured data, page-specific social previews, and public-content sitemaps
- Dark/light theme support

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Supabase (Auth, Postgres)

## Getting Started

### 1) Install dependencies

```bash
pnpm install --frozen-lockfile
```

### 2) Configure environment variables

Create `.env.local` at the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3) Set up the database

Run the Supabase migrations (Supabase Dashboard → SQL Editor, or CLI):

```bash
# If using Supabase CLI:
supabase db push
```

Or run each file in `supabase/migrations/` manually in the SQL Editor (in order: 001, 002, then 003).

**Make yourself admin:** After migrations, set `is_admin = true` for your user in the `profiles` table (Supabase Dashboard → Table Editor → profiles).

### 4) Run the dev server

```bash
pnpm run dev
```

Open http://localhost:3000

### 5) Verify changes

```bash
pnpm run typecheck
pnpm run build
```

Use Node.js 24 for the SEO regression checks. Build a local test artifact with explicit loopback overrides, including when `.env.local` contains a hosted project's settings:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:3019 NEXT_PUBLIC_SUPABASE_ANON_KEY=personal-local-seo-fixture-key SUPABASE_SERVICE_ROLE_KEY= pnpm run build
pnpm run test:seo
```

These settings are for local tests only. Vercel must build with the personal project's real environment settings. The thirteen HTTP/data-boundary scenarios run with a read-only loopback Supabase fixture on ports 3018/3019, covering founder identity, canonical/social URLs, retired translation redirects, published versus draft content, auth gates, sitemap dates, and the social image. A test-only network guard rejects non-fixture server fetches. The checks do not send inquiries or access the hosted backend.

Optional browser checks use existing Playwright tooling without adding application dependencies. In the shared cloud environment:

```bash
PLAYWRIGHT_MODULE_ROOT=/workspace/ifaatech pnpm run test:seo:browser
```

Elsewhere, set `PLAYWRIGHT_MODULE_ROOT` to a tooling directory containing `@playwright/test` and set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an installed Chromium executable. The six browser scenarios check English rendering despite old saved preferences, desktop/mobile layout, real project navigation, contact feedback, accessibility, and local font loading. Run the HTTP and browser suites sequentially with ports 3018/3019 free.

The repository's existing `lint` command references ESLint, but its dependency and configuration are not supplied in the current project. TypeScript and build checks do not replace a configured linter.

The bundled Geist and Geist Mono Latin fonts retain their [OFL license](app/fonts/OFL.txt). Builds do not need to fetch them from Google Fonts.

## License

MIT

## Current portfolio presentation

The homepage in `components/portfolio/studio-portfolio.tsx` prioritizes software
engineering roles and collaborations: three case studies, focused capabilities,
a brief approach, biography/education, two engineering notes, credentials, and contact.
Detailed lifecycle, AI practices, and foundations live at `/approach`.

`lib/portfolio.ts` maintains completed product work and the public AI challenge
case study, contribution/decision/architecture/verification details, and curated
public/private project cards. Private summaries were authorized by the owner;
they contain no private source URLs, credentials, account data, or copied code.
OpsFlow identifies the owner's document-management contribution to a team project.
Mobile work is a companion codebase, without an app-store release claim.

The project library combines three case studies, public-source projects, and
high-level private-source summaries. The legacy E-Commerce Platform and Cloud
Task Manager sample records are excluded from listings, detail routes, and the
sitemap. Existing database records are retained. Other CMS archive entries need
a source or live link to appear in the library.

`lib/editorial.ts` supplies six source-maintained engineering articles. The original
MCP and retrieval notes retain their October 19 publication dates; the API contracts,
offline synchronization, and AI boundary articles were published October 20. The
cloud article retains its original February publication date. Revisions have explicit
modification dates. Repository articles take precedence over CMS entries with the
same slug; admin edits to those slugs do not override the source-maintained text.
CMS writing with other slugs remains supported.

CMS social links, resume URL, education, certificates, and additional writing
remain supported. The homepage toolkit is curated in source to avoid duplicating
CMS technology lists. Public collections share `app/portfolio.css`; credential
previews omit webpage URLs and hide images that fail to load. Credentials derive
an issuer from a recognized credential host only when the issuer is missing.

### Contact notifications

Messages are saved to the existing portfolio inbox first. Optional Resend email
notifications require the server-only `RESEND_API_KEY`, `CONTACT_NOTIFICATION_FROM`
(verified sender), and `CONTACT_NOTIFICATION_TO` variables. Missing configuration
skips email; a provider error is logged without PII and does not undo a saved message.
No live notifications were sent during implementation. Run `pnpm run test:contact`
for isolated provider success, missing-config, and failure tests.

### Performance verification

Public project screenshots use WebP derivatives (~125 KB combined, down from
~452 KB of PNG source). Original captures remain for provenance. Local browser
metrics are lab observations, not real-user Core Web Vitals. The cloud environment
blocks Google's PageSpeed API; use PageSpeed Insights and Search Console against
the deployed site to collect live and field measurements. Site indexing and
profile changes require access to the respective external accounts.

### Current CV

The updated two-page CV is bundled at `public/resume/Fahami-Jemal-Harun-CV.pdf`.
Its editable source is `content/fahami-jemal-harun-cv.md`. Rebuild it with
`python scripts/build-cv.py` (Python ReportLab and DejaVu Sans fonts required;
these are authoring tools, not app runtime dependencies).

The homepage uses `/api/resume` for storage-backed or unset resume settings.
That route checks the new `resumes/fahami-jemal-harun-cv.pdf` storage key for
future administrator uploads, then falls back to the bundled PDF. The old
`resumes/resume.pdf` is retained in storage but no longer overrides the new CV.
The admin upload control uses the new key; custom external resume URLs remain supported.
Redirects are not cached. No production database or storage records were changed.

The previous PDF could not be read because its storage redirect was blocked by
the cloud environment network policy. Content uses the owner's supplied profile,
previously listed credentials, and reviewed public GitHub projects. No employment
dates, graduation date, GPA, project usage figures, or AI performance claims were invented.

### Professional content scope

The owner-supplied history informs the copy rather than appearing as a full biography.
The portfolio prioritizes product work, engineering judgment, and team contributions.
Education is a concise ASTU degree/fifth-year note. Semester course lists, device/editor preferences, speculative
technology lists, and repeated project histories are omitted. The flagship case study
retains the relevant Express/MongoDB to NestJS/Prisma/PostgreSQL architecture evolution.
The CV follows the same scope and remains two pages.

### Blog publishing and checks

`lib/editorial.ts` publishes six repository-maintained engineering articles, including
API contracts, offline synchronization, and reliable AI API boundaries. Articles have
an excerpt, publication/modification dates, topics, and key takeaways. Keep the original
publication date on revisions and update `updated_at` only when content changes.
Related reading ranks shared topics before recency. CMS posts with other slugs remain
available; unpublished CMS posts are excluded from listings, the feed, and details.

`/blog/feed.xml` provides an RSS feed with canonical links and escaped summaries.
The blog advertises it through a visible subscription link and alternate metadata.
Mobile section navigation is collapsible; code and wide tables support keyboard scrolling.
The new articles are general engineering explanations with illustrative examples and
public references. They introduce no private source code, client data, outcome metrics,
or claims of independent production validation.

Run `pnpm run test:blog` for editorial/related-post boundaries. After the documented
fixture build, run `PLAYWRIGHT_MODULE_ROOT=/workspace/ifaatech pnpm run test:blog:browser`
for topic/search navigation, mobile anchors, code/tables, and both-theme accessibility.
Run fixture browser/HTTP suites sequentially because they share ports 3018/3019.
