import type { BlogPost } from "@/lib/types";
import { mergeEditorialPosts } from "@/lib/editorial";
import { createClient } from "@/lib/supabase/server";
import { PERSONAL_ORIGIN } from "@/lib/site-url";

const xml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
export async function GET() {
  let stored: BlogPost[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("id, slug, title_en, title_om, excerpt_en, published_at, tags")
      .eq("published", true)
      .order("published_at", { ascending: false });
    stored = data || [];
  } catch {
    /* Repository articles remain available if the CMS is unavailable. */
  }
  const posts = mergeEditorialPosts(stored);
  const items = posts
    .map((post) => {
      const url = `${PERSONAL_ORIGIN}/blog/${encodeURIComponent(post.slug)}`;
      const date = post.published_at ? new Date(post.published_at) : null;
      return `<item><title>${xml(post.title_en)}</title><link>${xml(url)}</link><guid isPermaLink="true">${xml(url)}</guid><description>${xml(post.excerpt_en || "")}</description>${date && Number.isFinite(date.getTime()) ? `<pubDate>${date.toUTCString()}</pubDate>` : ""}${(post.tags || []).map((tag) => `<category>${xml(tag)}</category>`).join("")}</item>`;
    })
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Fahami Jemal Harun — Engineering articles</title><link>${PERSONAL_ORIGIN}/blog</link><description>Practical articles on backend systems, applied AI, and reliable software.</description><language>en</language><atom:link href="${PERSONAL_ORIGIN}/blog/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
