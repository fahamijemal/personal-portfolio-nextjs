"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

type BlogPost = {
  id: string;
  slug: string;
  title_en: string;
  title_om: string | null;
  excerpt_en: string | null;
  excerpt_om: string | null;
  content_en: string;
  content_om: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function BlogAdminClient({
  initialPosts,
}: {
  initialPosts: BlogPost[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const isPublished = formData.get("published") === "on";
    const data = {
      slug:
        (formData.get("slug") as string) ||
        generateSlug(formData.get("title_en") as string),
      title_en: formData.get("title_en") as string,
      title_om: (formData.get("title_om") as string) || null,
      excerpt_en: (formData.get("excerpt_en") as string) || null,
      excerpt_om: (formData.get("excerpt_om") as string) || null,
      content_en: formData.get("content_en") as string,
      content_om: (formData.get("content_om") as string) || null,
      published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
    };

    const supabase = createClient();

    if (editingPost) {
      await supabase.from("blog_posts").update(data).eq("id", editingPost.id);
    } else {
      await supabase.from("blog_posts").insert(data);
    }

    setIsOpen(false);
    setEditingPost(null);
    router.refresh();
    setIsLoading(false);

    const { data: updatedPosts } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (updatedPosts) setPosts(updatedPosts);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const supabase = createClient();
    await supabase.from("blog_posts").delete().eq("id", id);
    setPosts(posts.filter((p) => p.id !== id));
    router.refresh();
  };

  const togglePublish = async (post: BlogPost) => {
    const supabase = createClient();
    const newPublished = !post.published;
    await supabase
      .from("blog_posts")
      .update({
        published: newPublished,
        published_at: newPublished ? new Date().toISOString() : null,
      })
      .eq("id", post.id);

    setPosts(
      posts.map((p) =>
        p.id === post.id
          ? {
              ...p,
              published: newPublished,
              published_at: newPublished ? new Date().toISOString() : null,
            }
          : p
      )
    );
    router.refresh();
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsOpen(true);
  };

  const openNew = () => {
    setEditingPost(null);
    setIsOpen(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Post" : "New Blog Post"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title_en">Title (English)</Label>
                  <Input
                    id="title_en"
                    name="title_en"
                    defaultValue={editingPost?.title_en}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title_om">Title (Afaan Oromo)</Label>
                  <Input
                    id="title_om"
                    name="title_om"
                    defaultValue={editingPost?.title_om || ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  defaultValue={editingPost?.slug}
                  placeholder="auto-generated-from-title"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="excerpt_en">Excerpt (English)</Label>
                  <Textarea
                    id="excerpt_en"
                    name="excerpt_en"
                    defaultValue={editingPost?.excerpt_en || ""}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt_om">Excerpt (Afaan Oromo)</Label>
                  <Textarea
                    id="excerpt_om"
                    name="excerpt_om"
                    defaultValue={editingPost?.excerpt_om || ""}
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content_en">Content (English)</Label>
                <Textarea
                  id="content_en"
                  name="content_en"
                  defaultValue={editingPost?.content_en}
                  required
                  rows={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content_om">Content (Afaan Oromo)</Label>
                <Textarea
                  id="content_om"
                  name="content_om"
                  defaultValue={editingPost?.content_om || ""}
                  rows={8}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="published"
                  name="published"
                  defaultChecked={editingPost?.published}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : editingPost
                    ? "Update Post"
                    : "Create Post"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="bg-card border-border">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-foreground flex items-center gap-2">
                  {post.title_en}
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  /{post.slug}{" "}
                  {post.published_at && `• ${formatDate(post.published_at)}`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePublish(post)}
                  title={post.published ? "Unpublish" : "Publish"}
                >
                  {post.published ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={() => openEdit(post)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.excerpt_en || post.content_en.slice(0, 200)}...
              </p>
            </CardContent>
          </Card>
        ))}

        {posts.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No blog posts yet. Write your first post!
          </p>
        )}
      </div>
    </div>
  );
}
