"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
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

type Project = {
  id: string;
  title_en: string;
  title_om: string | null;
  description_en: string;
  description_om: string | null;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  display_order: number;
};

export function ProjectsAdminClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title_en: formData.get("title_en") as string,
      title_om: (formData.get("title_om") as string) || null,
      description_en: formData.get("description_en") as string,
      description_om: (formData.get("description_om") as string) || null,
      technologies: (formData.get("technologies") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      github_url: (formData.get("github_url") as string) || null,
      live_url: (formData.get("live_url") as string) || null,
      featured: formData.get("featured") === "on",
      display_order: parseInt(formData.get("display_order") as string) || 0,
    };

    const supabase = createClient();

    if (editingProject) {
      await supabase.from("projects").update(data).eq("id", editingProject.id);
    } else {
      await supabase.from("projects").insert(data);
    }

    setIsOpen(false);
    setEditingProject(null);
    router.refresh();
    setIsLoading(false);

    const { data: updatedProjects } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });
    if (updatedProjects) setProjects(updatedProjects);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const supabase = createClient();
    await supabase.from("projects").delete().eq("id", id);
    setProjects(projects.filter((p) => p.id !== id));
    router.refresh();
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setIsOpen(true);
  };

  const openNew = () => {
    setEditingProject(null);
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Projects</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "New Project"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title_en">Title (English)</Label>
                  <Input
                    id="title_en"
                    name="title_en"
                    defaultValue={editingProject?.title_en}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title_om">Title (Afaan Oromo)</Label>
                  <Input
                    id="title_om"
                    name="title_om"
                    defaultValue={editingProject?.title_om || ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description_en">Description (English)</Label>
                <Textarea
                  id="description_en"
                  name="description_en"
                  defaultValue={editingProject?.description_en}
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description_om">Description (Afaan Oromo)</Label>
                <Textarea
                  id="description_om"
                  name="description_om"
                  defaultValue={editingProject?.description_om || ""}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">
                  Technologies (comma-separated)
                </Label>
                <Input
                  id="technologies"
                  name="technologies"
                  defaultValue={editingProject?.technologies?.join(", ")}
                  placeholder="React, Node.js, PostgreSQL"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    name="github_url"
                    type="url"
                    defaultValue={editingProject?.github_url || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="live_url">Live URL</Label>
                  <Input
                    id="live_url"
                    name="live_url"
                    type="url"
                    defaultValue={editingProject?.live_url || ""}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    name="display_order"
                    type="number"
                    defaultValue={editingProject?.display_order || 0}
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch
                    id="featured"
                    name="featured"
                    defaultChecked={editingProject?.featured}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : editingProject
                    ? "Update Project"
                    : "Create Project"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-card border-border">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-foreground flex items-center gap-2">
                  {project.title_en}
                  {project.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Order: {project.display_order}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(project)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {project.description_en}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.technologies?.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No projects yet. Add your first project!
          </p>
        )}
      </div>
    </div>
  );
}
