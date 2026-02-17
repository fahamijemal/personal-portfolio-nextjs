"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { createClient } from "@/lib/supabase/client";

const CATEGORIES = [
  { value: "backend", label: "Backend" },
  { value: "frontend", label: "Frontend" },
  { value: "cloud", label: "Cloud & DevOps" },
  { value: "database", label: "Database" },
  { value: "tools", label: "Tools" },
] as const;

type Skill = {
  id: string;
  category: string;
  name: string;
  level: number;
  display_order: number;
};

export function SkillsAdminClient({
  initialSkills,
}: {
  initialSkills: Skill[];
}) {
  const [skills, setSkills] = useState(initialSkills);
  const [isOpen, setIsOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [levelValue, setLevelValue] = useState(80);
  const router = useRouter();

  const openEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setLevelValue(skill.level);
    setIsOpen(true);
  };

  const openNew = () => {
    setEditingSkill(null);
    setLevelValue(80);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingSkill(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      category: formData.get("category") as string,
      name: formData.get("name") as string,
      level: levelValue,
      display_order: parseInt(formData.get("display_order") as string) || 0,
    };

    const supabase = createClient();

    if (editingSkill) {
      await supabase.from("skills").update(data).eq("id", editingSkill.id);
    } else {
      await supabase.from("skills").insert(data);
    }

    handleClose();
    router.refresh();
    setIsLoading(false);

    const { data: updatedSkills } = await supabase
      .from("skills")
      .select("*")
      .order("category", { ascending: true })
      .order("display_order", { ascending: true });
    if (updatedSkills) setSkills(updatedSkills);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    const supabase = createClient();
    await supabase.from("skills").delete().eq("id", id);
    setSkills(skills.filter((s) => s.id !== id));
    router.refresh();
  };

  const groupedByCategory = CATEGORIES.map((cat) => ({
    ...cat,
    skills: skills.filter((s) => s.category === cat.value),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Skills</h1>
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
          <DialogTrigger asChild>
            <Button onClick={openNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingSkill ? "Edit Skill" : "New Skill"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  required
                  defaultValue={editingSkill?.category}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingSkill?.name}
                  required
                  placeholder="e.g. React"
                />
              </div>

              <div className="space-y-2">
                <Label>Level: {levelValue}%</Label>
                <Slider
                  value={[levelValue]}
                  onValueChange={([v]) => setLevelValue(v ?? 80)}
                  min={0}
                  max={100}
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  name="display_order"
                  type="number"
                  defaultValue={editingSkill?.display_order ?? 0}
                  min={0}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : editingSkill
                    ? "Update Skill"
                    : "Create Skill"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {groupedByCategory.map(({ value, label, skills: catSkills }) => (
          <Card key={value} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">{label}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {catSkills.length} skill{catSkills.length !== 1 ? "s" : ""}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {catSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex-1">
                      <span className="font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(skill)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(skill.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {catSkills.length === 0 && (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No skills in this category
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
