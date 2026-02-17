import { createClient } from "@/lib/supabase/server";
import { PortfolioClient } from "@/components/portfolio/portfolio-client";
import {
  getHeroContent,
  getAboutContent,
  getSocialLinks,
} from "@/lib/site-content";

export default async function Home() {
  const supabase = await createClient();

  const [
    { data: projects },
    { data: posts },
    { data: resumeRow },
    { data: certificates },
    { data: skills },
    { data: settingsRows },
  ] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("display_order", { ascending: true })
      .limit(6),
    supabase
      .from("blog_posts")
      .select("id, slug, title_en, title_om, excerpt_en, excerpt_om, published_at, image_url, tags")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(3),
    supabase.from("site_settings").select("value").eq("key", "resume_url").maybeSingle(),
    supabase
      .from("certificates")
      .select("id, title_en, title_om, issuer, credential_url, image_url, issued_at")
      .order("display_order", { ascending: true })
      .limit(6),
    supabase
      .from("skills")
      .select("id, category, name, level, display_order")
      .order("category", { ascending: true })
      .order("display_order", { ascending: true }),
    supabase.from("site_settings").select("key, value"),
  ]);

  const resumeUrl = resumeRow?.value ?? null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const isOurStorage = resumeUrl && supabaseUrl && resumeUrl.startsWith(supabaseUrl);
  const resumeDownloadHref = isOurStorage ? "/api/resume" : resumeUrl;

  const settingsMap: Record<string, string> = {};
  settingsRows?.forEach((row) => {
    settingsMap[row.key] = row.value ?? "";
  });

  const heroContent = getHeroContent(settingsMap);
  const aboutContent = getAboutContent(settingsMap);
  const socialLinks = getSocialLinks(settingsMap);

  return (
    <PortfolioClient
      projects={projects || []}
      posts={posts || []}
      certificates={certificates || []}
      skills={skills || []}
      resumeDownloadHref={resumeDownloadHref}
      heroContent={heroContent}
      aboutContent={aboutContent}
      socialLinks={socialLinks}
    />
  );
}
