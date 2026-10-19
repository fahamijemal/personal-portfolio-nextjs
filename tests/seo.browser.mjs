import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { startHarness, base } from "./seo-harness.mjs";

// Browser tooling can be supplied by the shared cloud environment without adding app dependencies.
const require = createRequire(
  resolve(process.env.PLAYWRIGHT_MODULE_ROOT || ".", "package.json"),
);
const { chromium } = require("@playwright/test");
let harness, browser;
before(async () => {
  harness = await startHarness();
  browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
});
after(async () => {
  await browser?.close();
  await harness?.stop();
});

test("retired translation redirects and saved Oromo preferences cannot change the English site", async () => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  try {
    await page.goto(`${base}/`, { waitUntil: "networkidle" });
    await page.evaluate(() => localStorage.setItem("language", "om"));
    await page.goto(`${base}/om`, { waitUntil: "networkidle" });
    assert.equal(page.url(), `${base}/`);
    await page
      .locator('#home a[href="https://www.ifaatechnologies.tech/"]')
      .waitFor();
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    assert.equal(await page.locator('a[href="/om"]').count(), 0);
    assert.equal(
      await page.getByRole("button", { name: "Toggle language" }).count(),
      0,
    );
    assert.match(
      await page.locator("#home").innerText(),
      /Full-Stack Developer.*Founder of/s,
    );
    assert.equal(await page.locator("#founder-title").count(), 0);
    assert.ok(
      !(await page.locator("#about").innerText()).includes("also known as"),
    );
    assert.ok(
      !(await page.locator("#about").innerText()).includes(
        "qormaata interaansii",
      ),
    );
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    await page
      .locator('#home a[href="https://www.ifaatechnologies.tech/"]')
      .waitFor();
  } finally {
    await context.close();
  }
});

test("English portfolio fits desktop and mobile with bundled fonts", async () => {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    try {
      await page.goto(`${base}/`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("html").getAttribute("lang"), "en");
      assert.equal(await page.locator("h1").count(), 1);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      assert.ok(
        await page.evaluate(() =>
          [...document.fonts].some((font) => font.status === "loaded"),
        ),
      );
      assert.equal(
        await page.locator('link[rel="preload"][as="font"]').count(),
        1,
      );
    } finally {
      await page.close();
    }
  }
});

test("modern portfolio exposes real work, AI engineering skills, and accessible mobile navigation", async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  try {
    await page.goto(`${base}/`, { waitUntil: "networkidle" });
    for (const text of [
      "Agentic AI",
      "Prompt engineering",
      "RAG",
      "Spec-driven",
      "entrepreneur",
    ]) {
      assert.ok(
        (await page.getByRole("main").innerText())
          .toLowerCase()
          .includes(text.toLowerCase()),
        text,
      );
    }
    assert.equal(await page.locator("#skills").getByText(/\d+%/).count(), 0);
    assert.equal(await page.locator("#projects article").count(), 2);
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Work", exact: true })
      .click();
    assert.equal(
      await page
        .getByRole("button", { name: "Open navigation" })
        .getAttribute("aria-expanded"),
      "false",
    );
    await page
      .getByRole("link", {
        name: "Read the IFAA ENTRANCE case study",
        exact: true,
      })
      .click();
    await page.waitForURL(`${base}/work/ifaa-entrance`);
    await page
      .getByRole("heading", { name: "IFAA ENTRANCE", exact: true })
      .waitFor();
    const live = page.getByRole("link", { name: /Visit the website/ });
    assert.equal(
      await live.getAttribute("href"),
      "https://entrance.ifaatechnologies.tech/en",
    );
    assert.equal(await live.getAttribute("rel"), "noopener noreferrer");
    assert.ok(
      (
        await page.locator('link[rel="canonical"]').getAttribute("href")
      ).endsWith("/work/ifaa-entrance"),
    );
  } finally {
    await page.close();
  }
});

test("contact failures retain the message and successful submission resets it", async () => {
  const page = await browser.newPage();
  try {
    await page.goto(`${base}/`, { waitUntil: "networkidle" });
    await page.getByLabel("Your name", { exact: true }).fill("Local test");
    await page
      .getByLabel("Email address", { exact: true })
      .fill("local@example.com");
    await page
      .getByLabel("Your message", { exact: true })
      .fill("Local UI regression only.");
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "Please use email for now." }),
      }),
    );
    await page
      .getByRole("button", { name: "Send message", exact: true })
      .click();
    await page.locator("#contact").getByRole("alert").waitFor();
    assert.equal(
      await page.getByLabel("Your message", { exact: true }).inputValue(),
      "Local UI regression only.",
    );
    await page.unroute("**/api/contact");
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: '{"success":true}',
      }),
    );
    await page
      .getByRole("button", { name: "Send message", exact: true })
      .click();
    await page
      .getByRole("status")
      .filter({ hasText: "Your message has been sent." })
      .waitFor();
    assert.equal(
      await page.getByLabel("Your message", { exact: true }).inputValue(),
      "",
    );
  } finally {
    await page.close();
  }
});

test("light and dark portfolio pages have no serious accessibility violations", async () => {
  const { default: AxeBuilder } = require("@axe-core/playwright");
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  try {
    for (const theme of ["light", "dark"]) {
      await page.goto(`${base}/`, { waitUntil: "networkidle" });
      const isDark = await page
        .locator("html")
        .evaluate((node) => node.classList.contains("dark"));
      if (isDark !== (theme === "dark"))
        await page
          .getByRole("button", { name: "Toggle theme", exact: true })
          .click();
      await page.waitForFunction(
        (value) =>
          document.documentElement.classList.contains("dark") ===
          (value === "dark"),
        theme,
      );
      await page.evaluate(() =>
        Promise.all(
          document
            .getAnimations()
            .map((animation) => animation.finished.catch(() => {})),
        ),
      );
      for (const path of ["/", "/work/ifaa-entrance"]) {
        if (path !== "/")
          await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
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
  } finally {
    await context.close();
  }
});
