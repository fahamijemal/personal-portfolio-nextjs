import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { completedWork } from "@/lib/portfolio";

export function SelectedWork({ collection = false }: { collection?: boolean }) {
  return (
    <section
      id="projects"
      className={`folio-section selected-work ${collection ? "work-collection" : ""}`}
      aria-labelledby="work-heading"
    >
      <div className="folio-container">
        <div className="section-heading">
          <div>
            <p className="folio-label">01 / SELECTED WORK</p>
            <h2 id="work-heading">
              Ideas made <span>real.</span>
            </h2>
          </div>
          <p>
            Products I’ve built and shipped.
            <br />
            Real work, with the thinking behind it.
          </p>
        </div>
        <div className="work-grid">
          {completedWork.map((work) => (
            <article className="work-card" key={work.slug}>
              <Link
                href={`/work/${work.slug}`}
                className={`work-image work-image-${work.slug}`}
                aria-label={`Read the ${work.name} case study`}
              >
                <div className="browser-chrome" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <small>{new URL(work.url).hostname}</small>
                </div>
                <Image
                  src={work.image}
                  alt={work.imageAlt}
                  width={work.imageWidth}
                  height={work.imageHeight}
                  sizes="(max-width: 760px) 100vw, 50vw"
                  className="work-screenshot"
                />
                <span className="work-image-arrow">
                  <ArrowUpRight size={22} aria-hidden="true" />
                </span>
              </Link>
              <div className="work-meta">
                <span>{work.category}</span>
                <span>{work.number}</span>
              </div>
              <h3>
                <Link href={`/work/${work.slug}`}>{work.name}</Link>
              </h3>
              <p className="work-summary">{work.summary}</p>
              <ul
                className="folio-tags"
                aria-label={`${work.name} technologies`}
              >
                {work.stack.slice(0, 4).map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="work-links">
                <Link href={`/work/${work.slug}`}>
                  Inside the project <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a href={work.url} target="_blank" rel="noopener noreferrer">
                  Visit website <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        {!collection && (
          <Link href="/projects" className="folio-text-link all-work">
            Explore the project archive{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}
