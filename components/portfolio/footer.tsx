import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSocialLinkUrls, type SocialLinks } from "@/lib/site-content";

export function Footer({ socialLinks }: { socialLinks?: SocialLinks | null }) {
  const urls = getSocialLinkUrls(socialLinks);
  return (
    <footer className="portfolio-footer">
      <div className="folio-container footer-top">
        <Link href="/" className="folio-wordmark">
          fahami<span>.</span>
        </Link>
        <p>Thoughtful software. Human direction.</p>
        <a
          href="https://www.ifaatechnologies.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          IFAA TECHNOLOGIES <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <div className="folio-container footer-bottom">
        <p>© {new Date().getFullYear()} Fahami Jemal Harun</p>
        <nav aria-label="Footer navigation">
          <a href={urls.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={urls.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <Link href="/blog">Writing</Link>
          <Link href="/certificates">Credentials</Link>
        </nav>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  );
}
