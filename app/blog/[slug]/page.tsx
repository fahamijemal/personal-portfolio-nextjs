import { StructuredData } from "@/components/structured-data";
import { editorialPost, relatedArticles } from "@/lib/editorial";
import { createClient } from "@/lib/supabase/server";
import { fetchSocialLinks } from "@/lib/site-content";
import { notFound } from "next/navigation";
import { BlogPostClient } from "./blog-post-client";
import { getSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import {
  publicPageGraph,
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
    article: {
      publishedAt: post.published_at,
      modifiedAt: editorialPost(slug)?.updated_at,
    },
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

  const { data: candidates } = await supabase
    .from("blog_posts")
    .select("id, slug, title_en, title_om, tags, published_at")
    .eq("published", true)
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(20);
  const related = relatedArticles(post, candidates || []);
  const socialLinks = await fetchSocialLinks(supabase);

  return (
    <>
      <StructuredData
        value={publicPageGraph({
          path: `/blog/${encodeURIComponent(slug)}`,
          name: post.title_en,
          description: post.excerpt_en || post.title_en,
          parent: { path: "/blog", name: "Engineering articles" },
          mainEntityId: `${getSiteUrl()}/blog/${encodeURIComponent(slug)}#article`,
        })}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${getSiteUrl()}/blog/${encodeURIComponent(slug)}#article`,
            headline: post.title_en,
            description: post.excerpt_en || undefined,
            url: `${getSiteUrl()}/blog/${encodeURIComponent(slug)}`,
            mainEntityOfPage: {
              "@id": `${getSiteUrl()}/blog/${encodeURIComponent(slug)}#webpage`,
            },
            author: { "@id": personalBrand.personId },
            publisher: { "@id": personalBrand.personId },
            ...(post.published_at && { datePublished: post.published_at }),
            ...(post.updated_at && { dateModified: post.updated_at }),
            image: post.image_url?.startsWith("https://")
              ? post.image_url
              : `${getSiteUrl()}/opengraph-image`,
            inLanguage: "en",
            ...(post.tags?.length && { keywords: post.tags.join(", ") }),
            isPartOf: {
              "@type": "Blog",
              "@id": `${getSiteUrl()}/blog#blog`,
              url: `${getSiteUrl()}/blog`,
            },
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
