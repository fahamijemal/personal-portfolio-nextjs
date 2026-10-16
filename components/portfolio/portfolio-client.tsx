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
import type {
  HeroContent,
  AboutContent,
  SocialLinks,
} from "@/lib/site-content";

type PortfolioClientProps = {
  projects: Project[];
  posts: BlogPost[];
  certificates?: Certificate[];
  skills?: Skill[];
  resumeDownloadHref?: string | null;
  heroContent?: HeroContent;
  aboutContent?: AboutContent;
  socialLinks?: SocialLinks;
};

export function PortfolioClient({
  projects,
  posts,
  certificates = [],
  skills = [],
  resumeDownloadHref,
  heroContent,
  aboutContent,
  socialLinks,
}: PortfolioClientProps) {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content">
          <HeroSection
            resumeDownloadHref={resumeDownloadHref ?? null}
            heroContent={heroContent}
            socialLinks={socialLinks}
          />
          <AboutSection aboutContent={aboutContent} />
          <SkillsSection skills={skills} />
          <ProjectsSection projects={projects} />
          <CertificatesSection certificates={certificates} />
          <BlogSection posts={posts} />
          <ContactSection email={socialLinks?.email ?? null} />
        </main>
        <Footer socialLinks={socialLinks} />
      </div>
    </I18nProvider>
  );
}
