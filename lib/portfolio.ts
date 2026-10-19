/** Public portfolio facts supplied by the owner and supported by the project repositories. */
export type PortfolioWork = {
  slug: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  role: string;
  url: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  imageNote: string;
  stack: readonly string[];
  brief: string;
  scope: readonly (readonly [string, string])[];
  outcome: string;
  boundary: string;
  sourceOnly?: boolean;
};
export const completedWork: readonly PortfolioWork[] = [
  {
    slug: "ifaa-entrance",
    number: "01",
    name: "IFAA ENTRANCE",
    category: "Education platform",
    summary:
      "A place for Ethiopian students to practice, understand, and prepare for national examinations.",
    role: "Founder & developer",
    url: "https://entrance.ifaatechnologies.tech/en",
    image: "/work/ifaa-entrance.webp",
    imageWidth: 1280,
    imageHeight: 961,
    imageAlt:
      "The real IFAA ENTRANCE public website describing exam practice and learning features.",
    imageNote: "Public platform features · captured October 15, 2026",
    stack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "AI integration"],
    brief:
      "Bring exam preparation into one accessible product, with organized questions, practice workflows, and support for learning beyond a single session.",
    scope: [
      [
        "Learning experience",
        "Subject and exam practice, timed sessions, progress views, and AI-assisted explanations.",
      ],
      [
        "Product engineering",
        "A multilingual Next.js frontend connected to a NestJS API, with role-based workspaces and offline support.",
      ],
      [
        "AI-assisted development",
        "Specification-led tasks, contextual prompts, code review, and regression checks throughout development.",
      ],
    ],
    outcome:
      "A deployed education product with a public introduction and a separate application for students and administrators.",
    boundary:
      "The public site describes product capabilities. Student counts, learning outcomes, and AI answer accuracy are not independently measured here.",
  },
  {
    slug: "ifaa-technologies",
    number: "02",
    name: "IFAA TECHNOLOGIES",
    category: "Company website & platform",
    summary:
      "A home for the company’s products, services, and client relationships — built with clarity and purpose.",
    role: "Founder & developer",
    url: "https://www.ifaatechnologies.tech/",
    image: "/work/ifaa-technologies.webp",
    imageWidth: 1440,
    imageHeight: 1020,
    imageAlt: "The actual IFAA TECHNOLOGIES company website homepage.",
    imageNote: "Company website · public homepage",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Playwright"],
    brief:
      "Give a growing technology company a clear public identity and connect its products, services, inquiries, and client work in one platform.",
    scope: [
      [
        "Company presence",
        "Product showcases, service pages, founder identity, original content, and search metadata.",
      ],
      [
        "Application workflows",
        "Customer and administrator workspaces for projects, inquiries, conversations, and published content.",
      ],
      [
        "Quality and boundaries",
        "Database policies, accessibility checks, responsive browser tests, and explicit account permissions.",
      ],
    ],
    outcome:
      "A deployed company website and application codebase connecting public discovery with protected customer and administration workflows.",
    boundary:
      "Local integration tests exercise isolated fixtures. They do not establish the current state of hosted accounts, production email delivery, or client outcomes.",
  },
  {
    slug: "project-chimera",
    number: "03",
    name: "Project Chimera",
    category: "MCP & agent orchestration",
    role: "Developer · AI challenge project",
    summary:
      "A specification-led agent workflow connecting planning, execution, and review through explicit MCP tools.",
    url: "https://github.com/fahamijemal/Chimera",
    sourceOnly: true,
    image: "/work/chimera-architecture.svg",
    imageWidth: 1200,
    imageHeight: 800,
    imageAlt:
      "Architecture overview: a specification guides planner, worker, and judge roles; the worker connects to tools through MCP.",
    imageNote: "Architecture illustration based on the public repository",
    stack: ["Python", "MCP", "Gemini", "Spec-driven development"],
    brief:
      "Explore how a high-level goal can become a tool-using agent workflow with explicit responsibilities and a written specification.",
    scope: [
      [
        "Agent roles",
        "Planner, worker, and judge components separate task decomposition, execution, and review.",
      ],
      [
        "Tool integration",
        "An MCP client connects to tool servers and exposes tool calls and resource reads.",
      ],
      [
        "Development workflow",
        "Specifications and task boundaries guide implementation, with repository tests for agent and integration behavior.",
      ],
    ],
    outcome:
      "A public challenge codebase with agent components, MCP connections, specifications, and an autonomous-loop demonstration script.",
    boundary:
      "Challenge implementation; external tool availability and model output quality depend on runtime configuration.",
  },
] as const;

