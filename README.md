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

These settings are for local tests only. Vercel must build with the personal project's real environment settings. The nine HTTP/data-boundary scenarios run with a read-only loopback Supabase fixture on ports 3018/3019, covering founder identity, canonical/social URLs, retired translation redirects, published versus draft content, auth gates, sitemap dates, and the social image. A test-only network guard rejects non-fixture server fetches. The checks do not send inquiries or access the hosted backend.

Optional browser checks use existing Playwright tooling without adding application dependencies. In the shared cloud environment:

```bash
PLAYWRIGHT_MODULE_ROOT=/workspace/ifaatech pnpm run test:seo:browser
```

Elsewhere, set `PLAYWRIGHT_MODULE_ROOT` to a tooling directory containing `@playwright/test` and set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an installed Chromium executable. The five browser scenarios check English rendering despite old saved preferences, desktop/mobile layout, real project navigation, contact feedback, accessibility, and local font loading. Run the HTTP and browser suites sequentially with ports 3018/3019 free.

The repository's existing `lint` command references ESLint, but its dependency and configuration are not supplied in the current project. TypeScript and build checks do not replace a configured linter.

The bundled Geist and Geist Mono Latin fonts retain their [OFL license](app/fonts/OFL.txt). Builds do not need to fetch them from Google Fonts.

## License

MIT

## Current portfolio presentation

The homepage is an editorial developer/founder portfolio in
`components/portfolio/studio-portfolio.tsx`, styled by `app/portfolio.css`.
It introduces agentic AI, specification-driven development, prompt/context
engineering, retrieval-augmented generation, review/testing, and product thinking
alongside full-stack/backend/cloud foundations. It uses capability descriptions,
not invented proficiency percentages or business metrics.

`lib/portfolio.ts` contains the two owner-confirmed completed projects: IFAA
ENTRANCE and the IFAA TECHNOLOGIES company platform. Their case studies live at
`/work/ifaa-entrance` and `/work/ifaa-technologies`, and are included in the sitemap
and project index. Screenshots are real public-page captures, not generated UI.
The homepage prioritizes these completed projects; existing CMS projects remain
in the project archive. No database records were inserted or overwritten.

CMS social links, resume URL, education details, skills/tool names, certificates,
and published writing continue to populate the portfolio. The new introduction,
capabilities, development process, and curated case studies are maintained in
source rather than inherited from old hero role/description settings. The portrait
is the existing licensed/owner-provided `public/fahamijemal.jpg`. Existing admin,
authentication, content publishing, and contact API/database behavior is retained.
Contact UI checks mock responses and never send real inquiries.

### Public GitHub work and engineering practice

The homepage also presents four public source projects from `fahamijemal`: Chimera,
Automaton Auditor, EduAI Assistant, and the ASTU Smart Complaints API. README files
and relevant source files were reviewed on October 19, 2026. These cards describe
challenge, learning, and academic work; they do not imply independently verified
production deployments or measured AI performance. Edit `githubWork`, `aiPractices`,
`engineeringFoundations`, and the six-stage `developmentProcess` in `lib/portfolio.ts`.
MCP, LangGraph, context engineering, and keyword-based document retrieval are tied
to concrete source examples. Broader RAG evaluation is presented as developing practice.
