import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { startHarness, base } from "./seo-harness.mjs";
const require = createRequire(
  resolve(process.env.PLAYWRIGHT_MODULE_ROOT || ".", "package.json"),
);
const { chromium } = require("@playwright/test");
const { default: AxeBuilder } = require("@axe-core/playwright");
let harness, browser;
before(async () => {
  harness = await startHarness();
  browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
});
after(async () => {
  await browser?.close();
  await harness?.stop();
});
test("published articles support topic navigation, search, and mobile section links", async () => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 900 },
  });
  const page = await context.newPage();
  try {
    await page.goto(`${base}/blog`, { waitUntil: "networkidle" });
    assert.equal(await page.locator(".writing-grid article").count(), 7);
    await page.getByRole("searchbox").fill("contracts you can test");
    assert.equal(await page.locator(".writing-grid article").count(), 1);
    await page.getByRole("searchbox").fill("");
    await page
      .getByRole("navigation", { name: "Article topics" })
      .getByRole("link", { name: "Offline-first", exact: true })
      .click();
    await page.waitForURL(/tag=Offline-first/);
    await page.locator(".writing-grid article").first().waitFor();
    await page.getByRole("searchbox").fill("");
    assert.equal(await page.locator(".writing-grid article").count(), 1);
    await page
      .getByRole("link", {
        name: "Offline-first workflows: make synchronization explicit",
        exact: true,
      })
      .click();
    await page.waitForURL(`${base}/blog/offline-first-synchronization`);
    await page.locator(".article-takeaways").waitFor();
    const toc = page.locator(".article-toc-mobile");
    await toc.locator("summary").focus();
    await page.keyboard.press("Enter");
    assert.equal(await toc.getAttribute("open"), "");
    const link = toc.getByRole("link", {
      name: "Give each local action a durable identity",
      exact: true,
    });
    await link.click();
    assert.ok(
      page.url().endsWith("#give-each-local-action-a-durable-identity"),
    );
    assert.equal(
      await page.locator("#give-each-local-action-a-durable-identity").count(),
      1,
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
  } finally {
    await context.close();
  }
});
test("article code, tables, dates and related links work in both themes", async () => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 900 },
  });
  const page = await context.newPage();
  try {
    for (const theme of ["light", "dark"]) {
      await page.goto(`${base}/blog/specification-led-api-contracts`, {
        waitUntil: "networkidle",
      });
      const dark = await page
        .locator("html")
        .evaluate((el) => el.classList.contains("dark"));
      if (dark !== (theme === "dark"))
        await page
          .getByRole("button", { name: "Toggle theme", exact: true })
          .click();
      await page.waitForFunction(
        (value) =>
          document.documentElement.classList.contains("dark") === value,
        theme === "dark",
      );
      await page.evaluate(() =>
        Promise.all(
          document.getAnimations().map((a) => a.finished.catch(() => {})),
        ),
      );
      assert.ok((await page.locator(".blog-prose pre").count()) > 0);
      await page
        .getByRole("region", { name: "Scrollable comparison table" })
        .focus();
      await page.keyboard.press("ArrowRight");
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      assert.equal(await page.locator(".related-articles a").count(), 3);
      assert.equal(
        await page
          .locator(
            '.related-articles a[href="/blog/specification-led-api-contracts"]',
          )
          .count(),
        0,
      );
      for (const path of [
        "/blog/specification-led-api-contracts",
        "/blog/offline-first-synchronization",
        "/blog/reliable-ai-api-boundaries",
        "/blog",
      ]) {
        await page.goto(base + path, { waitUntil: "networkidle" });
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        assert.deepEqual(
          result.violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          })),
          [],
          `${theme} ${path}`,
        );
      }
    }
    await page.goto(`${base}/blog/getting-started-with-cloud-computing`, {
      waitUntil: "networkidle",
    });
    assert.match(
      await page.locator(".article-updated").innerText(),
      /20 Oct 2026/,
    );
  } finally {
    await context.close();
  }
});
