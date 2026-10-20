import type { BlogPost } from "@/lib/types";

/** Published engineering articles; CMS entries with other slugs remain available. */
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
    tags: ["MCP", "Agentic AI", "AI Engineering"],
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

The challenge codebase provides an architectural example. To evaluate the workflow, use representative tasks, predictable failure cases, and explicit criteria for accepting the result. Keep tool availability, task completion, and answer quality as separate observations.

## A practical checklist

- Define a small task and its expected output.
- Validate tool arguments against a schema.
- Manage initialization, timeouts, and cleanup.
- Inspect failures instead of silently retrying every error.
- Evaluate the result separately from tool-call success.



## Design the result envelope before adding tools

An application-facing result should make the next step clear. For example, a tool operation might return a typed success value or an error category such as invalid input, unavailable service, or execution timeout. That classification gives the caller a basis for deciding whether to correct the request, retry within a budget, or stop.

Avoid returning a success label around unvalidated text and expecting every caller to infer what happened. Validate the result at the adapter boundary and preserve enough context to diagnose the operation without logging secrets or unnecessary user data.

## Test the lifecycle as well as the happy path

Useful integration cases include a server that cannot start, an initialization failure, an unknown tool name, invalid arguments, a timeout, and cleanup after cancellation. A retry should not create a second external action when the original outcome is uncertain.

The client is one part of a larger workflow. It needs a clear owner for connections, execution limits, and permissions. A small number of well-defined tools is easier to review than a large collection with overlapping responsibilities.

## References

