"use client";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { ContentImage } from "@/components/portfolio/content-image";
import { credentialIssuer, formatCredentialDate } from "@/lib/presentation";
import type { Certificate } from "@/lib/types";
import type { SocialLinks } from "@/lib/site-content";
export function CertificatesPageClient({
  certificates,
  socialLinks,
}: {
  certificates: Certificate[];
  socialLinks?: SocialLinks | null;
}) {
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
            <p className="folio-label">CONTINUOUS LEARNING</p>
            <h1>
              Foundations for <span>the work.</span>
            </h1>
            <p>
              Course credentials and training badges supporting my software
              engineering studies and project practice.
            </p>
          </div>
          <div className="credential-grid">
            {certificates.map((c) => (
              <article key={c.id}>
                <p className="folio-label">{credentialIssuer(c)}</p>
                <h2>{c.title_en}</h2>
                <ContentImage
                  src={c.image_url}
                  alt={`${c.title_en} credential preview`}
                  className="credential-preview"
                />
                {c.issued_at && (
                  <p className="credential-date">
                    Issued {formatCredentialDate(c.issued_at)}
                  </p>
                )}
                <a
                  href={c.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="folio-text-link"
                >
                  View credential
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </article>
            ))}
          </div>
          {certificates.length === 0 && (
            <p className="empty-state">
              Credentials will appear here as they are added.
            </p>
          )}
          <div className="collection-cta">
            <h2>See how I apply what I learn.</h2>
            <Link href="/projects" className="folio-button">
              Explore the projects
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <Footer socialLinks={socialLinks} />
    </div>
  );
}
