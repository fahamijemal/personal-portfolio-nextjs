"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";

type BlogPost = {
  id: string;
  slug: string;
  title_en: string;
  title_om: string | null;
  excerpt_en: string | null;
  excerpt_om: string | null;
  published_at: string | null;
};

function BlogContent({ posts }: { posts: BlogPost[] }) {
  const { language, t } = useI18n();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t.blog.title}
          </h1>
          <p className="text-muted-foreground mb-12">{t.blog.subtitle}</p>

          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No blog posts yet. Check back soon!
            </p>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="bg-card border-border">
                  <CardHeader>
                    <h2 className="font-semibold text-xl text-foreground">
                      {language === "om" && post.title_om
                        ? post.title_om
                        : post.title_en}
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {language === "om" && post.excerpt_om
                        ? post.excerpt_om
                        : post.excerpt_en}
                    </p>
                    {post.published_at && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {t.blog.publishedOn} {formatDate(post.published_at)}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" asChild className="group">
                      <Link href={`/blog/${post.slug}`}>
                        {t.blog.readMore}
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  return (
    <I18nProvider>
      <BlogContent posts={posts} />
    </I18nProvider>
  );
}
