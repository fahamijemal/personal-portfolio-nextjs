import http from "node:http";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";

export const origin = "https://fahami.ifaatechnologies.tech";
export const base = "http://127.0.0.1:3018";
export const fixtureProjectId = "00000000-0000-4000-8000-000000000001";
export const fixturePost = {
  id: "00000000-0000-4000-8000-000000000002",
  slug: "seo-fixture-post",
  title_en: "SEO fixture article",
  title_om: null,
  excerpt_en: "Local fixture content for isolated SEO checks.",
  excerpt_om: null,
  content_en: "# Local fixture\n\nThis is isolated test content.",
  content_om: null,
  published: true,
  published_at: "2026-01-12T10:00:00.000Z",
  tags: ["TypeScript"],
  image_url: null,
};
const project = {
  id: fixtureProjectId,
  title_en: "SEO fixture project",
  title_om: null,
  description_en: "Local fixture content for isolated project checks.",
  description_om: null,
  technologies: ["TypeScript"],
  github_url: null,
  live_url: null,
  image_url: null,
  featured: true,
  display_order: 0,
};
const draft = {
  ...fixturePost,
  id: "00000000-0000-4000-8000-000000000003",
  slug: "seo-fixture-draft",
  title_en: "Private draft fixture",
  published: false,
};

export async function startHarness() {
  const requests = [];
  let resumeSignedPath = null;
  const tables = {
    projects: [
      project,
      { ...project, id: "legacy-sample", title_en: "E-Commerce Platform" },
    ],
    blog_posts: [fixturePost, draft],
    certificates: [
      {
        id: "cert-fixture",
        title_en: "Full Stack Software Developer Assessment V2",
        issuer: null,
        credential_url: "https://coursera.org/verify/local-fixture",
        image_url: "https://www.credly.com/badges/local-fixture",
        issued_at: "2025-08-20",
      },
    ],
    skills: [],
    site_settings: [],
    profiles: [],
  };
  const fixture = http.createServer((req, res) => {
    const url = new URL(req.url, "http://127.0.0.1:3019");
    requests.push({
      path: url.pathname,
      search: url.search,
      method: req.method,
    });
    res.setHeader("Content-Type", "application/json");
    if (
      url.pathname ===
      "/storage/v1/object/sign/resumes/fahami-jemal-harun-cv.pdf"
    ) {
      res.writeHead(resumeSignedPath ? 200 : 404);
      res.end(
        JSON.stringify(
          resumeSignedPath
            ? { signedURL: resumeSignedPath }
            : { message: "Not found" },
        ),
      );
      return;
    }
    if (req.method !== "GET") {
      res.writeHead(405);
      res.end(JSON.stringify({ message: "Read-only fixture" }));
      return;
    }
    if (url.pathname.startsWith("/rest/v1/")) {
      let rows = [...(tables[url.pathname.split("/").at(-1)] || [])];
      for (const [key, value] of url.searchParams) {
        if (value.startsWith("eq."))
          rows = rows.filter((row) => String(row[key]) === value.slice(3));
        if (value.startsWith("neq."))
          rows = rows.filter((row) => String(row[key]) !== value.slice(4));
      }
      if (url.searchParams.has("limit"))
        rows = rows.slice(0, Number(url.searchParams.get("limit")));
      const singular = (req.headers.accept || "").includes(
        "application/vnd.pgrst.object+json",
      );
      if (singular && !rows.length) {
        res.writeHead(406);
        res.end(JSON.stringify({ code: "PGRST116", message: "No rows" }));
        return;
      }
      res.writeHead(200);
      res.end(JSON.stringify(singular ? rows[0] : rows));
      return;
    }
    res.writeHead(401);
    res.end(JSON.stringify({ message: "Fixture has no authentication" }));
  });
  fixture.listen(3019, "127.0.0.1");
  await once(fixture, "listening");
  const env = {
    ...process.env,
    NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:3019",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "personal-local-seo-fixture-key",
    NEXT_TELEMETRY_DISABLED: "1",
  };
  env.SUPABASE_SERVICE_ROLE_KEY = "";
  const app = spawn(
    process.execPath,
    [
      "--require",
      fileURLToPath(new URL("./seo-network-guard.cjs", import.meta.url)),
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      "3018",
    ],
    {
      cwd: fileURLToPath(new URL("../", import.meta.url)),
      env,
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let logs = "";
  app.stdout.on("data", (data) => {
    logs += data;
  });
  app.stderr.on("data", (data) => {
    logs += data;
  });
  async function stop() {
    if (app.exitCode === null && app.signalCode === null) {
      app.kill("SIGTERM");
      await Promise.race([
        once(app, "exit"),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);
      if (app.exitCode === null && app.signalCode === null) app.kill("SIGKILL");
    }
    await new Promise((resolve) => fixture.close(resolve));
  }
  for (let attempt = 0; attempt < 80; attempt++) {
    try {
      const response = await fetch(`${base}/`);
      if (response.ok)
        return {
          stop,
          requests,
          setResumeSignedPath: (path) => {
            resumeSignedPath = path;
          },
        };
    } catch {}
    if (app.exitCode !== null) {
      await stop();
      throw new Error(`Test Next.js server exited: ${logs.slice(-2500)}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await stop();
  throw new Error(
    `Test Next.js server did not become ready: ${logs.slice(-2500)}`,
  );
}

export async function readPage(path) {
  const response = await fetch(`${base}${path}`, {
    headers: { "User-Agent": "Googlebot" },
    redirect: "manual",
  });
  return { response, html: await response.text() };
}

export function tags(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "g"))].map((match) =>
    Object.fromEntries(
      [...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map((item) => [
        item[1].toLowerCase(),
        item[2].replaceAll("&amp;", "&"),
      ]),
    ),
  );
}
export function graphs(html) {
  return [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map((match) => JSON.parse(match[1]));
}
