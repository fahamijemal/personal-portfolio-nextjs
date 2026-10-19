import type { BlogPost } from "@/lib/types";

/** Repository-maintained engineering notes; CMS entries remain available. */
export const editorialPosts: BlogPost[] = [
  {
    id: "note-mcp",
    slug: "mcp-tool-contracts-in-project-chimera",
    title_en: "What an MCP tool connection needs beyond a prompt",
    title_om: null,
    excerpt_en:
      "Connection lifecycle, argument contracts, and failure handling from the Project Chimera codebase.",
    excerpt_om: null,
    published: true,
    published_at: "2026-10-19T00:00:00Z",
    tags: ["MCP", "Agentic AI"],
    content_en: `## Start with a bounded task

In [Project Chimera](https://github.com/fahamijemal/Chimera), the planner, worker, and judge have different responsibilities. The worker connects to tools through an MCP client. This separation gives a task a place to be defined, executed, and reviewed.

A useful specification says what the tool may do, the input it needs, and what counts as success. An instruction such as “research a topic” is too broad to serve as that contract.

## Treat the connection as application code

The Python client starts a tool-server process, opens a client session, and initializes it before calling tools. The connection also needs cleanup. Model Context Protocol standardizes the interaction; the surrounding application still owns process lifetimes and error handling.

The repository client uses an asynchronous exit stack to manage its connection resources. That is an important distinction between describing a tool in a prompt and integrating it into a running application.

## Validate arguments and expose failures

The client checks required fields for selected tools and returns an explicit failure result when execution raises an error. Those checks are a starting point. A more complete implementation should validate every tool against its declared schema, bound execution time, and distinguish retryable service failures from invalid requests.

Treat tool output as data to inspect. A successful network response does not establish factual accuracy or permission to take another action.

## Keep review separate from execution

A reviewer needs acceptance criteria and evidence: the requested inputs, the tool result, and the change the worker proposes. For actions that affect external systems, permissions and human approval should match the action’s impact.

This challenge explores that architecture. It does not establish a general-purpose autonomous production service. The next useful engineering step is evaluation with representative tasks, predictable failure cases, and checks that can explain why a result was accepted.

## A practical checklist

- Define a small task and its expected output.
- Validate tool arguments against a schema.
- Manage initialization, timeouts, and cleanup.
- Inspect failures instead of silently retrying every error.
- Evaluate the result separately from tool-call success.

[Explore the source](https://github.com/fahamijemal/Chimera) or [read the project case study](/work/project-chimera).`,
  },
  {
    id: "note-retrieval",
    slug: "document-context-and-retrieval",
    title_en: "Document context and retrieval solve different problems",
    title_om: null,
    excerpt_en:
      "Lessons from EduAI Assistant and Automaton Auditor: supplying a document, selecting passages, and evaluating the answer.",
    excerpt_om: null,
    published: true,
    published_at: "2026-10-19T00:00:00Z",
    tags: ["RAG", "Evaluation"],
    content_en: `## Begin with the question and source

A document-based assistant needs two things: relevant material and a response that stays grounded in that material. These are separate engineering problems.

In [EduAI Assistant](https://github.com/fahamijemal/eduai-assistant), document text is supplied as context to Gemini for questions, summaries, comparisons, and quizzes. This is a useful document-context workflow. It does not, by itself, imply a vector-search retrieval system.

## Retrieval selects the material

[Automaton Auditor](https://github.com/fahamijemal/automaton-auditor) extracts PDF text, splits it into overlapping chunks, and ranks passages using keyword overlap. This is a transparent retrieval baseline: a query and its selected passages are easy to inspect.

Keyword retrieval has limits. A relevant passage can use different words from the query, while an irrelevant passage can repeat the same words. Chunk boundaries can also split information that belongs together.

## Improve one stage at a time

Before introducing embeddings or reranking, collect example questions and the passages that should support them. Check whether those passages appear among the retrieved results. Then evaluate whether the generated answer uses them correctly.

This separates retrieval quality from answer quality. Changing the model cannot reliably fix a pipeline that never supplies the needed evidence.

## Plan for missing evidence

A useful assistant should be able to say that the available material does not support an answer. Source references, clear uncertainty, and a stable fallback are preferable to a confident unsupported response.

Documents can also contain instructions that should not control application behavior. Keep source content separate from system instructions and restrict any tools available to the answer-generation step.

## My next iteration

I’m developing this practice toward better source attribution and representative retrieval evaluation. The next comparison should measure a simple keyword baseline against an alternative retriever using the same questions, source set, and acceptance criteria.

Track correctness and grounding alongside latency and cost. A more complex pipeline should justify itself through evidence.

[Explore my engineering approach](/approach).`,
  },
  {
    id: "note-cloud",
    slug: "getting-started-with-cloud-computing",
    title_en: "Getting Started with Cloud Computing",
    title_om: null,
    excerpt_en:
      "A practical introduction to hosting a web application: compute, storage, databases, permissions, and release checks.",
    excerpt_om: null,
    published: true,
    published_at: "2026-02-17T00:00:00Z",
    tags: ["Cloud", "Delivery"],
    content_en: `## Think in application responsibilities

Cloud computing provides managed resources for running software. For a small web application, start with the responsibilities you need: serving the interface, executing backend logic, storing data, and observing failures.

A static website may need only a hosting service. An authenticated application may also need an API, a database, file storage, and a way to send transactional email. Add services because the application needs them.

## Separate compute, data, and files

Compute runs your application code. A database stores structured records and relationships. Object storage holds files such as images and documents. These have different access rules, backup needs, and costs.

For a Next.js application, decide which operations run in the browser and which run on the server. Database administration keys and email-provider credentials belong on the server. A public environment-variable prefix is a publishing decision, so inspect it carefully.

## Make configuration explicit

Keep separate configuration for local development, testing, and production. Validate required values at startup where practical. Use least-privilege credentials and avoid copying production data into test fixtures.

A reproducible build is valuable even when the hosting platform automates deployment. Document the runtime version, package manager, build command, and required variables.

## Release with a small checklist

- Run the relevant type, behavior, and build checks.
- Review migrations and access policies.
- Verify application URLs and authentication callbacks.
- Check logs for startup errors.
- Exercise a real user journey after release.
- Keep a rollback path for application and data changes.

## Observe cost and reliability

Start with logs, error signals, and a few meaningful performance measures. Watch database connection limits, storage growth, and external API usage. A free service tier is useful for exploration, but its limits still belong in your deployment plan.

Learn one platform through a small application before expanding the architecture. The goal is a service you can explain, operate, and improve.

[See the software development lifecycle I follow](/approach).`,
  },
];

export function mergeEditorialPosts(
  posts: BlogPost[],
  tag?: string,
): BlogPost[] {
  const merged = [
    ...editorialPosts,
    ...posts.filter((p) => !editorialPosts.some((e) => e.slug === p.slug)),
  ];
  return merged
    .filter((p) => !tag || p.tags?.includes(tag))
    .sort((a, b) => (b.published_at || "").localeCompare(a.published_at || ""));
}
export function editorialPost(slug: string) {
  return editorialPosts.find((post) => post.slug === slug);
}
