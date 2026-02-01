"use client";

import { GraduationCap, Briefcase, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";

export function AboutSection() {
  const { t } = useI18n();

  const highlights = [
    {
      icon: GraduationCap,
      title: t.about.education,
      description: t.about.educationText,
    },
    {
      icon: Briefcase,
      title: t.about.experience,
      description: t.about.experienceText,
    },
    {
      icon: Heart,
      title: t.about.interests,
      description: t.about.interestsText,
    },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
          {t.about.title}
        </h2>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12 text-pretty">
          {t.about.description}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <Card key={item.title} className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
