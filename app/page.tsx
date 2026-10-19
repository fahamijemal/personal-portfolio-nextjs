import { mergeEditorialPosts } from "@/lib/editorial";
import { createClient } from "@/lib/supabase/server";
import { PortfolioClient } from "@/components/portfolio/portfolio-client";
import { getAboutContent, getSocialLinks } from "@/lib/site-content";
import {
  publicPageMetadata,
  personalBrand,
  profilePageGraph,
  serializeStructuredData,
} from "@/lib/personal-seo";

export const metadata = publicPageMetadata({
  title: personalBrand.title,
  description:
    "Fahami Jemal Harun — full-stack developer and IFAA TECHNOLOGIES founder. Explore shipped products, agentic AI workflows, spec-driven development, and software engineering.",
  path: "/",
  home: true,
});

export default async function Home() {
  const supabase = await createClient();

  const [
    { data: posts },
    { data: resumeRow },
    { data: certificates },
    { data: skills },
    { data: settingsRows },
  ] = await Promise.all([
    supabase
      .from("blog_posts")
      .select(
        "id, slug, title_en, title_om, excerpt_en, excerpt_om, published_at, image_url, tags",
      )
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(3),
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "resume_url")
      .maybeSingle(),
    supabase
      .from("certificates")
      .select(
        "id, title_en, title_om, issuer, credential_url, image_url, issued_at",
      )
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
  const isOurStorage =
    resumeUrl && supabaseUrl && resumeUrl.startsWith(supabaseUrl);
  const resumeDownloadHref =
    !resumeUrl || isOurStorage ? "/api/resume" : resumeUrl;

  const settingsMap: Record<string, string> = {};
  settingsRows?.forEach((row) => {
    settingsMap[row.key] = row.value ?? "";
  });

  const aboutContent = getAboutContent(settingsMap);
  const socialLinks = getSocialLinks(settingsMap);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(profilePageGraph("/")),
        }}
      />
      <PortfolioClient
        posts={mergeEditorialPosts(posts || [])}
        certificates={certificates || []}
        skills={skills || []}
        resumeDownloadHref={resumeDownloadHref}
        aboutContent={aboutContent}
        socialLinks={socialLinks}
      />
    </>
  );
}
