"use client";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { SelectedWork } from "@/components/portfolio/selected-work";
import { ProjectLibrary } from "@/components/portfolio/project-library";
import { isReviewedArchiveProject } from "@/lib/portfolio";
import type { Project } from "@/lib/types";
import type { SocialLinks } from "@/lib/site-content";
export function ProjectsPageClient({
  projects,
  socialLinks,
}: {
  projects: Project[];
  socialLinks?: SocialLinks | null;
}) {
  const archive = projects.filter(isReviewedArchiveProject);
  return (
    <div className="studio">
      <Header />
      <main id="main-content" className="collection-main">
        <div className="folio-container">
          <Link href="/" className="folio-text-link">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to home
          </Link>
          <div className="collection-intro">
            <p className="folio-label">THE PROJECT LIBRARY</p>
            <h1>
              Software, with <span>purpose.</span>
            </h1>
            <p>
              Shipped products, AI explorations, and collaborative engineering.
              A clear view of what I built and where the work stands.
            </p>
          </div>
        </div>
        <SelectedWork collection />
        <div className="folio-container">
          <ProjectLibrary />
          {archive.length > 0 && (
            <>
              <h2 className="library-heading">Additional projects</h2>
              <div className="github-grid">
                {archive.map((project) => (
                  <article key={project.id}>
                    <h3>
                      <Link href={`/projects/${project.id}`}>
                        {project.title_en}
                        <ArrowUpRight size={18} aria-hidden="true" />
                      </Link>
                    </h3>
                    <p>{project.description_en}</p>
                    <ul className="folio-tags">
                      {project.technologies.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </>
          )}
          <div className="collection-cta">
            <h2>Have a problem worth solving?</h2>
            <Link className="folio-button" href="/#contact">
              Let’s talk
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <Footer socialLinks={socialLinks} />
    </div>
  );
}
