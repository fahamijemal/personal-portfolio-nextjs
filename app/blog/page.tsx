import { createClient } from "@/lib/supabase/server";
import { BlogPageClient } from "./blog-page-client";

export const metadata = {
  title: "Blog | Fahami Jemal Harun",
  description: "Thoughts, tutorials, and insights on software development and cloud computing.",
};

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title_en, title_om, excerpt_en, excerpt_om, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  return <BlogPageClient posts={posts || []} />;
}
