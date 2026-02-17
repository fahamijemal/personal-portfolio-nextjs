"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { ShareButtons } from "@/components/portfolio/share-buttons";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import type { Project } from "@/lib/types";

function ProjectDetailContent({ project }: { project: Project }) {
  const { language } = useI18n();
  const title = language === "om" && project.title_om ? project.title_om : project.title_en;
  const description =
    language === "om" && project.description_om ? project.description_om : project.description_en;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>

          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>

          {project.image_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.image_url}
              alt={project.title_en}
              className="w-full max-h-[420px] object-cover rounded-xl border border-border mb-8"
            />
          ) : null}

          <p className="text-muted-foreground text-lg mb-6">{description}</p>

          {project.technologies?.length ? (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 mb-6">
            {project.github_url ? (
              <Button variant="outline" asChild>
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
            ) : null}
            {project.live_url ? (
              <Button asChild>
                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Project
                </a>
              </Button>
            ) : null}
          </div>
          <ShareButtons title={title} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <I18nProvider>
      <ProjectDetailContent project={project} />
    </I18nProvider>
  );
}

