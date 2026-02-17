"use client";

import React from "react";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, Loader2 } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";
import { MarkdownContent } from "@/components/blog/markdown-content";
import type { BlogPost } from "@/lib/types";

function MarkdownPreview({ content }: { content: string }) {
  return (
    <div className="min-h-[200px] rounded-lg border border-border bg-muted/30 p-4">
      <MarkdownContent content={content || "*No content yet*"} className="prose-sm" />
    </div>
  );
}

const BLOG_IMAGES_BUCKET = "blog-images";

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
  const [contentEn, setContentEn] = useState("");
  const [contentOm, setContentOm] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    setContentEn(editingPost?.content_en ?? "");
    setContentOm(editingPost?.content_om ?? "");
    setImageUrl(editingPost?.image_url ?? null);
    setTagsInput((editingPost?.tags ?? []).join(", "));
  }, [editingPost]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const isPublished = formData.get("published") === "on";
    const tags = (formData.get("tags") as string)
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) ?? [];

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
      image_url: imageUrl,
      tags,
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
    setContentEn(post.content_en ?? "");
    setContentOm(post.content_om ?? "");
    setImageUrl(post.image_url ?? null);
    setTagsInput((post.tags ?? []).join(", "));
    setIsOpen(true);
  };

  const openNew = () => {
    setEditingPost(null);
    setContentEn("");
    setContentOm("");
    setImageUrl(null);
    setTagsInput("");
    setIsOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setIsImageUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${editingPost?.id ?? `new-${Date.now()}`}-${Date.now()}.${ext}`;

    try {
      const { error } = await supabase.storage
        .from(BLOG_IMAGES_BUCKET)
        .upload(path, file, { upsert: true });
      if (error) throw error;

      const { data } = supabase.storage
        .from(BLOG_IMAGES_BUCKET)
        .getPublicUrl(path);
      setImageUrl(data.publicUrl);
    } catch {
      // Bucket may not exist; allow manual URL
      setImageUrl(null);
    } finally {
      setIsImageUploading(false);
      e.target.value = "";
    }
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

              <div className="space-y-2">
                <Label>Cover Image</Label>
                <input
                  ref={imageFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  aria-hidden
                  onChange={handleImageUpload}
                />
                <div className="flex items-center gap-4">
                  {imageUrl && (
                    <div className="relative h-24 w-32 rounded border border-border overflow-hidden shrink-0">
                      <img
                        src={imageUrl}
                        alt="Cover preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => imageFileRef.current?.click()}
                      disabled={isImageUploading}
                    >
                      {isImageUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      {isImageUploading ? "Uploading..." : "Upload image"}
                    </Button>
                    <Input
                      placeholder="Or paste image URL"
                      value={imageUrl ?? ""}
                      onChange={(e) => setImageUrl(e.target.value || null)}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="React, Cloud, TypeScript"
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
                <Label htmlFor="content_en">Content (English) – Markdown</Label>
                <Tabs defaultValue="edit" className="w-full">
                  <TabsList>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview-en">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="edit">
                    <Textarea
                      id="content_en"
                      name="content_en"
                      value={contentEn}
                      onChange={(e) => setContentEn(e.target.value)}
                      required
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </TabsContent>
                  <TabsContent value="preview-en">
                    <MarkdownPreview content={contentEn} />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content_om">Content (Afaan Oromo) – Markdown</Label>
                <Tabs defaultValue="edit" className="w-full">
                  <TabsList>
                    <TabsTrigger value="edit-om">Edit</TabsTrigger>
                    <TabsTrigger value="preview-om">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="edit-om">
                    <Textarea
                      id="content_om"
                      name="content_om"
                      value={contentOm}
                      onChange={(e) => setContentOm(e.target.value)}
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </TabsContent>
                  <TabsContent value="preview-om">
                    <MarkdownPreview content={contentOm} />
                  </TabsContent>
                </Tabs>
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
                {post.excerpt_en || (post.content_en ?? "").slice(0, 200)}...
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
