"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";
import type { Project } from "@/lib/types";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const { language, t } = useI18n();

  return (
    <section id="projects" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
          {t.projects.title}
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          {t.projects.subtitle}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-card border-border flex flex-col overflow-hidden"
            >
              <Link href={`/projects/${project.id}`} className="block">
                {project.image_url ? (
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={project.image_url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="h-40 w-full bg-muted flex items-center justify-center">
                    <FolderKanban className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                )}
                <CardHeader>
                  <h3 className="font-semibold text-lg text-foreground">
                    {language === "om" && project.title_om
                      ? project.title_om
                      : project.title_en}
                  </h3>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "om" && project.description_om
                      ? project.description_om
                      : project.description_en}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Link>
              <CardFooter className="gap-2">
                {project.github_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      {t.projects.viewCode}
                    </a>
                  </Button>
                )}
                {project.live_url && (
                  <Button size="sm" asChild>
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {t.projects.viewProject}
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/projects">{t.projects.viewAll}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
