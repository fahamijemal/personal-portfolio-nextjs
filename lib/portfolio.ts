/** Public portfolio facts supplied by the owner and supported by the project repositories. */
export const completedWork = [
  {
    slug: "ifaa-entrance",
    number: "01",
    name: "IFAA ENTRANCE",
    category: "Education platform",
    summary:
      "A place for Ethiopian students to practice, understand, and prepare for national examinations.",
    role: "Founder & developer",
    url: "https://entrance.ifaatechnologies.tech/en",
    image: "/work/ifaa-entrance.png",
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
    image: "/work/ifaa-technologies.png",
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
    tags: ["PostgreSQL", "Supabase", "Docker", "CI/CD", "Cloud foundations"],
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
    title: "Computer science foundations",
    description:
      "Building on my Software Engineering studies and programming practice: data structures, algorithms, object-oriented programming, and problem decomposition.",
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
    kind: "Agentic AI · challenge project",
    repo: "Chimera",
    description:
      "A planner, worker, and judge architecture with MCP clients and tool servers. Explores agent orchestration through a specification-led development workflow.",
    tags: ["Python", "MCP", "Multi-agent systems", "Spec-driven development"],
  },
  {
    name: "Automaton Auditor",
    kind: "AI evaluation · challenge project",
    repo: "automaton-auditor",
    description:
      "A LangGraph audit workflow that combines repository and document evidence, parallel reviewer roles, structured outputs, and rule-based synthesis. Includes PDF chunking and keyword retrieval.",
    tags: ["LangGraph", "Gemini", "Retrieval", "Structured outputs"],
  },
  {
    name: "EduAI Assistant",
    kind: "Applied AI · learning project",
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
      "I’m developing RAG skills through document extraction, chunking, and retrieval. Automaton Auditor uses keyword retrieval; EduAI supplies document context to Gemini. I’m extending this foundation toward better retrieval evaluation and source attribution.",
  },
  {
    title: "Evaluation & human judgment",
    description:
      "Structured outputs and reviewer roles make AI workflows easier to inspect. I aim to test representative and failure cases, verify claims against sources, and consider latency and cost alongside output quality.",
  },
] as const;
