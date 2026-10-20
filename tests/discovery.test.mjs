import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import {
  startHarness,
  readPage,
  graphs,
  tags,
  base,
  origin,
} from "./seo-harness.mjs";

let harness;
before(async () => {
  harness = await startHarness();
});
after(async () => {
  await harness?.stop();
});
const nodes = (html) =>
  graphs(html).flatMap((value) => value["@graph"] || [value]);

test("profile identity links the real portrait, canonical profile, and official accounts", async () => {
  const { html } = await readPage("/");
  const graph = nodes(html);
  const person = graph.find((value) => value["@type"] === "Person");
  const profile = graph.find((value) => value["@type"] === "ProfilePage");
  assert.equal(person.mainEntityOfPage["@id"], profile["@id"]);
  assert.equal(profile.primaryImageOfPage["@id"], person.image["@id"]);
  const image = await fetch(person.image.contentUrl.replace(origin, base));
  assert.equal(image.status, 200);
  assert.match(image.headers.get("content-type"), /image\/jpeg/);
  assert.ok(person.sameAs.includes("https://github.com/fahamijemal"));
  assert.ok(
    tags(html, "link").some(
      (link) =>
        link.type === "application/rss+xml" &&
        link.href === `${origin}/blog/feed.xml`,
    ),
  );
});

test("public collections and case studies form consistent canonical page and breadcrumb graphs", async () => {
  for (const path of [
    "/projects",
    "/blog",
    "/approach",
    "/certificates",
    "/work/project-chimera",
    "/blog/specification-led-api-contracts",
  ]) {
    const { html } = await readPage(path);
    const graph = nodes(html);
    const page = graph.find(
      (value) => value["@id"] === `${origin}${path}#webpage`,
    );
    assert.ok(page, path);
    const breadcrumb = graph.find(
      (value) => value["@id"] === page.breadcrumb["@id"],
    );
    assert.equal(breadcrumb.itemListElement[0].item, `${origin}/`);
    assert.equal(breadcrumb.itemListElement.at(-1).item, `${origin}${path}`);
    const list = graph.find(
      (value) => value["@id"] === page.mainEntity?.["@id"],
    );
    if (["/projects", "/blog"].includes(path)) {
      assert.equal(list.numberOfItems, list.itemListElement.length);
      assert.ok(list.numberOfItems >= 3);
      for (const item of list.itemListElement) {
        const target = await readPage(item.url.replace(origin, ""));
        assert.ok(
          tags(target.html, "link").some(
            (link) => link.rel === "canonical" && link.href === item.url,
          ),
        );
      }
    }
    if (path.startsWith("/work/") || path.startsWith("/blog/")) {
      assert.ok(list);
      assert.equal(list.mainEntityOfPage["@id"], page["@id"]);
      assert.ok(list.image);
    }
  }
});

test("filtered and empty blog views stay usable without creating indexable duplicate pages", async () => {
  for (const tag of ["MCP", "unknown-topic"]) {
    const { html } = await readPage(`/blog?tag=${tag}`);
    const meta = tags(html, "meta");
    assert.ok(
      meta.some(
        (value) =>
          value.name === "robots" &&
          value.content.includes("noindex") &&
          value.content.includes("follow"),
      ),
    );
    assert.ok(
      !meta.some(
        (value) =>
          value.name === "googlebot" &&
          /(^|,\s*)index(,|$)/.test(value.content),
      ),
    );
    assert.equal(
      tags(html, "link").find((value) => value.rel === "canonical")?.href,
      `${origin}/blog`,
    );
  }
  const { html } = await readPage("/blog");
  assert.ok(
    tags(html, "meta").some(
      (value) =>
        value.name === "robots" && value.content.startsWith("index, follow"),
    ),
  );
});

test("AI source guide is plain text, scoped to public facts, and links real canonical sources", async () => {
  const response = await fetch(`${base}/llms.txt`);
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type"),
    /text\/plain; charset=utf-8/,
  );
  assert.match(response.headers.get("x-robots-tag"), /noindex, follow/);
  const guide = await response.text();
  assert.match(guide, /Model Context Protocol/);
  assert.match(guide, /Public challenge codebase/);
  assert.ok(!guide.includes("localhost"));
  const links = [...guide.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(
    (match) => match[1],
  );
  for (const link of new Set(links.filter((link) => link.startsWith(origin)))) {
    const result = await fetch(link.replace(origin, base));
    assert.equal(result.status, 200, link);
    assert.ok(
      !(await result.text()).includes("NEXT_HTTP_ERROR_FALLBACK;404"),
      link,
    );
  }
});
