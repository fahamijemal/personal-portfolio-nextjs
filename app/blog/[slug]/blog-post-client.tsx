"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { ShareButtons } from "@/components/portfolio/share-buttons";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { getReadingTimeMinutes, extractHeadings } from "@/lib/blog-utils";
import type { BlogPost } from "@/lib/types";

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
}: {
  post: BlogPost;
  relatedPosts?: RelatedPost[];
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
    (language === "om" && post.content_om ? post.content_om : post.content_en) ?? "";

  const readingTime = getReadingTimeMinutes(content);
  const tocItems = extractHeadings(content);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
          {tocItems.length > 0 && (
            <aside className="lg:w-56 shrink-0 order-2 lg:order-1">
              <nav className="lg:sticky lg:top-28">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {t.blog.tableOfContents}
                </h3>
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

            {post.image_url && (
              <div className="relative h-64 sm:h-80 w-full mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.image_url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            )}

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
              <span>{t.blog.writtenBy} {AUTHOR_NAME}</span>
            </div>

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

            <MarkdownContent content={content} />
            <ShareButtons title={title} />

            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t.blog.relatedPosts}
                </h3>
                <ul className="space-y-2">
                  {relatedPosts.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={`/blog/${r.slug}`}
                        className="text-primary hover:underline"
                      >
                        {language === "om" && r.title_om ? r.title_om : r.title_en}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function BlogPostClient({
  post,
  relatedPosts = [],
}: {
  post: BlogPost;
  relatedPosts?: RelatedPost[];
}) {
  return (
    <I18nProvider>
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </I18nProvider>
  );
}
