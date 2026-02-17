"use client";

import { Header } from "./header";
import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import { SkillsSection } from "./skills-section";
import { ProjectsSection } from "./projects-section";
import { CertificatesSection } from "./certificates-section";
import { BlogSection } from "./blog-section";
import { ContactSection } from "./contact-section";
import { Footer } from "./footer";
import { I18nProvider } from "@/lib/i18n/context";
import type { Project, BlogPost, Skill, Certificate } from "@/lib/types";

type PortfolioClientProps = {
  projects: Project[];
  posts: BlogPost[];
  certificates?: Certificate[];
  skills?: Skill[];
  resumeDownloadHref?: string | null;
};

export function PortfolioClient({
  projects,
  posts,
  certificates = [],
  skills = [],
  resumeDownloadHref,
}: PortfolioClientProps) {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection resumeDownloadHref={resumeDownloadHref ?? null} />
          <AboutSection />
          <SkillsSection skills={skills} />
          <ProjectsSection projects={projects} />
          <CertificatesSection certificates={certificates} />
          <BlogSection posts={posts} />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
