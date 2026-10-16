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
      .getByRole("heading", {
        name: "Founder of IFAA TECHNOLOGIES.",
        exact: true,
      })
      .waitFor();
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    assert.equal(await page.locator('a[href="/om"]').count(), 0);
    assert.equal(
      await page.getByRole("button", { name: "Toggle language" }).count(),
      0,
    );
    assert.ok(
      (await page.locator("#about").innerText()).includes(
        "qormaata interaansii",
      ),
    );
    assert.ok(
      (await page.locator("#about").innerText()).includes("Ifaa Teknoonoojii"),
    );
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    await page
      .getByRole("heading", {
        name: "Founder of IFAA TECHNOLOGIES.",
        exact: true,
      })
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
