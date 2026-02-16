import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "./project-detail-client";
import type { Metadata } from "next";

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

  if (!project) {
    return { title: "Project Not Found" };
  }

  const title = `${project.title_en} | Fahami Jemal Harun`;
  const description =
    project.description_en?.slice(0, 160) ||
    `Explore ${project.title_en} - a project by Fahami Jemal Harun.`;
  const url = `/projects/${id}`;

  return {
    title,
    description,
    keywords: [
      ...(project.technologies ?? []),
      "Software Engineer",
      "Portfolio",
      "Project",
    ],
    authors: [{ name: "Fahami Jemal Harun" }],
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "Fahami Jemal Harun Portfolio",
      locale: "en_US",
      images: project.image_url
        ? [{ url: project.image_url, alt: project.title_en }]
        : undefined,
    },
    twitter: {
      card: project.image_url ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
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

  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}

