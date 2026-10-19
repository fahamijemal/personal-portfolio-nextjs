import { editorialPost, editorialPosts } from "@/lib/editorial";
import { createClient } from "@/lib/supabase/server";
import { fetchSocialLinks } from "@/lib/site-content";
import { notFound } from "next/navigation";
import { BlogPostClient } from "./blog-post-client";
import { getSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import {
  noIndexMetadata,
  publicPageMetadata,
  personalBrand,
  serializeStructuredData,
} from "@/lib/personal-seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: storedPost } = await supabase
    .from("blog_posts")
    .select("title_en, excerpt_en, published_at, image_url")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  const post = editorialPost(slug) || storedPost;

  if (!post) {
    return { ...noIndexMetadata, title: "Post Not Found" };
  }

  const description =
    post.excerpt_en || "Read this blog post by Fahami Jemal Harun.";
  const imageUrl = post.image_url?.startsWith("http")
    ? post.image_url
    : undefined;
  return publicPageMetadata({
    title: post.title_en,
    description,
    path: `/blog/${encodeURIComponent(slug)}`,
    image: imageUrl,
    article: { publishedAt: post.published_at },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: storedPost } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  const post = editorialPost(slug) || storedPost;

  if (!post) {
    notFound();
  }

  // Related posts: by shared tags or recent
  let related: {
    id: string;
    slug: string;
    title_en: string;
    title_om: string | null;
  }[] = [];
  const postTags = (post.tags ?? []) as string[];
  if (postTags.length > 0) {
    const { data: byTag } = await supabase
      .from("blog_posts")
      .select("id, slug, title_en, title_om")
      .eq("published", true)
      .neq("slug", slug)
      .overlaps("tags", postTags)
      .order("published_at", { ascending: false })
      .limit(3);
    related = byTag ?? [];
  }
  if (related.length < 3) {
    const excludeIds = related.map((r) => r.id);
    const { data: recent } = await supabase
      .from("blog_posts")
      .select("id, slug, title_en, title_om")
      .eq("published", true)
      .neq("slug", slug)
      .order("published_at", { ascending: false })
      .limit(5);
    const filtered = (recent ?? []).filter((p) => !excludeIds.includes(p.id));
    related = [...related, ...filtered].slice(0, 3);
  }

  related = [
    ...editorialPosts
      .filter((note) => note.slug !== slug)
      .map((note) => ({
        id: note.id,
        slug: note.slug,
        title_en: note.title_en,
        title_om: note.title_om,
      })),
    ...related,
  ]
    .filter(
      (item, index, items) =>
        items.findIndex((other) => other.slug === item.slug) === index,
    )
    .slice(0, 3);
  const socialLinks = await fetchSocialLinks(supabase);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title_en,
            description: post.excerpt_en || undefined,
            url: `${getSiteUrl()}/blog/${encodeURIComponent(slug)}`,
            mainEntityOfPage: `${getSiteUrl()}/blog/${encodeURIComponent(slug)}`,
            author: { "@id": personalBrand.personId },
            publisher: { "@id": personalBrand.personId },
            ...(post.published_at && { datePublished: post.published_at }),
            ...(editorialPost(slug) && {
              dateModified: "2026-10-19T00:00:00Z",
            }),
            ...(post.image_url?.startsWith("https://") && {
              image: post.image_url,
            }),
            inLanguage: "en",
          }),
        }}
      />
      <BlogPostClient
        post={post}
        relatedPosts={related}
        socialLinks={socialLinks}
      />
    </>
  );
}
