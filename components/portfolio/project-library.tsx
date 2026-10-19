import { ArrowUpRight } from "lucide-react";
import { completedWork, githubWork, privateWork } from "@/lib/portfolio";

export function ProjectLibrary() {
  return (
    <>
      <div className="section-heading library-heading">
        <div>
          <p className="folio-label">PUBLIC SOURCE</p>
          <h2>
            Built to <span>explore.</span>
          </h2>
        </div>
        <p>
          AI challenges, learning tools, and backend engineering. Each links to
          its implementation.
        </p>
      </div>
      <div className="github-grid">
        {githubWork
          .filter(
            (project) =>
              !completedWork.some(
                (work) =>
                  work.url === `https://github.com/fahamijemal/${project.repo}`,
              ),
          )
          .map((project) => (
            <article key={project.repo}>
              <p className="folio-label">{project.kind}</p>
              <h3>
                <a
                  href={`https://github.com/fahamijemal/${project.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.name}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </h3>
              <p>{project.description}</p>
              <ul className="folio-tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
      </div>
      <div className="section-heading library-heading">
        <div>
          <p className="folio-label">PRIVATE-SOURCE WORK</p>
          <h2>
            More ways <span>of building.</span>
          </h2>
        </div>
        <p>
          High-level summaries of private projects, with my contribution and
          current scope.
        </p>
      </div>
      <div className="github-grid private-projects">
        {privateWork.map((project) => (
          <article key={project.name}>
            <p className="folio-label">{project.kind}</p>
            <h3>{project.name}</h3>
            <p className="project-role">{project.role}</p>
            <p>{project.description}</p>
            <ul className="folio-tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
