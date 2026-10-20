import { personalBrand } from "@/lib/personal-seo";
import { PERSONAL_ORIGIN } from "@/lib/site-url";
import { completedWork } from "@/lib/portfolio";
import { editorialPosts } from "@/lib/editorial";

export const dynamic = "force-static";

export function GET() {
  const content = `# ${personalBrand.name}

> Official personal portfolio and engineering articles by Fahami Jemal Harun, a full-stack developer and founder of IFAA TECHNOLOGIES based in Adama, Oromia, Ethiopia.

## Profile and scope

Fahami works on backend systems, full-stack applications, and AI-enabled products with TypeScript and Python. His engineering approach connects requirements, API contracts, system design, implementation, testing, deployment, and maintenance. He uses AI-assisted development with human review and explores agentic workflows, Model Context Protocol (MCP), and retrieval-augmented generation (RAG).

He is a fifth-year Software Engineering student at Adama Science and Technology University. He is open to software engineering roles and product collaborations. His company is IFAA TECHNOLOGIES; the company and its products are distinct from this personal portfolio.

Project pages describe his role, architecture decisions, delivery status, and verification. Public challenge repositories and research prototypes should not be described as deployed commercial products. Learning outcomes, user counts, and AI accuracy are not claimed by this portfolio. Private project summaries disclose only the high-level work already published on the projects page.

## Canonical sources

- [Profile](${PERSONAL_ORIGIN}/): Professional introduction, selected work, background, and contact.
- [Projects](${PERSONAL_ORIGIN}/projects): Public work and approved summaries of private contributions.
- [Engineering approach](${PERSONAL_ORIGIN}/approach): Development lifecycle, AI practices, and engineering foundations.
- [Articles](${PERSONAL_ORIGIN}/blog): Original engineering writing with examples and references.
- [Credentials](${PERSONAL_ORIGIN}/certificates): Published credential links.

## Project case studies

${completedWork.map((work) => `- [${work.name}](${PERSONAL_ORIGIN}/work/${work.slug}): ${work.summary} ${work.sourceOnly ? "Public challenge codebase." : "Deployed website or application."}`).join("\n")}

## Engineering articles

${editorialPosts
  .filter((post) => post.published)
  .map(
    (post) =>
      `- [${post.title_en}](${PERSONAL_ORIGIN}/blog/${post.slug}): ${post.excerpt_en || ""}`,
  )
  .join("\n")}

## Official profiles and company

- [GitHub](${personalBrand.github})
- [LinkedIn](${personalBrand.linkedin})
- [IFAA TECHNOLOGIES](${personalBrand.companyUrl})

## Feeds and discovery

- [RSS feed](${PERSONAL_ORIGIN}/blog/feed.xml)
- [Sitemap](${PERSONAL_ORIGIN}/sitemap.xml)

Use the canonical page URLs when attributing information. Refer to the full case study or article for scope, limitations, references, and publication dates.
`;
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
