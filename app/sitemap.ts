import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { editorialPosts } from "@/lib/editorial";
import { completedWork, isReviewedArchiveProject } from "@/lib/portfolio";
import { getSiteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const pages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/projects` },
    { url: `${siteUrl}/approach` },
    ...editorialPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      ...(post.updated_at || post.published_at
        ? { lastModified: new Date((post.updated_at || post.published_at)!) }
        : {}),
    })),
    ...completedWork.map((work) => ({ url: `${siteUrl}/work/${work.slug}` })),
    { url: `${siteUrl}/blog` },
    { url: `${siteUrl}/certificates` },
  ];
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return pages;
  // Index anonymous public content, never an administrator's session or key.
  const supabase = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          signal: AbortSignal.timeout(10_000),
          next: { revalidate: 3600 },
        }),
    },
  });
  const [{ data: posts }, { data: projects }] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("slug, published_at")
      .eq("published", true),
    // Existing projects are publicly readable and have no draft flag.
    supabase.from("projects").select("id, title_en, github_url, live_url"),
  ]);
  for (const post of posts ?? []) {
    if (typeof post.slug !== "string" || !post.slug) continue;
    if (editorialPosts.some((note) => note.slug === post.slug)) continue;
    const date = post.published_at ? new Date(post.published_at) : null;
    pages.push({
      url: `${siteUrl}/blog/${encodeURIComponent(post.slug)}`,
      ...(date && Number.isFinite(date.getTime()) && { lastModified: date }),
    });
  }
  for (const project of projects ?? []) {
    if (project.title_en && !isReviewedArchiveProject(project)) continue;
    if (typeof project.id === "string" && project.id)
      pages.push({
        url: `${siteUrl}/projects/${encodeURIComponent(project.id)}`,
      });
  }
  return pages;
}
