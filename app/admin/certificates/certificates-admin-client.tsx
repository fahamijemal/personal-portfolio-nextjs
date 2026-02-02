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
import { createClient } from "@/lib/supabase/client";

type Certificate = {
  id: string;
  title_en: string;
  title_om: string | null;
  issuer: string | null;
  credential_url: string;
  image_url: string | null;
  issued_at: string | null;
  display_order: number;
};

export function CertificatesAdminClient({
  initialCertificates,
}: {
  initialCertificates: Certificate[];
}) {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const openNew = () => {
    setEditing(null);
    setIsOpen(true);
  };

  const openEdit = (c: Certificate) => {
    setEditing(c);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this certificate?")) return;
    const supabase = createClient();
    await supabase.from("certificates").delete().eq("id", id);
    setCertificates((prev) => prev.filter((c) => c.id !== id));
    router.refresh();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title_en: formData.get("title_en") as string,
      title_om: ((formData.get("title_om") as string) || null) as string | null,
      issuer: ((formData.get("issuer") as string) || null) as string | null,
      credential_url: formData.get("credential_url") as string,
      image_url: ((formData.get("image_url") as string) || null) as string | null,
      issued_at: ((formData.get("issued_at") as string) || null) as string | null,
      display_order: parseInt(formData.get("display_order") as string) || 0,
    };

    const supabase = createClient();
    if (editing) {
      await supabase.from("certificates").update(data).eq("id", editing.id);
    } else {
      await supabase.from("certificates").insert(data);
    }

    setIsOpen(false);
    setEditing(null);
    router.refresh();

    const { data: updated } = await supabase
      .from("certificates")
      .select("*")
      .order("display_order", { ascending: true });
    setCertificates(updated || []);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Certificates</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Certificate" : "New Certificate"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title_en">Title (English)</Label>
                  <Input
                    id="title_en"
                    name="title_en"
                    defaultValue={editing?.title_en}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title_om">Title (Afaan Oromo)</Label>
                  <Input
                    id="title_om"
                    name="title_om"
                    defaultValue={editing?.title_om || ""}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuer</Label>
                  <Input id="issuer" name="issuer" defaultValue={editing?.issuer || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issued_at">Issued at (YYYY-MM-DD)</Label>
                  <Input
                    id="issued_at"
                    name="issued_at"
                    type="date"
                    defaultValue={editing?.issued_at || ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="credential_url">Credential URL</Label>
                <Input
                  id="credential_url"
                  name="credential_url"
                  type="url"
                  defaultValue={editing?.credential_url}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Badge Image URL (optional)</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  defaultValue={editing?.image_url || ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  name="display_order"
                  type="number"
                  defaultValue={editing?.display_order || 0}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {certificates.map((c) => (
          <Card key={c.id} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">{c.title_en}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {c.issuer ?? "—"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(c)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(c.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div className="flex flex-col gap-1">
                <span className="truncate">
                  <strong className="text-foreground">URL:</strong> {c.credential_url}
                </span>
                <span>
                  <strong className="text-foreground">Order:</strong> {c.display_order}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

