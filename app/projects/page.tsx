import { createClient } from "@/lib/supabase/server";
import { fetchSocialLinks } from "@/lib/site-content";
import { ProjectsPageClient } from "./projects-page-client";

export const metadata = {
  title: "Projects | Fahami Jemal Harun",
  description: "Explore my portfolio of software development projects.",
};

export default async function ProjectsPage() {
  const supabase = await createClient();

  const [socialLinks, { data: projects }] = await Promise.all([
    fetchSocialLinks(supabase),
    supabase.from("projects").select("*").order("display_order", { ascending: true }),
  ]);

  return (
    <ProjectsPageClient projects={projects || []} socialLinks={socialLinks} />
  );
}
