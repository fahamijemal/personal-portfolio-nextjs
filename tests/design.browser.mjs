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
test("navigation works by keyboard and identifies the current writing page", async () => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 850 },
  });
  const page = await context.newPage();
  try {
    await page.goto(base, { waitUntil: "networkidle" });
    const trigger = page.getByRole("button", { name: "Open navigation" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    const nav = page.getByRole("navigation", { name: "Mobile navigation" });
    await nav.getByRole("link", { name: "Writing", exact: true }).click();
    await page.waitForURL(`${base}/blog`);
    await page.getByRole("button", { name: "Open navigation" }).click();
    assert.equal(
      await nav
        .getByRole("link", { name: "Writing", exact: true })
        .getAttribute("aria-current"),
      "page",
    );
    await page.keyboard.press("Escape");
    assert.equal(await nav.count(), 0);
    assert.equal(
      await page
        .getByRole("button", { name: "Open navigation" })
        .evaluate((el) => el === document.activeElement),
      true,
    );
  } finally {
    await context.close();
  }
});
test("portfolio remains readable and accessible across responsive widths and themes", async () => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  try {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base, { waitUntil: "networkidle" });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `overflow at ${width}`,
      );
      const input = page.locator(".folio-field input").first();
      assert.ok(
        await input.evaluate(
          (el) => parseFloat(getComputedStyle(el).fontSize) >= 16,
        ),
      );
      const links = await page
        .locator(".work-card .work-links")
        .evaluateAll((els) =>
          els.map((el) => Math.round(el.getBoundingClientRect().top)),
        );
      if (width === 1440)
        assert.ok(
          Math.max(...links) - Math.min(...links) <= 1,
          "project links align",
        );
    }
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${base}/projects`, { waitUntil: "networkidle" });
      const [intro, work] = await Promise.all([
        page.locator(".collection-main > .folio-container:has(.collection-intro)").boundingBox(),
        page.locator(".work-collection .folio-container").boundingBox(),
      ]);
      assert.ok(
        Math.abs(intro.x - work.x) <= 1,
        "featured work shares the page gutter",
      );
      assert.ok(
        Math.abs(intro.width - work.width) <= 1,
        "featured work shares the content width",
      );
      assert.ok(work.x >= 20 && work.x + work.width <= width - 20);
    }
    for (const theme of ["light", "dark"]) {
      await page.evaluate(
        (value) => localStorage.setItem("theme", value),
        theme,
      );
      await page.reload({ waitUntil: "networkidle" });
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      assert.deepEqual(
        result.violations.map((v) => ({
          id: v.id,
          targets: v.nodes.map((n) => n.target),
        })),
        [],
        theme,
      );
    }
  } finally {
    await context.close();
  }
});
