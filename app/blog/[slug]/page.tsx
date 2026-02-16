import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BlogPostClient } from "./blog-post-client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title_en, excerpt_en, published_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = `${post.title_en} | Fahami Jemal Harun`;
  const description =
    post.excerpt_en || "Read this blog post by Fahami Jemal Harun.";
  const url = `/blog/${slug}`;

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

  return <BlogPostClient post={post} />;
}
