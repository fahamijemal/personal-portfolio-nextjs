"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import type { BlogPost } from "@/lib/types";

export function BlogSection({ posts }: { posts: BlogPost[] }) {
  const { language, t } = useI18n();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(
      language === "om" ? "en-US" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  return (
    <section id="blog" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
          {t.blog.title}
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          {t.blog.subtitle}
        </p>

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No blog posts yet. Check back soon!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="bg-card border-border flex flex-col"
              >
                <CardHeader>
                  <h3 className="font-semibold text-lg text-foreground line-clamp-2">
                    {language === "om" && post.title_om
                      ? post.title_om
                      : post.title_en}
                  </h3>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {language === "om" && post.excerpt_om
                      ? post.excerpt_om
                      : post.excerpt_en}
                  </p>
                  {post.published_at && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {t.blog.publishedOn} {formatDate(post.published_at)}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild className="group">
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

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/blog">{t.blog.viewAll}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