- [Model Context Protocol documentation](https://modelcontextprotocol.io/docs/learn/architecture)
- [Project Chimera source](https://github.com/fahamijemal/Chimera)
- [Reliable AI features at the API boundary](/blog/reliable-ai-api-boundaries)
`,
    updated_at: "2026-10-20T00:00:00Z",
    takeaways: [
      "Define tool inputs, outputs, and failure behavior explicitly.",
      "Manage MCP connections and tool execution as application resources.",
      "Evaluate the result separately from whether a tool call succeeded.",
    ],
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
    tags: ["RAG", "Evaluation", "AI Engineering"],
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

## Compare retrievers against the same evidence

Use the same questions, source set, and acceptance criteria to compare a keyword baseline with an alternative retriever. This makes differences easier to attribute to retrieval behavior rather than a changing dataset or prompt.

Track correctness and grounding alongside latency and cost. A more complex pipeline should justify itself through evidence.



## Build a small evaluation record

Start with questions that have known supporting passages. Add questions that require more than one passage and questions the documents cannot answer. Keep a record of the query, relevant source identifiers, retrieved passages, generated answer, and review outcome.

| Stage | Question to inspect | Useful observation |
| --- | --- | --- |
| Ingestion | Did extraction preserve the source meaning? | Missing text, broken tables, or unusable pages |
| Retrieval | Did the required evidence reach the context? | Relevant passages among the selected results |
| Generation | Does the answer follow the evidence? | Supported claims and accurate source references |
| User experience | Is missing evidence understandable? | A clear explanation or a useful fallback |

Do not collapse all four stages into a single model score. An excellent answer to one question can hide an ingestion error elsewhere, and a retrieved passage can be relevant without supporting every claim in the answer.

Keep source versions with the evaluation record. When documents change, the expected answer may change as well. Review a sample of results manually before using a metric to guide a larger comparison.

## References

- [EduAI Assistant source](https://github.com/fahamijemal/eduai-assistant)
- [Automaton Auditor source](https://github.com/fahamijemal/automaton-auditor)
- [My engineering approach](/approach)
`,
    updated_at: "2026-10-20T00:00:00Z",
    takeaways: [
      "Evaluate retrieval separately from answer generation.",
      "Keep a keyword baseline and inspect the passages it selects.",
      "Use source attribution and missing-evidence cases in your evaluation set.",
    ],
  },
  {
    id: "note-cloud",
    slug: "getting-started-with-cloud-computing",
    title_en: "Cloud deployment starts with application boundaries",
    title_om: null,
    excerpt_en:
      "A practical introduction to hosting a web application: compute, storage, databases, permissions, and release checks.",
    excerpt_om: null,
    published: true,
    published_at: "2026-02-17T00:00:00Z",
    tags: ["Cloud", "Delivery", "Reliability"],
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



## Give each dependency an operational owner

For an authenticated application, a simple dependency map can expose gaps before deployment:

| Responsibility | Configuration to verify | Failure to exercise |
| --- | --- | --- |
| Application runtime | Version, build command, start command | Startup failure or missing variable |
| Database | Connections, migrations, access policies | Unavailable connection or rejected access |
| File storage | Bucket permissions and size limits | Missing file or unauthorized download |
| Email or model provider | Server-only credentials and timeouts | Provider rejection or delayed response |

The table is a starting point for a specific application. A public health endpoint can confirm that a process is running without demonstrating that every dependency or user workflow is working.

For database changes, think about application compatibility during the rollout. An older instance may still be serving requests when a newer version starts. Changes that preserve compatibility are easier to roll out than changes requiring every component to switch at exactly the same moment.

## Keep a useful release record

Record the deployed revision, migrations, configuration changes, and smoke-test outcome. If a release fails, that record narrows the investigation. A rollback plan should explain what happens to data created after the release, not only how to redeploy an older application image.

## References

- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [PostgreSQL backup and restore](https://www.postgresql.org/docs/current/backup.html)
- [The engineering lifecycle](/approach)
`,
    updated_at: "2026-10-20T00:00:00Z",
    takeaways: [
      "Separate compute, structured data, files, and external services.",
      "Keep credentials and environment configuration at the right boundary.",
      "Verify a user journey after deployment and retain a rollback path.",
    ],
  },
  {
    id: "note-contracts",
    slug: "specification-led-api-contracts",
    title_en: "Specification-led APIs: contracts you can test",
    title_om: null,
    excerpt_en:
      "Turn product requirements into explicit inputs, permissions, state changes, and acceptance tests before implementing an endpoint.",
    excerpt_om: null,
    published: true,
    published_at: "2026-10-20T00:00:00Z",
    updated_at: "2026-10-20T00:00:00Z",
    tags: ["API Design", "Software Engineering", "System Design"],
    takeaways: [
      "Specify behavior, permissions, and failure cases together.",
      "Use runtime validation alongside TypeScript types.",
      "Make retries and concurrency part of the acceptance criteria.",
    ],
    content_en: `## Begin with behavior someone can verify

A requirement such as “let users export a report” leaves important questions unanswered. Who may request it? Which filters are valid? What happens if the request is sent twice? How does the client learn that the export failed?

Specification-led development makes those decisions visible before implementation. The useful output is a small agreement about behavior: inputs, permissions, state changes, responses, and failure cases. That agreement gives the interface, API, and tests something shared to work toward.

This is the same principle behind the bounded tasks and explicit interfaces in [Project Chimera](/work/project-chimera). For an HTTP API, the contract must also account for persistence and callers that retry.

## Describe one operation precisely

Consider an asynchronous report export. A compact specification might say:

- An authenticated user can request an export for data they may access.
- The request specifies an approved format and a bounded date range.
- A successful request returns a job identifier and a way to inspect progress.
- Repeating an equivalent request with the same idempotency key returns the existing job.
- Reusing that key with different input produces a conflict.

The date range needs a defined timezone and ordering rule. File size and retention limits belong in the specification when they affect the user journey. Leaving them implicit moves the decision into whichever implementation happens to ship first.

## Separate types from validation

A TypeScript response type makes expectations visible inside the application:

\`\`\`typescript
type ExportJob = {
  id: string;
  status: "queued" | "running" | "complete" | "failed";
};

type CreateExportResponse = {
  job: ExportJob;
  statusUrl: string;
};
\`\`\`

These types do not validate an incoming HTTP body or an external service response. Runtime schemas must check those boundaries. Authentication identifies the caller; authorization decides whether the requested data and action are available to that caller.

Keep an API description, runtime validation, and application types aligned. A schema-first or generated-client workflow can reduce duplication, but it still needs review when behavior changes.

## Make retries safe at the persistence boundary

A disabled submit button improves the interface, but a timeout or interrupted connection can still produce a second request. The server needs a durable rule for recognizing the same operation.

Scope an idempotency key to the actor and operation, associate it with normalized input, and use a database constraint or transaction to prevent competing requests from creating duplicate work. Define how long that association lasts and what a caller receives while the original operation is still running.

An in-memory lookup can help a local demonstration. It cannot coordinate separate server instances or survive a restart. Choose the persistence mechanism according to the guarantee the API promises.

## Turn the contract into acceptance tests

Test the behavior callers depend on, including the paths that are easy to overlook:

| Scenario | Expected behavior |
| --- | --- |
| Valid request from an authorized user | A job is created and a progress URL is returned |
| Invalid range or unsupported format | A stable validation response identifies the problem |
| Request for another user's restricted data | Access is denied before work starts |
| Equivalent retry with the same key | The existing operation is returned |
| Same key with different input | The API reports a conflict |
| Two equivalent requests arrive together | Only one operation is created |

The concurrency case matters: sequential retries can pass even when a race still creates duplicates. Review tests at the boundary that owns the guarantee, rather than checking only a helper function.

## Keep the specification useful after release

When the operation changes, update the contract and its examples with the implementation. If an AI agent helps write code, give it the relevant acceptance criteria, existing conventions, and a bounded task. Review the resulting behavior against the same agreement a human contributor would use.

A specification earns its place when it helps a team resolve ambiguity and detect regressions. Its value comes from the decisions it preserves and the checks it enables.

## Further reading

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [PostgreSQL constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
- [My engineering approach](/approach)
`,
  },
  {
    id: "note-offline",
    slug: "offline-first-synchronization",
    title_en: "Offline-first workflows: make synchronization explicit",
    title_om: null,
    excerpt_en:
      "A practical model for durable local actions, outbox states, safe retries, and conflicts when a device reconnects.",
    excerpt_om: null,
    published: true,
    published_at: "2026-10-20T00:00:00Z",
    updated_at: "2026-10-20T00:00:00Z",
    tags: ["Offline-first", "System Design", "Reliability"],
    takeaways: [
      "Persist local actions and outbox entries together.",
      "Keep event identity stable across network retries.",
      "Make server decisions and synchronization status visible.",
    ],
    content_en: `## A local write and a server decision are different events

An offline interface can accept work before the server knows it exists. A student may answer a practice question, a field worker may edit a record, or a user may save a draft while their connection is unstable. The application needs to show what has been saved locally and what has been accepted remotely.

My IFAA ENTRANCE work spans web and mobile codebases, including a Flutter companion with local SQLite persistence. That context makes synchronization an application-design problem: the user experience depends on how state survives interruption and reconnects with server-owned rules.

The example here is a practice response. Timed assessments need their own explicit rules for deadlines, offline participation, and authoritative scoring.

## Give each local action a durable identity

A practice response can carry a client-generated event identifier:

\`\`\`json
{
  "eventId": "practice-event-123",
  "sessionId": "session-456",
  "questionId": "question-789",
  "selectedOption": "B",
  "contentVersion": 4
}
\`\`\`

The identifier represents one user action. Persist it with the action instead of generating a different identifier for every network attempt. Otherwise a retry looks like new work to the server.

The server should derive the user from the authenticated session, validate ownership and question membership, and decide what it accepts. A client-generated identifier is useful for deduplication; it is not proof that the action is legitimate.

## Commit the local change and the outbox together

An outbox is a durable list of actions waiting to synchronize. When a user answers, save the local response and its outbox entry in the same local database transaction. This avoids a response that appears saved but is never scheduled for upload.

Use explicit states such as:

1. **Queued:** saved on the device and waiting to send.
2. **Sending:** a synchronization attempt is in progress.
3. **Confirmed:** the server has acknowledged the action.
4. **Needs attention:** the server rejected it or a conflict needs user input.

If the app closes while an action is sending, a later run needs a recovery rule. Persisting an in-flight state without recovery can strand work indefinitely.

## Treat an ambiguous timeout as unknown

A request can reach the server even when the response never reaches the device. Retrying after a timeout is therefore expected behavior.

The server needs a durable uniqueness rule for the event within the appropriate user and operation scope. It should return the previous result for an equivalent retry and reject reuse of the identifier for different input. Two concurrent deliveries should produce the same logical result as one delivery.

Client timestamps can help explain what a user saw. They should not, by themselves, decide deadlines, authorization, or grading. Device clocks can be wrong.

## Define conflicts before they happen

A question may change while a device is offline. A session may close, permissions may change, or the same account may continue on another device. A synchronization design needs a response for each of those situations.

A content version helps the server detect that the action refers to an older view. The product then needs a deliberate policy: accept the compatible change, ask the user to refresh, or explain why the action cannot be applied. Silently replacing server state can hide a real disagreement.

Keep account boundaries explicit on shared devices. Data saved for one account must not be uploaded as another account after sign-in changes.

## Make synchronization visible without making it noisy

Use plain status language: “Saved on this device,” “Waiting to sync,” or “Sync complete.” Keep the user's work available when a retry fails. A small persistent status is often more useful than repeated error notifications during a known connection outage.

Test reconnects, duplicate delivery, app restarts, revoked access, stale content, and account changes. Include the case where the server accepts an action but its acknowledgement is lost.

Offline support becomes dependable when local persistence, synchronization, and server rules form one explainable workflow.

## Further reading

- [Flutter: offline-first support](https://docs.flutter.dev/app-architecture/design-patterns/offline-first)
- [Drift transactions](https://drift.simonbinder.eu/dart_api/transactions/)
- [IFAA ENTRANCE case study](/work/ifaa-entrance)
`,
  },
  {
    id: "note-ai-boundaries",
    slug: "reliable-ai-api-boundaries",
    title_en: "Reliable AI features start at the API boundary",
    title_om: null,
    excerpt_en:
      "Design provider adapters, runtime validation, timeouts, and useful failure states around AI-powered application workflows.",
    excerpt_om: null,
    published: true,
    published_at: "2026-10-20T00:00:00Z",
    updated_at: "2026-10-20T00:00:00Z",
    tags: ["AI Engineering", "Reliability", "API Design"],
    takeaways: [
      "Keep authorization and state changes under application control.",
      "Validate output structure and domain meaning separately.",
      "Bound retries and preserve a useful user journey when generation fails.",
    ],
    content_en: `## Give the model a bounded responsibility

An AI feature often sits inside an otherwise ordinary application: a user selects an action, an API checks access, a provider generates a response, and the interface displays the result. Reliability depends on the boundaries between those steps.

In [EduAI Assistant](https://github.com/fahamijemal/eduai-assistant), Gemini is used for document questions, summaries, comparisons, and quiz generation. [Automaton Auditor](https://github.com/fahamijemal/automaton-auditor) explores structured reviewer outputs and rule-based synthesis. Together, these projects make a useful distinction visible: generating a response and accepting that response are separate responsibilities.

The application should retain control over authentication, ownership, persistence, and consequential state changes. A model response supplies candidate content for the workflow to validate.

## Put a provider adapter behind an application interface

Keep provider-specific request formats outside the core use case. An application-facing interface can describe the operation it needs:

\`\`\`typescript
type ExplanationRequest = {
  question: string;
  sourceText: string;
};

type ExplanationResult =
  | { status: "ok"; explanation: string }
  | { status: "unavailable"; retryable: boolean };
\`\`\`

This example represents an application contract, not a provider SDK. The adapter owns provider calls, timeouts, and conversion into that result. It also needs a policy for rate limits, cancellation, and unsupported response formats.

An interface makes the boundary easier to test. It does not guarantee that switching providers preserves response quality; that requires evaluation on the same tasks and source material.

## Validate both structure and meaning

A quiz response can be valid JSON and still contain the wrong number of choices, an invalid answer key, or an explanation unsupported by the source material.

Use runtime validation for the structure the application requires. Then check domain rules: required fields, allowed values, references to known records, and any relationships between fields. Structured generation can help constrain output, but the application still needs to decide what to accept.

For document-based features, distinguish an unsupported answer from a provider failure. A successful request may legitimately produce “the supplied material does not answer this question.” That is useful behavior when evidence is missing.

## Bound time and retries

A request should not wait indefinitely for a provider. Set a timeout appropriate to the user action and make the unavailable state part of the API contract.

Retry only when the failure is plausibly transient and the action is safe to repeat. A malformed request should be corrected. A rate limit may require waiting. A timeout may leave an uncertain result, particularly if the workflow performs an external action or creates a billable operation.

Avoid nested retry loops across the browser, application server, and SDK. Their combined attempts can increase delay and cost well beyond the intended budget.

## Record useful signals without recording everything

A trace should help explain a failed request. Useful fields include the operation, a request identifier, provider/model configuration, duration, result category, and retry count. Record token usage or estimated cost when the provider supplies the necessary information.

Raw prompts and documents may contain personal or confidential data. Decide what the application needs to retain, who may access it, and how long it should remain available. A log should not become an accidental copy of every user's source material.

## Evaluate the whole user journey

Build representative examples with expected behavior. Include missing evidence, malformed responses, provider failures, and attempts to redirect the model through source content. Review grounding and usefulness alongside latency and cost.

Test what the user can do when generation fails. They may still be able to read the original material, continue a practice session, or retry later. Preserve those paths where they make sense for the product.

A reliable AI feature is a bounded part of a well-designed application, with visible failure behavior and evidence for the results it accepts.

## Further reading

- [Google AI: structured outputs](https://ai.google.dev/gemini-api/docs/structured-output)
- [OWASP guidance for LLM applications](https://genai.owasp.org/llm-top-10/)
- [Document context and retrieval](/blog/document-context-and-retrieval)
`,
  },
];

export function mergeEditorialPosts(
  posts: BlogPost[],
  tag?: string,
): BlogPost[] {
  const merged = [
    ...editorialPosts,
    ...posts.filter(
      (post) => !editorialPosts.some((note) => note.slug === post.slug),
    ),
  ];
  return merged
    .filter(
      (post) => post.published !== false && (!tag || post.tags?.includes(tag)),
    )
    .sort(
      (a, b) =>
        (b.published_at || "").localeCompare(a.published_at || "") ||
        a.slug.localeCompare(b.slug),
    );
}
export function editorialPost(slug: string) {
  return editorialPosts.find((post) => post.slug === slug);
}

export type RelatedArticle = Pick<
  BlogPost,
  "id" | "slug" | "title_en" | "title_om"
> &
  Partial<Pick<BlogPost, "tags" | "published_at" | "published">>;
export function relatedArticles(
  post: BlogPost,
  candidates: RelatedArticle[],
  limit = 3,
): RelatedArticle[] {
  const tags = new Set(post.tags || []);
  const score = (candidate: RelatedArticle) =>
    (candidate.tags || []).filter((tag) => tags.has(tag)).length;
  return [...editorialPosts, ...candidates]
    .filter(
      (candidate, index, all) =>
        candidate.slug !== post.slug &&
        candidate.published !== false &&
        all.findIndex((other) => other.slug === candidate.slug) === index,
    )
    .sort(
      (a, b) =>
        score(b) - score(a) ||
        (b.published_at || "").localeCompare(a.published_at || "") ||
        a.slug.localeCompare(b.slug),
    )
    .slice(0, limit);
}
