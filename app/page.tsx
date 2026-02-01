import { createClient } from "@/lib/supabase/server";
import { PortfolioClient } from "@/components/portfolio/portfolio-client";

export default async function Home() {
  const supabase = await createClient();

  const [{ data: projects }, { data: posts }] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("display_order", { ascending: true })
      .limit(6),
    supabase
      .from("blog_posts")
      .select("id, slug, title_en, title_om, excerpt_en, excerpt_om, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(3),
  ]);

  return <PortfolioClient projects={projects || []} posts={posts || []} />;
}
