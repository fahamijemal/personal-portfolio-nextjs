"use client";

import Link from "next/link";
import { ArrowDown, Download, Github, Linkedin, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";

export function HeroSection({ resumeDownloadHref }: { resumeDownloadHref: string | null }) {
  const { t } = useI18n();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-primary font-medium mb-2 animate-fade-in">
          {t.hero.greeting}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
          {t.hero.name}
        </h1>
        <h2 className="text-xl sm:text-2xl text-muted-foreground mb-2">
          {t.hero.role}
        </h2>
        <p className="text-lg text-primary/80 font-medium mb-6">
          {t.hero.subtitle}
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
          {t.hero.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button asChild size="lg">
            <Link href="#projects">{t.hero.viewProjects}</Link>
          </Button>
          {resumeDownloadHref ? (
            <Button variant="outline" size="lg" asChild>
              <a href={resumeDownloadHref} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                {t.hero.downloadResume}
              </a>
            </Button>
          ) : null}
          <Button variant="ghost" size="lg" asChild>
            <Link href="#contact">{t.hero.contactMe}</Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <a
            href="https://github.com/fahamijemal"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/fahamijemal"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://t.me/fahamijemal"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Telegram</span>
          </a>
          <a
            href="mailto:fahamijemal1@gmail.com"
            className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </a>
        </div>

        <Link
          href="#about"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors animate-bounce"
        >
          <ArrowDown className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
}
