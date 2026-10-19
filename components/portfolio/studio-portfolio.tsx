"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Check,
  Sparkles,
} from "lucide-react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ContactSection } from "./contact-section";
import { SelectedWork } from "./selected-work";
import { capabilities } from "@/lib/portfolio";
import { profileContext } from "@/lib/profile";
import { personalBrand } from "@/lib/personal-seo";
import {
  getSocialLinkUrls,
  type AboutContent,
  type SocialLinks,
} from "@/lib/site-content";
import type { BlogPost, Certificate, Skill } from "@/lib/types";
import { formatCredentialDate, credentialIssuer } from "@/lib/presentation";

export function StudioPortfolio({
  posts,
  certificates,
  aboutContent,
  socialLinks,
  resumeDownloadHref,
}: {
  posts: BlogPost[];
  certificates: Certificate[];
  skills: Skill[];
  aboutContent?: AboutContent;
  socialLinks?: SocialLinks;
  resumeDownloadHref?: string | null;
}) {
  const social = getSocialLinkUrls(socialLinks);
  return (
    <div className="studio">
      <Header />
      <main id="main-content">
        <section id="home" className="folio-hero">
          <div className="folio-container hero-grid">
            <div className="hero-copy">
              <p className="folio-label">
                <span className="status-dot" />
                DEVELOPER · FOUNDER · PRODUCT BUILDER
              </p>
              <h1>
                Fahami Jemal
                <br />
                <span>Harun</span>
                <span className="hero-period">.</span>
              </h1>
              <p className="hero-role">
                Full-Stack Developer · Founder of{" "}
                <a href={personalBrand.companyUrl}>
                  IFAA TECHNOLOGIES{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </p>
              <p className="hero-description">
                I build education platforms, backend services, and AI-powered
                applications with TypeScript, Python, and specification-led
                development.
              </p>
              <p className="hero-opportunity">
                Open to software engineering opportunities and product
                collaborations.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="folio-button">
                  Explore my work
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a href="#contact" className="folio-button secondary">
                  Let’s talk
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-socials">
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={17} aria-hidden="true" />
                  GitHub
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={17} aria-hidden="true" />
                  LinkedIn
                </a>
                {resumeDownloadHref && (
                  <a
                    href={resumeDownloadHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={16} aria-hidden="true" />
                    Download CV
                  </a>
                )}
              </div>
            </div>
            <div className="hero-visual">
              <div className="portrait-frame">
                <div className="portrait-topline">
                  <span>THE PERSON BEHIND THE WORK</span>
                  <span>↗</span>
                </div>
                <div className="portrait-image">
                  <Image
                    src="/fahamijemal.jpg"
                    alt="Fahami Jemal Harun, full-stack developer and founder of IFAA TECHNOLOGIES"
                    width={960}
                    height={1200}
                    priority
                    sizes="(max-width: 760px) 70vw, 360px"
                  />
                </div>
                <div className="portrait-caption">
                  <span>Adama, Ethiopia</span>
                  <span>Building with intention.</span>
                </div>
              </div>
              <div className="hero-note">
                <Sparkles size={18} aria-hidden="true" />
                <span>
                  Human direction.
                  <br />
                  <strong>AI-assisted execution.</strong>
                </span>
              </div>
            </div>
          </div>
        </section>
        <SelectedWork />
        <section
          id="skills"
          className="folio-section expertise"
          aria-labelledby="expertise-title"
        >
          <div className="folio-container">
            <div className="section-heading">
              <div>
                <p className="folio-label">02 / CAPABILITIES</p>
                <h2 id="expertise-title">
                  A focused <span>toolkit.</span>
                </h2>
              </div>
              <p>
                Applied in projects, strengthened through study, and reviewed
                through evidence.
              </p>
            </div>
            <div className="expertise-grid">
              {capabilities.map((item) => (
                <article key={item.number}>
                  <span className="folio-label">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul className="capability-list">
                    {item.tags.slice(0, 5).map((tag) => (
                      <li key={tag}>
                        <Check size={13} aria-hidden="true" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="practice-evidence">
              <Link href="/work/project-chimera">
                MCP & agents: Project Chimera ↗
              </Link>
              <a
                href="https://github.com/fahamijemal/automaton-auditor"
                target="_blank"
                rel="noopener noreferrer"
              >
                LangGraph & retrieval: Automaton Auditor ↗
              </a>
              <Link href="/approach">
                RAG, evaluation & engineering foundations ↗
              </Link>
            </div>
          </div>
        </section>
        <section
          id="approach"
          className="folio-section approach compact-approach"
          aria-labelledby="approach-title"
        >
          <div className="folio-container">
            <div className="section-heading">
              <div>
                <p className="folio-label">03 / HOW I BUILD</p>
                <h2 id="approach-title">
                  Clear specifications.
                  <br />
                  <span>Accountable delivery.</span>
                </h2>
              </div>
              <p>
                I use agentic AI to support bounded tasks, then review the
                implementation against the intended behavior.
              </p>
            </div>
            <ol className="approach-summary">
              <li>
                <span>01</span>
                <h3>Understand & design</h3>
                <p>
                  Define users, requirements, acceptance criteria, and system
                  boundaries.
                </p>
              </li>
              <li>
                <span>02</span>
                <h3>Build & verify</h3>
                <p>
                  Implement in focused changes; review code, permissions, tests,
                  and accessibility.
                </p>
              </li>
              <li>
                <span>03</span>
                <h3>Release & improve</h3>
                <p>
                  Check deployment, learn from failures and feedback, and
                  maintain the product.
                </p>
              </li>
            </ol>
            <Link href="/approach" className="folio-text-link">
              Explore my full development lifecycle
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
        <section
          id="about"
          className="folio-section about-studio"
          aria-labelledby="about-title"
        >
          <div className="folio-container about-grid">
            <div>
              <p className="folio-label">04 / ABOUT</p>
              <h2 id="about-title">
                Rooted in curiosity.
                <br />
                <span>Driven to build.</span>
              </h2>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                Software engineering, with a founder’s perspective.
              </p>
              <p>
                I’m a fifth-year Software Engineering student at Adama Science
                and Technology University and founder of IFAA TECHNOLOGIES.
                Based in Adama, Ethiopia, I’m building useful digital products
                for local needs with a wider perspective.
              </p>
              <p>
                My interests span backend systems, cloud delivery, and
                AI-assisted development. I value clear communication,
                maintainable code, and small iterations that solve a real
                problem.
              </p>
              <div className="about-facts">
                <div>
                  <span className="folio-label">EDUCATION</span>
                  <p>
                    {aboutContent?.education_text_en ||
                      "BSc in Software Engineering · In progress"}
                  </p>
                </div>
                <div>
                  <span className="folio-label">INTERNSHIP & TEAMWORK</span>
                  <p>
                    Internship contribution to OpsFlow’s document-management
                    module, alongside independent product and AI projects.{" "}
                    <Link href="/projects">Explore the project library ↗</Link>
                  </p>
                </div>
              </div>
              <p className="profile-languages">
                Working languages: {profileContext.languages.join(" · ")}
              </p>
            </div>
          </div>
        </section>
        {posts.length > 0 && (
          <section
            id="blog"
            className="folio-section studio-notes"
            aria-labelledby="notes-title"
          >
            <div className="folio-container">
              <div className="section-heading">
                <div>
                  <p className="folio-label">ENGINEERING NOTES</p>
                  <h2 id="notes-title">
                    Lessons from <span>the work.</span>
                  </h2>
                </div>
                <Link href="/blog" className="folio-text-link">
                  All writing
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <div className="notes-grid">
                {posts.slice(0, 2).map((post) => (
                  <article key={post.id}>
                    <span className="folio-label">
                      {post.tags?.[0] || "ENGINEERING"}
                    </span>
                    <h3>
                      <Link href={`/blog/${post.slug}`}>{post.title_en}</Link>
                    </h3>
                    <p>{post.excerpt_en}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="folio-text-link"
                    >
                      Read the note
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
        {certificates.length > 0 && (
          <section
            id="certificates"
            className="folio-section credentials compact-credentials"
            aria-labelledby="credentials-title"
          >
            <div className="folio-container">
              <div className="section-heading">
                <div>
                  <p className="folio-label">CONTINUOUS LEARNING</p>
                  <h2 id="credentials-title">
                    Learning that <span>supports the work.</span>
                  </h2>
                </div>
                <Link href="/certificates" className="folio-text-link">
                  All credentials
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <div className="credential-list">
                {certificates.slice(0, 3).map((c) => (
                  <a
                    key={c.id}
                    href={c.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <span className="folio-label">
                        {credentialIssuer(c)}
                        {c.issued_at
                          ? ` · ${formatCredentialDate(c.issued_at)}`
                          : ""}
                      </span>
                      <h3>{c.title_en}</h3>
                    </div>
                    <ArrowUpRight size={22} aria-hidden="true" />
                    <span className="sr-only">
                      {" "}
                      (opens credential in a new tab)
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
        <ContactSection email={socialLinks?.email} />
      </main>
      <Footer socialLinks={socialLinks} />
    </div>
  );
}
