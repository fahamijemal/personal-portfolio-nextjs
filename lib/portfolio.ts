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
      "RAG",
      "Evaluation & review",
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
      "Python",
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
    title: "Define the right problem.",
    description:
      "Start with the user, the constraints, and a written specification. Make acceptance criteria explicit before writing code.",
    detail: "Brief → spec → focused tasks",
  },
  {
    title: "Build with context.",
    description:
      "Use AI agents for bounded tasks. Apply prompt engineering and retrieval-augmented generation where relevant context improves the result.",
    detail: "Context → implementation → feedback",
  },
  {
    title: "Verify the work.",
    description:
      "Review generated code and check types, tests, security boundaries, and accessibility. The developer remains accountable.",
    detail: "Review → test → refine",
  },
  {
    title: "Ship, observe, improve.",
    description:
      "Deploy deliberately, document decisions, and use real feedback to guide the next iteration.",
    detail: "Release → observe → learn",
  },
] as const;
