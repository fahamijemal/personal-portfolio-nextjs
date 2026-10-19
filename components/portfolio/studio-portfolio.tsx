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
import { capabilities, developmentProcess } from "@/lib/portfolio";
import { personalBrand } from "@/lib/personal-seo";
import {
  getSocialLinkUrls,
  type AboutContent,
  type SocialLinks,
} from "@/lib/site-content";
import type { BlogPost, Certificate, Skill } from "@/lib/types";

export function StudioPortfolio({
  posts,
  certificates,
  skills,
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
  const additionalTools = [...new Set(skills.map((skill) => skill.name))].slice(
    0,
    18,
  );
  return (
    <div className="studio">
      <Header />
      <main id="main-content">
        <section id="home" className="folio-hero">
          <div className="folio-container hero-grid">
            <div className="hero-copy">
              <p className="folio-label">
                <span className="status-dot" /> DEVELOPER · FOUNDER · PRODUCT
                BUILDER
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
                I turn ideas into practical software. Combining full-stack
                engineering, product thinking, and agentic AI — with clear
                specifications, thoughtful design, and a human review loop.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="folio-button">
                  Explore my work <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a href="#contact" className="folio-button secondary">
                  Let’s talk <ArrowUpRight size={18} aria-hidden="true" />
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
                    Resume
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
                    sizes="(max-width: 760px) 80vw, 360px"
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
          <div className="folio-container hero-bottom">
            <span>ENGINEERING × AI × ENTREPRENEURSHIP</span>
            <a href="#projects">
              A closer look at the work <span aria-hidden="true">↓</span>
            </a>
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
                <p className="folio-label">02 / EXPERTISE</p>
                <h2 id="expertise-title">
                  A builder’s <span>toolkit.</span>
                </h2>
              </div>
              <p>
                Strong foundations. Modern workflows.
                <br />
                The judgment to connect them.
              </p>
            </div>
            <div className="expertise-grid">
              {capabilities.map((item) => (
                <article key={item.number}>
                  <span className="folio-label">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul className="capability-list">
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <Check size={13} aria-hidden="true" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            {additionalTools.length > 0 && (
              <div className="additional-tools">
                <p className="folio-label">ALSO IN MY TOOLKIT</p>
                <ul className="folio-tags">
                  {additionalTools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
        <section
          id="approach"
          className="folio-section approach"
          aria-labelledby="approach-title"
        >
          <div className="folio-container">
            <div className="section-heading">
              <div>
                <p className="folio-label">03 / HOW I BUILD</p>
                <h2 id="approach-title">
                  AI moves fast.
                  <br />
                  <span>Good engineering leads.</span>
                </h2>
              </div>
              <p>
                I use agents to extend my work,
                <br />
                while keeping the decisions accountable.
              </p>
            </div>
            <ol className="process-grid">
              {developmentProcess.map((step, i) => (
                <li key={step.title}>
                  <span className="process-number">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <span className="process-detail">{step.detail}</span>
                </li>
              ))}
            </ol>
            <div className="process-principle">
              <span className="status-dot" />
              <p>
                Write the spec. Give the context. Review the code. Own the
                result.
              </p>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="folio-section about-studio"
          aria-labelledby="about-title"
        >
          <div className="folio-container about-grid">
            <div>
              <p className="folio-label">04 / A LITTLE ABOUT ME</p>
              <h2 id="about-title">
                Curiosity, with a bias for <span>building.</span>
              </h2>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                An engineer’s curiosity. An entrepreneur’s perspective.
              </p>
              <p>
                I’m a Software Engineering student and the founder of IFAA
                TECHNOLOGIES. I’m interested in the space where useful ideas,
                reliable systems, and real people meet.
              </p>
              <p>
                My focus spans backend development, cloud systems, and
                AI-assisted product development. I use spec-driven development,
                prompt and context engineering, and RAG to make the work more
                deliberate — then review and test what gets built.
              </p>
              <p>
                Based in Adama, Ethiopia, I’m building for local needs with a
                wider perspective. I value clear communication, small meaningful
                iterations, and software that earns its place in someone’s day.
              </p>
              <div className="about-facts">
                <div>
                  <span className="folio-label">CURRENTLY</span>
                  <p>
                    {aboutContent?.education_text_en ||
                      "Studying Software Engineering"}
                  </p>
                </div>
                <div>
                  <span className="folio-label">BUILDING</span>
                  <p>
                    Digital products through{" "}
                    <a href={personalBrand.companyUrl}>
                      IFAA TECHNOLOGIES{" "}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {certificates.length > 0 && (
          <section
            id="certificates"
            className="folio-section credentials"
            aria-labelledby="credentials-title"
          >
            <div className="folio-container">
              <div className="section-heading">
                <div>
                  <p className="folio-label">CONTINUOUS LEARNING</p>
                  <h2 id="credentials-title">
                    Always a <span>student.</span>
                  </h2>
                </div>
                <Link href="/certificates" className="folio-text-link">
                  All credentials <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <div className="credential-list">
                {certificates.slice(0, 4).map((c) => (
                  <a
                    key={c.id}
                    href={c.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <span className="folio-label">
                        {c.issuer || "Professional development"}
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
        {posts.length > 0 && (
          <section
            id="blog"
            className="folio-section studio-notes"
            aria-labelledby="notes-title"
          >
            <div className="folio-container">
              <div className="section-heading">
                <div>
                  <p className="folio-label">NOTES FROM THE WORK</p>
                  <h2 id="notes-title">
                    Learning, <span>out loud.</span>
                  </h2>
                </div>
                <Link href="/blog" className="folio-text-link">
                  All writing <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <div className="notes-grid">
                {posts.map((post) => (
                  <article key={post.id}>
                    <span className="folio-label">
                      {post.tags?.[0] || "ENGINEERING NOTES"}
                    </span>
                    <h3>
                      <Link href={`/blog/${post.slug}`}>{post.title_en}</Link>
                    </h3>
                    <p>{post.excerpt_en}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="folio-text-link"
                    >
                      Read the note{" "}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </article>
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
