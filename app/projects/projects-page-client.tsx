"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import type { Project } from "@/lib/types";

function ProjectsContent({ projects }: { projects: Project[] }) {
  const { language, t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t.projects.title}
          </h1>
          <p className="text-muted-foreground mb-12">{t.projects.subtitle}</p>

          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No projects yet. Check back soon!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-card border-border flex flex-col"
                >
                  <Link href={`/projects/${project.id}`} className="block">
                    <CardHeader>
                      <h2 className="font-semibold text-lg text-foreground">
                        {language === "om" && project.title_om
                          ? project.title_om
                          : project.title_en}
                      </h2>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === "om" && project.description_om
                          ? project.description_om
                          : project.description_en}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs"
                          >
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function ProjectsPageClient({ projects }: { projects: Project[] }) {
  return (
    <I18nProvider>
      <ProjectsContent projects={projects} />
    </I18nProvider>
  );
}
