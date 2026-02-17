import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BlogPostClient } from "./blog-post-client";
import { getSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title_en, excerpt_en, published_at, image_url")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    return { title: "Post Not Found" };
  }

  const siteUrl = getSiteUrl();
  const title = `${post.title_en} | Fahami Jemal Harun`;
  const description =
    post.excerpt_en || "Read this blog post by Fahami Jemal Harun.";
  const url = `${siteUrl}/blog/${slug}`;
  const imageUrl = post.image_url?.startsWith("http") ? post.image_url : undefined;

  return {
    title,
    description,
    keywords: [
      "Software Engineer",
      "Full-Stack Developer",
      "Backend",
      "Cloud Computing",
      "Blog",
    ],
    authors: [{ name: "Fahami Jemal Harun" }],
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "Fahami Jemal Harun Portfolio",
      locale: "en_US",
      publishedTime: post.published_at ?? undefined,
      authors: ["Fahami Jemal Harun"],
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    notFound();
  }

  // Related posts: by shared tags or recent
  let related: { id: string; slug: string; title_en: string; title_om: string | null }[] = [];
  const postTags = (post.tags ?? []) as string[];
  if (postTags.length > 0) {
    const { data: byTag } = await supabase
      .from("blog_posts")
      .select("id, slug, title_en, title_om")
      .eq("published", true)
      .neq("id", post.id)
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
      .neq("id", post.id)
      .order("published_at", { ascending: false })
      .limit(5);
    const filtered = (recent ?? []).filter((p) => !excludeIds.includes(p.id));
    related = [...related, ...filtered].slice(0, 3);
  }

  return <BlogPostClient post={post} relatedPosts={related} />;
}
