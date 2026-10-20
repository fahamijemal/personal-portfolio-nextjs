"use client";

import Link from "next/link";
import { PERSONAL_ORIGIN } from "@/lib/site-url";
import { ContentImage } from "@/components/portfolio/content-image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { ShareButtons } from "@/components/portfolio/share-buttons";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { formatCredentialDate } from "@/lib/presentation";
import { getReadingTimeMinutes, extractHeadings } from "@/lib/blog-utils";
import type { BlogPost } from "@/lib/types";
import type { SocialLinks } from "@/lib/site-content";

const AUTHOR_NAME = "Fahami Jemal Harun";

type RelatedPost = {
  id: string;
  slug: string;
  title_en: string;
  title_om: string | null;
};

function BlogPostContent({
  post,
  relatedPosts = [],
  socialLinks,
}: {
  post: BlogPost;
  relatedPosts?: RelatedPost[];
  socialLinks?: SocialLinks | null;
}) {
  const { language, t } = useI18n();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const title =
    language === "om" && post.title_om ? post.title_om : post.title_en;
  const content =
    (language === "om" && post.content_om
      ? post.content_om
      : post.content_en) ?? "";

  const readingTime = getReadingTimeMinutes(content);
  const tocItems = extractHeadings(content);

  return (
    <div className="studio reading-page">
      <Header />
      <main id="main-content" className="collection-main">
        <div className="folio-container reading-layout">
          {tocItems.length > 0 && (
            <aside className="article-toc-desktop">
              <nav className="lg:sticky lg:top-28" aria-label="On this page">
                <h2 className="text-sm font-semibold text-foreground mb-3">
                  {t.blog.tableOfContents}
                </h2>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {tocItems.map((item) => (
                    <li
                      key={item.slug}
                      style={{ paddingLeft: (item.level - 2) * 12 }}
                    >
                      <a
                        href={`#${item.slug}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          <article className="flex-1 min-w-0 order-1 lg:order-2">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            <ContentImage
              src={post.image_url}
              alt=""
              className="article-preview"
            />

            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
              {post.published_at && (
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t.blog.publishedOn} {formatDate(post.published_at)}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readingTime} {t.blog.minRead}
              </span>
              <span>
                {t.blog.writtenBy} {AUTHOR_NAME}
              </span>
            </div>

            {post.updated_at && post.updated_at !== post.published_at && (
              <p className="article-updated">
                Updated {formatCredentialDate(post.updated_at)}
              </p>
            )}
            {post.excerpt_en && (
              <p className="article-deck">{post.excerpt_en}</p>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {post.takeaways?.length ? (
              <section
                className="article-takeaways"
                aria-labelledby="takeaways-title"
              >
                <h2 id="takeaways-title">Key ideas</h2>
                <ul>
                  {post.takeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {tocItems.length > 0 && (
              <details className="article-toc-mobile">
                <summary>On this page</summary>
                <nav aria-label="Article sections">
                  <ol>
                    {tocItems.map((item) => (
                      <li key={item.slug}>
                        <a href={`#${item.slug}`}>{item.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </details>
            )}
            <MarkdownContent content={content} />
            <div className="article-author">
              <p className="folio-label">ABOUT THE AUTHOR</p>
              <p>
                <Link href="/#about">Fahami Jemal Harun</Link> is a software
                developer and founder of IFAA TECHNOLOGIES, working on backend
                systems, full-stack products, and applied AI.
              </p>
            </div>
            <ShareButtons
              title={title}
              url={new URL(`/blog/${post.slug}`, PERSONAL_ORIGIN).href}
            />

            {relatedPosts.length > 0 && (
              <section
                className="related-articles"
                aria-labelledby="related-articles-title"
              >
                <h2 id="related-articles-title">Continue reading</h2>
                <ul className="space-y-2">
                  {relatedPosts.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={`/blog/${r.slug}`}
                        className="folio-text-link"
                      >
                        {language === "om" && r.title_om
                          ? r.title_om
                          : r.title_en}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </div>
      </main>
      <Footer socialLinks={socialLinks} />
    </div>
  );
}

export function BlogPostClient({
  post,
  relatedPosts = [],
  socialLinks,
}: {
  post: BlogPost;
  relatedPosts?: RelatedPost[];
  socialLinks?: SocialLinks | null;
}) {
  return (
    <I18nProvider>
      <BlogPostContent
        post={post}
        relatedPosts={relatedPosts}
        socialLinks={socialLinks}
      />
    </I18nProvider>
  );
}
