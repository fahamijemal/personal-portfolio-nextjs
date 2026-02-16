"use client";

import React from "react"

import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n/context";

export function ContactSection() {
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.error ?? t.contact.error);
        setStatus("error");
      }
    } catch {
      setStatus("error");
      setErrorMessage(t.contact.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
          {t.contact.title}
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          {t.contact.subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Email</h3>
                    <a
                      href="mailto:fahamijemal1@gmail.com"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      fahamijemal1@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Location</h3>
                    <p className="text-sm text-muted-foreground">
                      Adama, Ethiopia
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.contact.name}</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t.contact.namePlaceholder}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.contact.email}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t.contact.emailPlaceholder}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{t.contact.subject}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder={t.contact.subjectPlaceholder}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t.contact.message}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t.contact.messagePlaceholder}
                    rows={4}
                    required
                  />
                </div>

                {status === "success" && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {t.contact.success}
                  </p>
                )}
                {status === "error" && errorMessage && (
                  <p className="text-sm text-destructive">{errorMessage}</p>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    t.contact.sending
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t.contact.send}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
