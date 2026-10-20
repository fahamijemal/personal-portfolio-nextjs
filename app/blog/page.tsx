import { getReadingTimeMinutes } from "@/lib/blog-utils";
import { mergeEditorialPosts } from "@/lib/editorial";
import { createClient } from "@/lib/supabase/server";
import { fetchSocialLinks } from "@/lib/site-content";
import { BlogPageClient } from "./blog-page-client";
import { StructuredData } from "@/components/structured-data";
import { publicPageGraph, publicPageMetadata } from "@/lib/personal-seo";

const blogMetadata = {
  ...publicPageMetadata({
    title: "Engineering Articles: Backend Systems, AI & Reliable Software",
    description:
      "Practical engineering articles by Fahami Jemal Harun on API contracts, backend architecture, agentic AI, retrieval, offline synchronization, and cloud delivery.",
    path: "/blog",
  }),
  alternates: {
    canonical: "https://fahami.ifaatechnologies.tech/blog",
    types: {
      "application/rss+xml":
        "https://fahami.ifaatechnologies.tech/blog/feed.xml",
    },
  },
};

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

export async function generateMetadata({ searchParams }: Props) {
  const { tag } = await searchParams;
  return tag
    ? {
        ...blogMetadata,
        robots: { index: false, follow: true },
      }
    : blogMetadata;
}

export default async function BlogPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const supabase = await createClient();

  const query = supabase
    .from("blog_posts")
    .select(
      "id, slug, title_en, title_om, excerpt_en, excerpt_om, published_at, image_url, tags",
    )
    .eq("published", true)
    .order("published_at", { ascending: false });

  const [socialLinks, { data: posts }] = await Promise.all([
    fetchSocialLinks(supabase),
    query,
  ]);

  const allPosts = mergeEditorialPosts(posts || []);
  const topics = [
    ...new Set(allPosts.flatMap((post) => post.tags || [])),
  ].sort();
  const visiblePosts = allPosts
    .filter((post) => !tag || post.tags?.includes(tag))
    .map(({ content_en, content_om, ...post }) => ({
      ...post,
      ...(content_en && { reading_minutes: getReadingTimeMinutes(content_en) }),
    }));
  return (
    <>
      {!tag && (
        <StructuredData
          value={publicPageGraph({
            path: "/blog",
            name: "Engineering articles",
            description:
              "Original articles by Fahami Jemal Harun on backend systems, AI engineering, and reliable software.",
            items: visiblePosts.map((post) => ({
              path: `/blog/${encodeURIComponent(post.slug)}`,
              name: post.title_en,
            })),
          })}
        />
      )}
      <BlogPageClient
        posts={visiblePosts}
        topics={topics}
        initialTag={tag ?? undefined}
        socialLinks={socialLinks}
      />
    </>
  );
}
