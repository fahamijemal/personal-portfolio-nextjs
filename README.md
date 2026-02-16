# Personal Portfolio Website

A modern, responsive portfolio site built with Next.js, TypeScript, Tailwind CSS, and Supabase. Includes a public portfolio/blog and a protected admin dashboard for managing content.

## Features

- Landing page with hero, about, skills, projects, blog, and contact sections
- Blog with markdown-like content fields stored in Supabase
- Admin dashboard for projects, blog posts, messages, and settings
- Contact form saves messages to Supabase
- i18n support (English/Afaan Oromo)
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
pnpm install
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

Or run each file in `supabase/migrations/` manually in the SQL Editor (in order: 001, then 002).

**Make yourself admin:** After migrations, set `is_admin = true` for your user in the `profiles` table (Supabase Dashboard → Table Editor → profiles).

### 4) Run the dev server

```bash
pnpm run dev
```

Open http://localhost:3000



## License

MIT
