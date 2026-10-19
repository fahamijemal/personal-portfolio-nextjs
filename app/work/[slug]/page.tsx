import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { completedWork } from "@/lib/portfolio";
import {
  personalBrand,
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
  const next = completedWork.find((item) => item.slug !== slug)!;
  return (
    <div className="case-study">
      <Header />
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
              <dd>Deployed website / application</dd>
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
            Visit the website <ArrowUpRight size={17} aria-hidden="true" />
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
            <h2>What shipped.</h2>
            <div>
              <p>{work.outcome}</p>
              <p className="case-boundary">{work.boundary}</p>
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
              description: work.summary,
              url: work.url,
              author: { "@id": personalBrand.personId },
              publisher: { "@id": personalBrand.companyId },
              mainEntityOfPage: `${PERSONAL_ORIGIN}/work/${work.slug}`,
              inLanguage: "en",
            }),
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
