"use client";

import { Header } from "./header";
import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import { SkillsSection } from "./skills-section";
import { ProjectsSection } from "./projects-section";
import { BlogSection } from "./blog-section";
import { ContactSection } from "./contact-section";
import { Footer } from "./footer";
import { I18nProvider } from "@/lib/i18n/context";

type Project = {
  id: string;
  title_en: string;
  title_om: string | null;
  description_en: string;
  description_om: string | null;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
};

type BlogPost = {
  id: string;
  slug: string;
  title_en: string;
  title_om: string | null;
  excerpt_en: string | null;
  excerpt_om: string | null;
  published_at: string | null;
};

type PortfolioClientProps = {
  projects: Project[];
  posts: BlogPost[];
};

export function PortfolioClient({ projects, posts }: PortfolioClientProps) {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection projects={projects} />
          <BlogSection posts={posts} />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