export const capabilities = [
  {
    number: "01",
    title: "AI-assisted engineering",
    description:
      "Directing agents with useful context, clear boundaries, and a human review loop.",
    tags: [
      "Agentic AI",
      "Prompt engineering",
      "Context engineering",
      "MCP tool integration",
      "LangGraph orchestration",
      "RAG",
      "Structured outputs & evaluation",
    ],
  },
  {
    number: "02",
    title: "Full-stack development",
    description:
      "Connecting considered interfaces to dependable APIs and application logic.",
    tags: [
      "TypeScript",
      "Next.js & React",
      "Node.js & NestJS",
      "Python & Django",
      "REST APIs",
    ],
  },
  {
    number: "03",
    title: "Systems & delivery",
    description:
      "Thinking beyond the feature: data, permissions, deployment, and maintainability.",
    tags: ["PostgreSQL", "Supabase", "Docker", "CI/CD", "Cloud deployment"],
  },
  {
    number: "04",
    title: "Product & entrepreneurship",
    description:
      "Turning a useful idea into a scoped product, then learning from what ships.",
    tags: [
      "Product discovery",
      "Technical planning",
      "User experience",
      "Iteration",
      "Founder mindset",
    ],
  },
] as const;

export const developmentProcess = [
  {
    title: "Discover & specify.",
    description:
      "Understand the user, business goal, and constraints. Translate the problem into user stories, a scoped specification, and testable acceptance criteria.",
    detail: "Deliverables: brief · backlog · acceptance criteria",
    practices:
      "Clarify functional and non-functional requirements, identify risks, and prioritize a small useful release. Keep the specification connected to implementation tasks.",
  },
  {
    title: "Design the system.",
    description:
      "Plan interfaces, data models, API contracts, and permission boundaries before implementation. Record the tradeoffs that affect reliability and future change.",
    detail: "Deliverables: architecture · schema · API contract",
    practices:
      "Use separation of concerns, clear module responsibilities, and database constraints. Consider accessibility, failure states, threat scenarios, and deployment needs early.",
  },
  {
    title: "Implement with context.",
    description:
      "Build in small, reviewable changes. Give AI agents a specification, relevant repository context, bounded tools, and a clear definition of done.",
    detail: "Deliverables: working increments · reviewed changes",
    practices:
      "Use prompt and context engineering, MCP where tool integration helps, and retrieval when source material is needed. Review generated code; keep secrets outside prompts and repositories.",
  },
  {
    title: "Test & evaluate.",
    description:
      "Check behavior against acceptance criteria with appropriate unit, integration, and browser tests. Review security, accessibility, and AI outputs alongside code quality.",
    detail: "Deliverables: test results · evaluation cases",
    practices:
      "Exercise unhappy paths and authorization boundaries. For AI features, check grounding, output schemas, prompt-injection exposure, and fallback behavior; compare results with representative examples.",
  },
  {
    title: "Release deliberately.",
    description:
      "Use version control and automated checks to prepare a reproducible release. Verify configuration, database changes, and the deployed user journey.",
    detail: "Deliverables: release · smoke checks · rollback plan",
    practices:
      "Keep environment configuration separate, use least-privilege credentials, and plan reversible migrations. Document what changed and confirm key workflows after deployment.",
  },
  {
    title: "Observe & improve.",
    description:
      "Use errors, performance signals, and user feedback to guide maintenance. Update documentation and specifications as the product evolves.",
    detail: "Deliverables: fixes · learning · next iteration",
    practices:
      "Investigate failures, maintain dependencies, and revisit assumptions. For AI workflows, track quality, latency, and cost; adjust prompts, retrieval, and models based on evidence.",
  },
] as const;

