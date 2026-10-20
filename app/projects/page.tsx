import { completedWork, isReviewedArchiveProject } from "@/lib/portfolio";
import { createClient } from "@/lib/supabase/server";
import { fetchSocialLinks } from "@/lib/site-content";
import { ProjectsPageClient } from "./projects-page-client";
import { StructuredData } from "@/components/structured-data";
import { publicPageGraph, publicPageMetadata } from "@/lib/personal-seo";

export const metadata = publicPageMetadata({
  title: "Software Projects",
  description:
    "Explore Fahami Jemal Harun’s published software projects, technologies, and development work, with links to available source code and live applications.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const supabase = await createClient();

  const [socialLinks, { data: projects }] = await Promise.all([
    fetchSocialLinks(supabase),
    supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true }),
  ]);

  return (
    <>
      <StructuredData
        value={publicPageGraph({
          path: "/projects",
          name: "Software projects",
          description:
            "Project case studies and software engineering contributions by Fahami Jemal Harun.",
          items: completedWork.map((work) => ({
            path: `/work/${work.slug}`,
            name: work.name,
          })),
        })}
      />
      <ProjectsPageClient
        projects={(projects || []).filter(isReviewedArchiveProject)}
        socialLinks={socialLinks}
      />
    </>
  );
}
