"use client";

import { StudioPortfolio } from "./studio-portfolio";
import { I18nProvider } from "@/lib/i18n/context";
import type { BlogPost, Skill, Certificate } from "@/lib/types";
import type { AboutContent, SocialLinks } from "@/lib/site-content";

type PortfolioClientProps = {
  posts: BlogPost[];
  certificates?: Certificate[];
  skills?: Skill[];
  resumeDownloadHref?: string | null;
  aboutContent?: AboutContent;
  socialLinks?: SocialLinks;
};

export function PortfolioClient({
  posts,
  certificates = [],
  skills = [],
  resumeDownloadHref,
  aboutContent,
  socialLinks,
}: PortfolioClientProps) {
  return (
    <I18nProvider>
      <StudioPortfolio
        posts={posts}
        certificates={certificates}
        skills={skills}
        resumeDownloadHref={resumeDownloadHref}
        aboutContent={aboutContent}
        socialLinks={socialLinks}
      />
    </I18nProvider>
  );
}
