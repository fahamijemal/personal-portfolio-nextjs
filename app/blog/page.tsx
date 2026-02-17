import { createClient } from "@/lib/supabase/server";
import { BlogPageClient } from "./blog-page-client";

export const metadata = {
  title: "Blog | Fahami Jemal Harun",
  description: "Thoughts, tutorials, and insights on software development and cloud computing.",
};

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("blog_posts")
    .select("id, slug, title_en, title_om, excerpt_en, excerpt_om, published_at, image_url, tags")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (tag) {
    query = query.contains("tags", [tag]);
  }

  const { data: posts } = await query;

  return <BlogPageClient posts={posts || []} initialTag={tag ?? undefined} />;
}
