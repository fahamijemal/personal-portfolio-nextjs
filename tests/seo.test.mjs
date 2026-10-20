import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve } from "node:path";
import {
  startHarness,
  readPage,
  tags,
  graphs,
  origin,
  base,
  fixtureProjectId,
  fixturePost,
} from "./seo-harness.mjs";

let harness;
before(async () => {
  harness = await startHarness();
});
after(async () => {
  await harness?.stop();
});

test("English homepage identifies the founder and brand without translated-page metadata", async () => {
  for (const [path, language] of [["/", "en"]]) {
    const { response, html } = await readPage(path);
    assert.equal(response.status, 200);
    assert.match(html, new RegExp(`<html[^>]*lang="${language}"`));
    const links = tags(html, "link");
    assert.equal(
      new URL(links.find((link) => link.rel === "canonical")?.href).href,
      `${origin}${path}`,
    );
    assert.deepEqual(
      links
        .filter((link) => link.rel === "alternate" && link.hreflang)
        .map((link) => [link.hreflang, new URL(link.href).href])
        .sort(),
      [],
    );
    const schema = graphs(html);
    const graph = schema.find((value) => value["@graph"])["@graph"];
    const person = graph.find((value) => value["@type"] === "Person");
    assert.equal(person["@id"], `${origin}/#person`);
    assert.equal(person.name, "Fahami Jemal Harun");
    assert.deepEqual(person.alternateName, [
      "Fahami",
      "Fami",
      "Fahmi",
      "Fahami Jemal",
      "Fahami Jamal",
      "Fahami Jamel",
    ]);
    assert.equal(person.homeLocation.name, "Adama");
    assert.equal(person.homeLocation.containedInPlace.name, "Oromia");
    assert.equal(
      person.homeLocation.containedInPlace.containedInPlace.name,
      "Ethiopia",
    );
    assert.ok(person.knowsAbout.includes("Backend development"));
    assert.equal(person.subjectOf["@id"], `${origin}/#profile`);
    assert.match(html, /Developer &amp; Founder, IFAA Technologies/);
    const robots = tags(html, "meta").find(
      (meta) => meta.name === "robots",
    )?.content;
    assert.match(robots, /^index, follow/);
    assert.match(
      tags(html, "meta").find((meta) => meta.name === "googlebot")?.content,
      /max-snippet:-1/,
    );
    assert.equal(
      person.affiliation["@id"],
      "https://www.ifaatechnologies.tech/#organization",
    );
    assert.equal(person.worksFor, undefined);
    assert.equal(
      graph.find((value) => value["@type"] === "WebSite").inLanguage,
      "en",
    );
    const organization = graph.find(
      (value) => value["@type"] === "Organization",
    );
    const keywords = tags(html, "meta").find(
      (meta) => meta.name === "keywords",
    )?.content;
    for (const alias of [
      ...person.alternateName,
      "Ifaa Technology",
      "Ifaa Tech",
      "Ifaa Tech Ethiopia",
      "Ifaa Teknoonoojii",
      "Teknoolojii Ifaa",
    ]) {
      if (!person.alternateName.includes(alias))
        assert.ok(organization.alternateName.includes(alias));
      assert.ok(keywords.includes(alias));
    }
    for (const phrase of [
      "Fahami Jemal Harun",
      "IFAA ENTRANCE",
      "qormaata interaansii",
      "Ethiopia",
      "Oromia",
    ])
      assert.ok(keywords.includes(phrase));
    assert.ok(!tags(html, "a").some((link) => link.href === "/om"));

    assert.equal(
      schema.find((value) => value["@type"] === "ProfilePage").mainEntity[
        "@id"
      ],
      person["@id"],
    );
    assert.match(html, /https:\/\/www\.ifaatechnologies\.tech\//);
  }
});

test("retired /om permanently redirects without a translated page", async () => {
  const response = await fetch(`${base}/om?utm_source=old-link`, {
    redirect: "manual",
  });
  assert.equal(response.status, 308);
  assert.equal(new URL(response.headers.get("location"), base).pathname, "/");
  const home = await fetch(new URL(response.headers.get("location"), base));
  assert.equal(home.status, 200);
});

test("English collection pages use their own canonical and sharing URLs without fake translations", async () => {
  for (const path of ["/projects", "/blog", "/certificates", "/approach"]) {
    const { response, html } = await readPage(path);
    assert.equal(response.status, 200);
    assert.equal(
      tags(html, "link").find((link) => link.rel === "canonical")?.href,
      `${origin}${path}`,
    );
    assert.equal(
      tags(html, "meta").find((meta) => meta.property === "og:url")?.content,
      `${origin}${path}`,
    );
    assert.equal(tags(html, "link").filter((link) => link.hreflang).length, 0);
    assert.ok(!graphs(html).some((value) => value["@type"] === "ProfilePage"));
  }
});

test("published details have specific metadata while unpublished articles stay unavailable", async () => {
  const project = await readPage(`/projects/${fixtureProjectId}`);
  assert.equal(project.response.status, 200);
  assert.equal(
    tags(project.html, "link").find((link) => link.rel === "canonical")?.href,
    `${origin}/projects/${fixtureProjectId}`,
  );
  const article = await readPage(`/blog/${fixturePost.slug}`);
  assert.equal(article.response.status, 200);
  const schema = graphs(article.html).find(
    (value) => value["@type"] === "BlogPosting",
  );
  assert.equal(schema.author["@id"], `${origin}/#person`);
  assert.equal(schema.datePublished, fixturePost.published_at);
  const draft = await readPage("/blog/seo-fixture-draft");
  // App Router can send its shell before notFound() resolves. Both response
  // statuses are supported; the inaccessible content, 404 UI, and noindex are
  // the required boundary for this streamed route.
  assert.ok([200, 404].includes(draft.response.status));
  assert.match(draft.html, /NEXT_HTTP_ERROR_FALLBACK;404/);
  assert.ok(
    tags(draft.html, "meta").some(
      (meta) => meta.name === "robots" && meta.content.includes("noindex"),
    ),
  );
  assert.ok(!draft.html.includes("Private draft fixture"));
  const limitedBot = await fetch(`${base}/blog/seo-fixture-draft`, {
    headers: { "User-Agent": "Twitterbot" },
  });
  const limitedHtml = await limitedBot.text();
  assert.ok([200, 404].includes(limitedBot.status));
  assert.ok(
    tags(limitedHtml, "meta").some(
      (meta) => meta.name === "robots" && meta.content.includes("noindex"),
    ),
  );
  assert.ok(!limitedHtml.includes("Private draft fixture"));
});

test("auth pages are noindex without a misleading homepage canonical and admin stays gated", async () => {
  for (const path of [
    "/auth/login",
    "/auth/sign-up",
    "/auth/sign-up-success",
    "/auth/error",
  ]) {
    const { response, html } = await readPage(path);
    assert.equal(response.status, 200);
    assert.ok(
      tags(html, "meta").some(
        (meta) => meta.name === "robots" && meta.content.includes("noindex"),
      ),
    );
    assert.equal(
      tags(html, "link").filter((link) => link.rel === "canonical").length,
      0,
    );
  }
  const admin = await readPage("/admin");
  assert.equal(admin.response.status, 307);
  assert.ok(admin.response.headers.get("location").endsWith("/auth/login"));
});

test("robots and rendered sitemap use the primary host and omit fabricated dates", async () => {
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert.match(robots, /Disallow: \/admin/);
  assert.ok(!robots.includes("Disallow: /auth"));
  assert.match(robots, new RegExp(`Sitemap: ${origin}/sitemap.xml`));
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.ok(!sitemap.includes(`${origin}/om`));
  assert.ok(!sitemap.includes("hreflang"));
  assert.ok(!sitemap.includes("fahamijemal.vercel.app"));
});

test("sitemap queries public published data and uses only actual article dates", async () => {
  // Node 24 strips TypeScript; resolve this repository's aliases for this source-level data-boundary check.
  const root = fileURLToPath(new URL("../", import.meta.url));
  const hook = registerHooks({
    resolve(specifier, context, next) {
      return next(
        specifier.startsWith("@/")
          ? pathToFileURL(resolve(root, `${specifier.slice(2)}.ts`)).href
          : specifier,
        context,
      );
    },
  });
  const previousUrl = process.env.NEXT_PUBLIC_SUPABASE_URL,
    previousKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  process.env.NEXT_PUBLIC_SUPABASE_URL = "http://127.0.0.1:3019";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "personal-local-seo-fixture-key";
  try {
    const { default: sitemap } = await import("../app/sitemap.ts");
    const pages = await sitemap();
    assert.ok(
      pages.some((page) => page.url === `${origin}/blog/${fixturePost.slug}`),
    );
    assert.ok(!pages.some((page) => page.url.includes("seo-fixture-draft")));
    const dated = pages.filter((page) => page.lastModified);
    assert.equal(dated.length, 7);
    assert.equal(
      dated
        .find((page) => page.url.endsWith(fixturePost.slug))
        .lastModified.toISOString(),
      fixturePost.published_at,
    );
    assert.ok(pages.some((page) => page.url === `${origin}/approach`));
    assert.ok(
      harness.requests.some(
        (request) =>
          request.path === "/rest/v1/blog_posts" &&
          new URLSearchParams(request.search).get("published") === "eq.true",
      ),
    );
  } finally {
    previousUrl === undefined
      ? delete process.env.NEXT_PUBLIC_SUPABASE_URL
      : (process.env.NEXT_PUBLIC_SUPABASE_URL = previousUrl);
    previousKey === undefined
      ? delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      : (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = previousKey);
    hook.deregister();
  }
});

test("social preview is a real 1200 by 630 PNG", async () => {
  const response = await fetch(`${base}/opengraph-image`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /image\/png/);
  const image = Buffer.from(await response.arrayBuffer());
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
});

test("completed project case studies have unique canonicals and attributed structured data", async () => {
  for (const [slug, title, liveUrl] of [
    [
      "project-chimera",
      "Project Chimera",
      "https://github.com/fahamijemal/Chimera",
    ],
    [
      "ifaa-entrance",
      "IFAA ENTRANCE",
      "https://entrance.ifaatechnologies.tech/en",
    ],
    [
      "ifaa-technologies",
      "IFAA TECHNOLOGIES",
      "https://www.ifaatechnologies.tech/",
    ],
  ]) {
    const { response, html } = await readPage(`/work/${slug}`);
    assert.equal(response.status, 200);
    assert.equal(
      tags(html, "link").find((link) => link.rel === "canonical")?.href,
      `${origin}/work/${slug}`,
    );
    const work = graphs(html).find((node) => node["@type"] === "CreativeWork");
    assert.equal(work.name, title);
    assert.equal(work.url, liveUrl);
    assert.equal(work.author["@id"], `${origin}/#person`);
    assert.ok(!work.aggregateRating);
    assert.ok(!work.offers);
    const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
    assert.ok(sitemap.includes(`${origin}/work/${slug}`));
  }
  const { html } = await readPage("/work/not-a-real-project");
  assert.ok(
    tags(html, "meta").some(
      (meta) => meta.name === "robots" && meta.content.includes("noindex"),
    ),
  );
  assert.ok(!graphs(html).some((node) => node["@type"] === "CreativeWork"));
});

test("CV download replaces the legacy file and permits a future admin upload", async () => {
  const { html } = await readPage("/");
  assert.ok(tags(html, "a").some((link) => link.href === "/api/resume"));
  const fallback = await fetch(`${base}/api/resume`, { redirect: "manual" });
  assert.equal(fallback.status, 302);
  assert.equal(
    new URL(fallback.headers.get("location")).pathname,
    "/resume/Fahami-Jemal-Harun-CV.pdf",
  );
  assert.equal(fallback.headers.get("cache-control"), "no-store");
  const pdf = await fetch(new URL(fallback.headers.get("location")));
  assert.equal(pdf.status, 200);
  assert.match(pdf.headers.get("content-type"), /application\/pdf/);
  assert.equal(
    Buffer.from(await pdf.arrayBuffer())
      .subarray(0, 5)
      .toString(),
    "%PDF-",
  );
  try {
    harness.setResumeSignedPath(
      "/object/sign/resumes/fahami-jemal-harun-cv.pdf?token=local-fixture",
    );
    const uploaded = await fetch(`${base}/api/resume`, { redirect: "manual" });
    assert.equal(uploaded.status, 302);
    assert.match(
      uploaded.headers.get("location"),
      /storage\/v1\/object\/sign\/resumes\/fahami-jemal-harun-cv\.pdf\?token=local-fixture$/,
    );
  } finally {
    harness.setResumeSignedPath(null);
  }
});

test("engineering notes have substantive content, metadata, and sitemap entries", async () => {
  for (const slug of [
    "mcp-tool-contracts-in-project-chimera",
    "document-context-and-retrieval",
    "getting-started-with-cloud-computing",
  ]) {
    const { response, html } = await readPage(`/blog/${slug}`);
    assert.equal(response.status, 200);
    assert.equal(
      tags(html, "link").find((link) => link.rel === "canonical")?.href,
      `${origin}/blog/${slug}`,
    );
    assert.ok(graphs(html).some((value) => value["@type"] === "BlogPosting"));
    assert.ok(!html.includes("take our first steps with AWS..."));
  }
});

test("legacy sample projects are excluded without exposing private source URLs", async () => {
  const { html } = await readPage("/projects");
  assert.ok(!html.includes("E-Commerce Platform"));
  assert.ok(html.includes("OpsFlow"));
  assert.ok(html.includes("Smart Pharmacy Locator API"));
  for (const privateName of [
    "opsflow",
    "smart-pharmacy-locator-api",
    "ifaa-entrance-mobile",
  ])
    assert.ok(!html.includes(`https://github.com/fahamijemal/${privateName}`));
  const legacy = await readPage("/projects/legacy-sample");
  assert.ok(
    tags(legacy.html, "meta").some(
      (meta) => meta.name === "robots" && meta.content.includes("noindex"),
    ),
  );
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.ok(!sitemap.includes("/projects/legacy-sample"));
});

test("published engineering articles and RSS use actual dates and canonical URLs", async () => {
  for (const slug of [
    "specification-led-api-contracts",
    "offline-first-synchronization",
    "reliable-ai-api-boundaries",
  ]) {
    const { response, html } = await readPage(`/blog/${slug}`);
    assert.equal(response.status, 200);
    assert.equal(
      tags(html, "link").find((link) => link.rel === "canonical")?.href,
      `${origin}/blog/${slug}`,
    );
    const schema = graphs(html).find((node) => node["@type"] === "BlogPosting");
    assert.equal(schema.datePublished, "2026-10-20T00:00:00Z");
    assert.equal(schema.dateModified, "2026-10-20T00:00:00Z");
    assert.equal(schema.author["@id"], `${origin}/#person`);
    assert.ok(html.includes("Key ideas"));
  }
  const response = await fetch(`${base}/blog/feed.xml`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/rss\+xml/);
  const feed = await response.text();
  assert.ok(feed.includes(`${origin}/blog/specification-led-api-contracts`));
  assert.ok(feed.includes(`${origin}/blog/${fixturePost.slug}`));
  assert.ok(!feed.includes("seo-fixture-draft"));
  assert.equal((feed.match(/<item>/g) || []).length, 7);
  const cloud = graphs(
    (await readPage("/blog/getting-started-with-cloud-computing")).html,
  ).find((node) => node["@type"] === "BlogPosting");
  assert.equal(cloud.datePublished, "2026-02-17T00:00:00Z");
  assert.equal(cloud.dateModified, "2026-10-20T00:00:00Z");
});
