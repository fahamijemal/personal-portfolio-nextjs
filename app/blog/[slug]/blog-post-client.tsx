"use client";

import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";

type BlogPost = {
  id: string;
  slug: string;
  title_en: string;
  title_om: string | null;
  content_en: string;
  content_om: string | null;
  published_at: string | null;
};

function BlogPostContent({ post }: { post: BlogPost }) {
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
    language === "om" && post.content_om ? post.content_om : post.content_en;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <article className="max-w-3xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            {title}
          </h1>

          {post.published_at && (
            <div className="flex items-center text-muted-foreground mb-8">
              <Calendar className="h-4 w-4 mr-2" />
              {t.blog.publishedOn} {formatDate(post.published_at)}
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {content.split("\n").map((paragraph, index) => (
              <p key={index} className="text-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <I18nProvider>
      <BlogPostContent post={post} />
    </I18nProvider>
  );
}
