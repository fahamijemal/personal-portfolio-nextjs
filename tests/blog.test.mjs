import { test } from "node:test";
import assert from "node:assert/strict";
import {
  editorialPosts,
  mergeEditorialPosts,
  relatedArticles,
} from "../lib/editorial.ts";
test("editorial overrides replace an old CMS article while unpublished candidates stay excluded", () => {
  const original = editorialPosts[0];
  const posts = mergeEditorialPosts([
    { ...original, content_en: "Old unfinished text" },
    { ...original, id: "draft", slug: "private-draft", published: false },
  ]);
  assert.equal(posts.filter((p) => p.slug === original.slug).length, 1);
  assert.equal(
    posts.find((p) => p.slug === original.slug).content_en,
    original.content_en,
  );
  assert.ok(!posts.some((p) => p.slug === "private-draft"));
});
test("related reading prefers shared topics and excludes the current article, duplicates and drafts", () => {
  const post = {
    ...editorialPosts[0],
    slug: "local-ranking-fixture",
    tags: ["UniqueTopic"],
  };
  const matches = {
    id: "match",
    slug: "related-match",
    title_en: "Matching topic",
    title_om: null,
    tags: ["UniqueTopic"],
    published_at: "2026-01-01T00:00:00Z",
  };
  const result = relatedArticles(
    post,
    [
      matches,
      matches,
      { ...matches, slug: post.slug },
      { ...matches, slug: "draft-candidate", published: false },
    ],
    3,
  );
  assert.equal(result[0].slug, "related-match");
  assert.equal(new Set(result.map((p) => p.slug)).size, result.length);
  assert.ok(
    !result.some((p) => p.slug === "draft-candidate" || p.slug === post.slug),
  );
});
