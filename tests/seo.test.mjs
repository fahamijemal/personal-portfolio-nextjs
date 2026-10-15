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

test("home and Oromo overview identify the same real founder with reciprocal language links", async () => {
  for (const [path, language] of [
    ["/", "en"],
    ["/om", "om"],
  ]) {
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
      [
        ["en", `${origin}/`],
        ["om", `${origin}/om`],
        ["x-default", `${origin}/`],
      ],
    );
    const schema = graphs(html);
    const graph = schema.find((value) => value["@graph"])["@graph"];
    const person = graph.find((value) => value["@type"] === "Person");
    assert.equal(person["@id"], `${origin}/#person`);
    assert.equal(person.name, "Fahami Jemal Harun");
    assert.equal(
      person.affiliation["@id"],
      "https://www.ifaatechnologies.tech/#organization",
    );
    assert.equal(person.worksFor, undefined);
    assert.equal(
      schema.find((value) => value["@type"] === "ProfilePage").mainEntity[
        "@id"
      ],
      person["@id"],
    );
    assert.match(html, /https:\/\/www\.ifaatechnologies\.tech\//);
  }
});

test("English collection pages use their own canonical and sharing URLs without fake translations", async () => {
  for (const path of ["/projects", "/blog", "/certificates"]) {
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
  const limitedBot = await fetch(`${base}/blog/seo-fixture-draft`, { headers: { "User-Agent": "Twitterbot" } });
  const limitedHtml = await limitedBot.text();
  assert.ok([200, 404].includes(limitedBot.status));
  assert.ok(tags(limitedHtml, "meta").some(meta => meta.name === "robots" && meta.content.includes("noindex")));
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
  assert.ok(sitemap.includes(`${origin}/om`));
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
    assert.equal(dated.length, 1);
    assert.equal(dated[0].lastModified.toISOString(), fixturePost.published_at);
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
