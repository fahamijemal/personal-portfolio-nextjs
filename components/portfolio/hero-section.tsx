"use client";

import Link from "next/link";
import { ArrowDown, Download, Github, Linkedin, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import type { HeroContent, SocialLinks } from "@/lib/site-content";

const DEFAULT_GITHUB = "https://github.com/fahamijemal";
const DEFAULT_LINKEDIN = "https://linkedin.com/in/fahamijemal";
const DEFAULT_TELEGRAM = "https://t.me/fahamijemal";
const DEFAULT_EMAIL = "fahamijemal1@gmail.com";

type HeroSectionProps = {
  resumeDownloadHref: string | null;
  heroContent?: HeroContent | null;
  socialLinks?: SocialLinks | null;
};

export function HeroSection({
  resumeDownloadHref,
  heroContent,
  socialLinks,
}: HeroSectionProps) {
  const { t, language } = useI18n();

  const greeting =
    (language === "om" && heroContent?.greeting_om) || heroContent?.greeting_en || t.hero.greeting;
  const name =
    (language === "om" && heroContent?.name_om) || heroContent?.name_en || t.hero.name;
  const role =
    (language === "om" && heroContent?.role_om) || heroContent?.role_en || t.hero.role;
  const subtitle =
    (language === "om" && heroContent?.subtitle_om) || heroContent?.subtitle_en || t.hero.subtitle;
  const description =
    (language === "om" && heroContent?.description_om) ||
    heroContent?.description_en ||
    t.hero.description;

  const githubUrl = socialLinks?.github_url || DEFAULT_GITHUB;
  const linkedinUrl = socialLinks?.linkedin_url || DEFAULT_LINKEDIN;
  const telegramUrl = socialLinks?.telegram_url || DEFAULT_TELEGRAM;
  const email = socialLinks?.email || DEFAULT_EMAIL;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-primary font-medium mb-2 animate-fade-in">
          {greeting}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
          {name}
        </h1>
        <h2 className="text-xl sm:text-2xl text-muted-foreground mb-2">
          {role}
        </h2>
        <p className="text-lg text-primary/80 font-medium mb-6">
          {subtitle}
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
          {description}
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
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Telegram</span>
          </a>
          <a
            href={`mailto:${email}`}
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