export const engineeringFoundations = [
  {
    title: "Problem solving & design",
    description:
      "Data structures, algorithms, object-oriented design, and problem decomposition inform how I structure application logic and reason about tradeoffs.",
    tags: ["Data structures & algorithms", "OOP", "Problem solving"],
  },
  {
    title: "Software design & teamwork",
    description:
      "Connecting requirements to maintainable code through modular design, API contracts, Git collaboration, and clear technical documentation.",
    tags: [
      "Requirements engineering",
      "Separation of concerns",
      "Agile iteration",
    ],
  },
  {
    title: "Reliable application systems",
    description:
      "Applying database modeling, authentication, authorization, validation, and testing across backend services and full-stack applications.",
    tags: ["Relational data modeling", "RBAC", "Testing & debugging"],
  },
] as const;

/** Public source projects reviewed October 19, 2026; no deployment or performance claims. */
export const githubWork = [
  {
    name: "Project Chimera",
    kind: "Agent orchestration · public source",
    repo: "Chimera",
    description:
      "A planner, worker, and judge architecture with MCP clients and tool servers. Explores agent orchestration through a specification-led development workflow.",
    tags: ["Python", "MCP", "Multi-agent systems", "Spec-driven development"],
  },
  {
    name: "Automaton Auditor",
    kind: "AI evaluation · public source",
    repo: "automaton-auditor",
    description:
      "A LangGraph audit workflow that combines repository and document evidence, parallel reviewer roles, structured outputs, and rule-based synthesis. Includes PDF chunking and keyword retrieval.",
    tags: ["LangGraph", "Gemini", "Retrieval", "Structured outputs"],
  },
  {
    name: "EduAI Assistant",
    kind: "AI learning platform · public source",
    repo: "eduai-assistant",
    description:
      "A full-stack learning assistant with document-context questions, summaries, comparisons, and quiz generation using Gemini, React, Express, and MongoDB.",
    tags: ["React", "Express", "MongoDB", "Context engineering"],
  },
  {
    name: "ASTU Smart Complaints API",
    kind: "Backend engineering · academic project",
    repo: "astu-smart-complaints-backend",
    description:
      "A TypeScript API for complaint tracking, with role-based workflows, authentication, notifications, and OpenAPI documentation. Built around PostgreSQL and Redis.",
    tags: ["TypeScript", "PostgreSQL", "Redis", "OpenAPI"],
  },
  {
    name: "OroHandwriting",
    kind: "Research & prototype",
    repo: "orohandwriting",
    description:
      "Afaan Oromo handwriting recognition research with CRNN/CTC and TrOCR model code, preprocessing, and a FastAPI/React interface. Explores local-language educational record digitization.",
    tags: ["Python", "CRNN / CTC", "OCR", "FastAPI"],
  },
] as const;

export const aiPractices = [
  {
    title: "Agents & MCP",
    description:
      "I use specifications and repository context to guide agents, and explore MCP for explicit tool connections. My practice is to keep tasks bounded, inspect tool inputs and outputs, and review changes before release.",
  },
  {
    title: "Retrieval & grounded answers",
    description:
      "My document-based AI work covers extraction, chunking, and retrieval. Automaton Auditor selects evidence with keyword retrieval; EduAI supplies document context to Gemini. Evaluation priorities include grounding, source attribution, and representative questions.",
  },
  {
    title: "Evaluation & human judgment",
    description:
      "Structured outputs and reviewer roles make AI workflows easier to inspect. I aim to test representative and failure cases, verify claims against sources, and consider latency and cost alongside output quality.",
  },
] as const;

