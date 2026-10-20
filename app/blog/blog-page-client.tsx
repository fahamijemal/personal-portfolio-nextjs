"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { formatCredentialDate } from "@/lib/presentation";
import type { BlogPost } from "@/lib/types";
import type { SocialLinks } from "@/lib/site-content";
export function BlogPageClient({
  posts,
  initialTag,
  topics = [],
  socialLinks,
}: {
  posts: BlogPost[];
  initialTag?: string;
  topics?: string[];
  socialLinks?: SocialLinks | null;
}) {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(9);
  const filtered = posts.filter((post) =>
    `${post.title_en} ${post.excerpt_en || ""} ${(post.tags || []).join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <div className="studio">
      <Header />
      <main id="main-content" className="collection-main">
        <div className="folio-container">
          <Link href="/" className="folio-text-link">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to home
          </Link>
          <div className="collection-intro">
            <p className="folio-label">ENGINEERING NOTES</p>
            <h1>
              Engineering <span>in practice.</span>
            </h1>
            <p>
              Articles on the decisions behind reliable software: API contracts,
              backend architecture, applied AI, and delivery.
            </p>
          </div>
          <a href="/blog/feed.xml" className="folio-text-link blog-rss">
            Subscribe via RSS <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <div className="writing-controls">
            <label htmlFor="writing-search">Search engineering notes</label>
            <input
              id="writing-search"
              type="search"
              placeholder="Search by title or topic"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setLimit(9);
              }}
            />
            {initialTag && (
              <Link href="/blog" className="folio-text-link">
                Clear topic: {initialTag} ×
              </Link>
            )}
          </div>
          <nav className="blog-topic-nav" aria-label="Article topics">
            <Link href="/blog" aria-current={!initialTag ? "page" : undefined}>
              All articles
            </Link>
            {topics.map((topic) => (
              <Link
                key={topic}
                href={`/blog?tag=${encodeURIComponent(topic)}`}
                aria-current={initialTag === topic ? "page" : undefined}
              >
                {topic}
              </Link>
            ))}
          </nav>
          <p className="article-results" role="status" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            {search ? ` matching “${search}”` : ""}
          </p>
          <div className="notes-grid writing-grid">
            {filtered.slice(0, limit).map((post) => (
              <article key={post.slug}>
                <p className="folio-label">
                  {post.published_at
                    ? formatCredentialDate(post.published_at)
                    : "ENGINEERING ARTICLE"}
                  {post.reading_minutes
                    ? ` · ${post.reading_minutes} min read`
                    : ""}
                </p>
                <h2>
                  <Link href={`/blog/${post.slug}`}>{post.title_en}</Link>
                </h2>
                <p>{post.excerpt_en}</p>
                <div className="writing-topics">
                  {post.tags?.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`} className="folio-text-link">
                  Read article
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p role="status" className="empty-state">
              No notes match your search.
            </p>
          )}
          {filtered.length > limit && (
            <button
              className="folio-button secondary"
              onClick={() => setLimit((n) => n + 9)}
            >
              Load more articles
            </button>
          )}
          <div className="collection-cta">
            <h2>See the projects behind the notes.</h2>
            <Link href="/projects" className="folio-button">
              Explore the work
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <Footer socialLinks={socialLinks} />
    </div>
  );
}
