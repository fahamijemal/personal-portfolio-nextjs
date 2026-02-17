"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  image_url?: string | null;
  tags?: string[] | null;
};

const POSTS_PER_PAGE = 9;

function BlogContent({ posts, initialTag }: { posts: BlogPost[]; initialTag?: string }) {
  const { language, t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filtered = posts.filter((post) => {
    const title = language === "om" && post.title_om ? post.title_om : post.title_en;
    const excerpt = language === "om" && post.excerpt_om ? post.excerpt_om : post.excerpt_en ?? "";
    const q = search.toLowerCase();
    return !q || title.toLowerCase().includes(q) || (excerpt && excerpt.toLowerCase().includes(q));
  });

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(0, page * POSTS_PER_PAGE);
  const hasMore = page < totalPages;

  const [featured, ...rest] = paginated;

  const clearTag = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("tag");
    router.push(`/blog${next.toString() ? `?${next}` : ""}`);
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
          <p className="text-muted-foreground mb-8">{t.blog.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />
            </div>
            {initialTag && (
              <Button variant="secondary" onClick={clearTag}>
                Clear filter: {initialTag}
              </Button>
            )}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              {initialTag || search ? "No posts match your filter." : "No blog posts yet. Check back soon!"}
            </p>
          ) : (
            <div className="grid gap-6">
              {featured && page === 1 && (
                <Card className="bg-card border-border overflow-hidden">
                  <Link href={`/blog/${featured.slug}`} className="block group">
                    {featured.image_url && (
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={featured.image_url}
                          alt=""
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 896px) 100vw, 896px"
                        />
                      </div>
                    )}
                    <CardHeader>
                      {featured.tags && featured.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {featured.tags.slice(0, 3).map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog?tag=${encodeURIComponent(tag)}`}
                              className="text-xs px-2 py-0.5 rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      )}
                      <h2 className="font-semibold text-2xl text-foreground group-hover:text-primary transition-colors">
                        {language === "om" && featured.title_om ? featured.title_om : featured.title_en}
                      </h2>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {language === "om" && featured.excerpt_om ? featured.excerpt_om : featured.excerpt_en}
                      </p>
                      {featured.published_at && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          {t.blog.publishedOn} {formatDate(featured.published_at)}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <span className="text-primary font-medium group-hover:underline flex items-center gap-1">
                        {t.blog.readMore}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardFooter>
                  </Link>
                </Card>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Card key={post.id} className="bg-card border-border overflow-hidden flex flex-col">
                  {post.image_url && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image_url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 896px) 100vw, 896px"
                      />
                    </div>
                  )}
                  <CardHeader>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Link
                            key={tag}
                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                            className="text-xs px-2 py-0.5 rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}
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

              {hasMore && (
                <div className="flex justify-center pt-8">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Load more
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function BlogPageClient({
  posts,
  initialTag,
}: {
  posts: BlogPost[];
  initialTag?: string;
}) {
  return (
    <I18nProvider>
      <BlogContent posts={posts} initialTag={initialTag} />
    </I18nProvider>
  );
}