/** Owner-authorized high-level summaries of private source. No private URLs or code. */
export const privateWork = [
  {
    name: "OpsFlow — Document Management",
    kind: "Team project · private source",
    role: "Internship contributor · document management",
    description:
      "Contributed the document-management module within a team-built institutional operations platform. The shared workflow connects specifications, implementation tasks, and acceptance checks.",
    tags: ["Next.js", "NestJS", "Prisma", "Spec-driven development"],
  },
  {
    name: "Smart Pharmacy Locator API",
    kind: "Backend project · private source",
    role: "Backend development",
    description:
      "A pharmacy discovery and medicine price-comparison API with location-based search, inventory workflows, role-based access, and API documentation.",
    tags: ["TypeScript", "Express", "PostgreSQL / PostGIS", "OpenAPI"],
  },
  {
    name: "IFAA ENTRANCE Mobile",
    kind: "Mobile companion · private source",
    role: "Product development",
    description:
      "A Flutter companion codebase for exam practice, study cards, progress views, and offline data. Uses local persistence and API synchronization; app-store release is a separate milestone.",
    tags: ["Flutter", "Dart", "Riverpod", "SQLite"],
  },
] as const;

export const caseStudyDetails: Record<
  string,
  {
    contribution: string;
    decision: string;
    tradeoff: string;
    architecture: readonly string[];
    verification: readonly string[];
    lesson: string;
  }
> = {
  "ifaa-entrance": {
    contribution:
      "Founder and developer across the product experience, frontend/API integration, and specification-led delivery.",
    decision:
      "Separate question delivery, session rules, and AI-provider integration behind explicit module boundaries.",
    tradeoff:
      "The platform evolved from Express/MongoDB toward a modular NestJS, Prisma, and PostgreSQL architecture. AI provider adapters support changes in model services, while server-owned session rules keep scoring and answer integrity outside the client. Offline clients add synchronization contracts to maintain.",
    architecture: [
      "Next.js learning interface",
      "NestJS application API",
      "PostgreSQL persistence · Redis cache",
      "AI provider adapter",
    ],
    verification: [
      "Frontend regression and accessibility checks are represented in the repository workflow.",
      "Backend tests and typed contracts exercise application modules; session behavior and authorization need checks at their boundaries.",
      "Offline persistence and reconnection require separate end-to-end scenarios.",
    ],
    lesson:
      "Offline learning and server-owned assessment rules need a clear synchronization contract. AI explanations belong beside the learning workflow, with explicit failure states.",
  },
  "ifaa-technologies": {
    contribution:
      "Founder and developer of the public company presence and its customer/administration application workflows.",
    decision:
      "Use one Next.js application for public discovery and protected workspaces, with permissions enforced at the data boundary.",
    tradeoff:
      "A shared codebase keeps publishing and customer workflows close together. It also makes access policies and public/private query boundaries essential.",
    architecture: [
      "Public product & service pages",
      "Protected customer/admin workspaces",
      "Supabase authentication",
      "PostgreSQL policies & storage",
    ],
    verification: [
      "Read-only local fixtures exercise public-content and authentication boundaries.",
      "Playwright checks cover responsive navigation and application interactions.",
      "Accessibility checks cover public pages; hosted accounts and delivery services need environment-specific checks.",
    ],
    lesson:
      "Clear permission boundaries and realistic failure states matter as much as the public-facing design. Publishing and protected workflows need independent regression coverage.",
  },
  "project-chimera": {
    contribution:
      "Developed a Python challenge implementation exploring agent roles, MCP tool connections, and specification-led tasks.",
    decision:
      "Use MCP as the explicit interface between agent execution and external tools.",
    tradeoff:
      "Tool contracts make integration easier to inspect and extend. They also introduce connection lifecycles, argument validation, and error handling that agents must handle deliberately.",
    architecture: [
      "Specification & goal",
      "Planner → worker → judge",
      "MCP client & tool contracts",
      "News / image tool servers",
    ],
    verification: [
      "The repository contains agent, logic, and integration test suites.",
      "The MCP client validates selected tool arguments and returns explicit failure results.",
      "An autonomous-loop script provides a runnable demonstration when model and tool services are configured.",
    ],
    lesson:
      "Agent autonomy becomes easier to reason about when responsibilities, context, tool contracts, and review criteria are explicit. A working tool call alone does not establish output quality.",
  },
};

export function isReviewedArchiveProject(project: {
  title_en: string;
  github_url?: string | null;
  live_url?: string | null;
}) {
  return (
    !["e-commerce platform", "cloud task manager"].includes(
      project.title_en.toLowerCase(),
    ) && Boolean(project.github_url || project.live_url)
  );
}
