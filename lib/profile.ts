/** Owner-supplied professional context, October 2026. */
export const profileContext = {
  studyStage: "Fifth-year Software Engineering student",
  university: "Adama Science and Technology University",
  languages: ["English", "Afaan Oromo", "Amharic"],
  careerFocus:
    "Full-stack development with a backend and cloud engineering specialization",
  coursework: [
    "Senior Project I",
    "Introduction to Machine Learning",
    "Introduction to Natural Language Processing",
    "Software Evolution and Maintenance",
    "Entrepreneurship and Business Development",
    "Ethics and Professionalism in Computing",
  ],
  exploring: [
    "AWS & GCP",
    "DevSecOps & cybersecurity",
    "Kubernetes",
    "RAG evaluation",
    "Reliable agentic workflows",
  ],
} as const;

export const projectEvolution = [
  {
    name: "IFAA ENTRANCE",
    stages: [
      "Started with an Express and MongoDB application for examination preparation.",
      "Evolved toward NestJS, Prisma, and PostgreSQL, with a Next.js learning interface and AI-assisted explanations.",
      "Expanded into an offline-first ecosystem with a Flutter companion codebase, local SQLite persistence, and synchronization workflows.",
    ],
    lesson:
      "As a product grows, clear data contracts, assessment rules, and offline behavior become increasingly important.",
  },
  {
    name: "IFAA TECHNOLOGIES",
    stages: [
      "Established the company’s public identity, products, and services.",
      "Connected discovery with customer/admin workflows, then refined branding, domain consistency, and search discoverability.",
    ],
    lesson:
      "Business software connects a clear public presence with dependable operational workflows.",
  },
  {
    name: "OpsFlow",
    stages: [
      "Worked within an internship team on an institutional operations platform.",
      "Contributed document-management work through specifications, architecture planning, implementation, and university internship documentation.",
    ],
    lesson:
      "Team delivery depends on module ownership, shared contracts, and traceable acceptance criteria.",
  },
  {
    name: "AI engineering projects",
    stages: [
      "Explored document-context learning assistance in EduAI.",
      "Developed MCP tool integration and agent roles in Chimera, alongside evidence aggregation and retrieval in Automaton Auditor.",
    ],
    lesson:
      "Context, tools, orchestration, and evaluation need separate engineering attention.",
  },
] as const;
