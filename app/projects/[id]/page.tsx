import { createClient } from "@/lib/supabase/server";
import { fetchSocialLinks } from "@/lib/site-content";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "./project-detail-client";
import type { Metadata } from "next";
import { noIndexMetadata, publicPageMetadata } from "@/lib/personal-seo";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("title_en, description_en, image_url, technologies")
    .eq("id", id)
    .maybeSingle();

  if (
    !project ||
    ["E-Commerce Platform", "Cloud Task Manager"].includes(project.title_en)
  ) {
    return { ...noIndexMetadata, title: "Project Not Found" };
  }

  const description =
    project.description_en?.slice(0, 160) ||
    `Explore ${project.title_en} - a project by Fahami Jemal Harun.`;
  return publicPageMetadata({
    title: project.title_en,
    description,
    path: `/projects/${encodeURIComponent(id)}`,
    image: project.image_url || undefined,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (
    !project ||
    ["E-Commerce Platform", "Cloud Task Manager"].includes(project.title_en)
  )
    notFound();

  const socialLinks = await fetchSocialLinks(supabase);

  return <ProjectDetailClient project={project} socialLinks={socialLinks} />;
}
