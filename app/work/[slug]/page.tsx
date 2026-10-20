import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { completedWork, caseStudyDetails } from "@/lib/portfolio";
import {
  personalBrand,
  publicPageGraph,
  publicPageMetadata,
  serializeStructuredData,
} from "@/lib/personal-seo";
import { PERSONAL_ORIGIN } from "@/lib/site-url";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return completedWork.map((work) => ({ slug: work.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const work = completedWork.find((work) => work.slug === slug);
  if (!work)
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  return publicPageMetadata({
    title: `${work.name} — Project Case Study`,
    description: work.summary,
    path: `/work/${work.slug}`,
  });
}
export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const work = completedWork.find((work) => work.slug === slug);
  if (!work) notFound();
  const next =
    completedWork[
      (completedWork.findIndex((item) => item.slug === slug) + 1) %
        completedWork.length
    ];
  const details = caseStudyDetails[slug];
  return (
    <div className="case-study">
      <Header />
      <StructuredData
        value={publicPageGraph({
          path: `/work/${work.slug}`,
          name: `${work.name} — Project case study`,
          description: work.summary,
          parent: { path: "/projects", name: "Software projects" },
          mainEntityId: `${PERSONAL_ORIGIN}/work/${work.slug}#project`,
        })}
      />
      <main id="main-content">
        <div className="folio-container case-hero">
          <Link href="/#projects" className="folio-text-link case-back">
            <ArrowLeft size={16} aria-hidden="true" />
            Selected work
          </Link>
          <p className="folio-label">
            PROJECT {work.number} / {work.category.toUpperCase()}
          </p>
          <h1>{work.name}</h1>
          <p className="case-summary">{work.summary}</p>
          <dl className="case-facts">
            <div>
              <dt className="folio-label">MY ROLE</dt>
              <dd>{work.role}</dd>
            </div>
            <div>
              <dt className="folio-label">DELIVERY</dt>
              <dd>
                {work.sourceOnly
                  ? "Public challenge codebase"
                  : "Deployed website / application"}
              </dd>
            </div>
            <div>
              <dt className="folio-label">FOCUS</dt>
              <dd>{work.category}</dd>
            </div>
          </dl>
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="folio-button"
          >
            {work.sourceOnly ? "Explore the source" : "Visit the website"}{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <figure className="case-preview">
            <Image
              src={work.image}
              alt={work.imageAlt}
              width={work.imageWidth}
              height={work.imageHeight}
              priority
              sizes="(max-width: 760px) 100vw, 1100px"
            />
            <figcaption>{work.imageNote}</figcaption>
          </figure>
        </div>
        <div className="folio-container">
          <section className="case-body">
            <h2>The brief.</h2>
            <p>{work.brief}</p>
          </section>
          <section className="case-body">
            <h2>My contribution.</h2>
            <p>{details.contribution}</p>
          </section>
          <section className="case-body">
            <h2>Architecture.</h2>
            <div>
              <p className="architecture-caption">Simplified system overview</p>
              <ol className="architecture-flow">
                {details.architecture.map((part, i) => (
                  <li key={part}>
                    <span className="folio-label">0{i + 1}</span>
                    {part}
                  </li>
                ))}
              </ol>
            </div>
          </section>
          <section className="case-body">
            <h2>A key decision.</h2>
            <div>
              <h3>{details.decision}</h3>
              <p>{details.tradeoff}</p>
            </div>
          </section>
          <section className="case-body">
            <h2>The work.</h2>
            <div>
              {work.scope.map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
              <ul className="folio-tags" aria-label="Project technologies">
                {work.stack.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </section>
          <section className="case-body">
            <h2>{work.sourceOnly ? "The implementation." : "What shipped."}</h2>
            <div>
              <p>{work.outcome}</p>
            </div>
          </section>
          <section className="case-body">
            <h2>Verification & learning.</h2>
            <div>
              <ul className="verification-list">
                {details.verification.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>What this reinforced</h3>
              <p>{details.lesson}</p>
            </div>
          </section>
          <div className="case-next">
            <Link href="/#contact" className="folio-text-link">
              Have something in mind?{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link href={`/work/${next.slug}`} className="folio-text-link">
              Next: {next.name} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "@id": `${PERSONAL_ORIGIN}/work/${work.slug}#project`,
              name: work.name,
              image: `${PERSONAL_ORIGIN}${work.image}`,
              about: work.stack.map((name) => ({ "@type": "Thing", name })),
              genre: work.category,
              description: work.summary,
              url: work.url,
              author: { "@id": personalBrand.personId },
              publisher: {
                "@id": work.sourceOnly
                  ? personalBrand.personId
                  : personalBrand.companyId,
              },
              mainEntityOfPage: {
                "@id": `${PERSONAL_ORIGIN}/work/${work.slug}#webpage`,
              },
              inLanguage: "en",
            }),
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
