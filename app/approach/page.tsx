import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import {
  developmentProcess,
  engineeringFoundations,
  aiPractices,
} from "@/lib/portfolio";
import { publicPageMetadata } from "@/lib/personal-seo";
export const metadata = publicPageMetadata({
  title: "Engineering Approach & Software Development Lifecycle",
  description:
    "How Fahami Jemal Harun connects requirements, system design, agentic AI, testing, release, and maintenance.",
  path: "/approach",
});
export default function ApproachPage() {
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
            <p className="folio-label">ENGINEERING APPROACH</p>
            <h1>
              Good engineering <span>leads.</span>
            </h1>
            <p>
              A practical software development lifecycle I keep refining through
              study, product work, and AI-assisted development.
            </p>
          </div>
        </div>
        <section
          className="folio-section approach"
          aria-labelledby="lifecycle-title"
        >
          <div className="folio-container">
            <h2 id="lifecycle-title">From requirements to maintenance.</h2>
            <ol className="process-grid">
              {developmentProcess.map((step, i) => (
                <li key={step.title}>
                  <span className="process-number">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <span className="process-detail">{step.detail}</span>
                  <details className="process-practices">
                    <summary>Explore the practices</summary>
                    <p>{step.practices}</p>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <div className="folio-container">
          <section className="folio-section">
            <div className="section-heading">
              <div>
                <p className="folio-label">AI ENGINEERING</p>
                <h2>
                  Context. Tools. <span>Evaluation.</span>
                </h2>
              </div>
            </div>
            <div className="foundation-grid">
              {aiPractices.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
            <div className="practice-evidence">
              <Link href="/work/project-chimera">MCP in Project Chimera ↗</Link>
              <a
                href="https://github.com/fahamijemal/automaton-auditor"
                target="_blank"
                rel="noopener noreferrer"
              >
                LangGraph and retrieval in Automaton Auditor ↗
              </a>
              <a
                href="https://github.com/fahamijemal/eduai-assistant"
                target="_blank"
                rel="noopener noreferrer"
              >
                Document context in EduAI ↗
              </a>
            </div>
          </section>
          <section className="folio-section foundations-section">
            <p className="folio-label">SOFTWARE ENGINEERING FOUNDATIONS</p>
            <h2>The thinking behind the tools.</h2>
            <div className="foundation-grid">
              {engineeringFoundations.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul className="folio-tags">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <div className="collection-cta">
            <h2>See the decisions in practice.</h2>
            <Link href="/projects" className="folio-button">
              Explore the work
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
