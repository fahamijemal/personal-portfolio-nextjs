"use client";

import { GraduationCap, Briefcase, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import type { AboutContent } from "@/lib/site-content";

type AboutSectionProps = {
  aboutContent?: AboutContent | null;
};

export function AboutSection({ aboutContent }: AboutSectionProps) {
  const { t, language } = useI18n();

  const title =
    (language === "om" && aboutContent?.title_om) || aboutContent?.title_en || t.about.title;
  const description =
    (language === "om" && aboutContent?.description_om) ||
    aboutContent?.description_en ||
    t.about.description;

  const educationTitle =
    (language === "om" && aboutContent?.education_om) ||
    aboutContent?.education_en ||
    t.about.education;
  const educationText =
    (language === "om" && aboutContent?.education_text_om) ||
    aboutContent?.education_text_en ||
    t.about.educationText;

  const experienceTitle =
    (language === "om" && aboutContent?.experience_om) ||
    aboutContent?.experience_en ||
    t.about.experience;
  const experienceText =
    (language === "om" && aboutContent?.experience_text_om) ||
    aboutContent?.experience_text_en ||
    t.about.experienceText;

  const interestsTitle =
    (language === "om" && aboutContent?.interests_om) ||
    aboutContent?.interests_en ||
    t.about.interests;
  const interestsText =
    (language === "om" && aboutContent?.interests_text_om) ||
    aboutContent?.interests_text_en ||
    t.about.interestsText;

  const highlights = [
    { icon: GraduationCap, title: educationTitle, description: educationText },
    { icon: Briefcase, title: experienceTitle, description: experienceText },
    { icon: Heart, title: interestsTitle, description: interestsText },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
          {title}
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-lg leading-7 whitespace-pre-line text-pretty">
          {description}
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
                  <p className="text-sm text-muted-foreground whitespace-pre-line text-left w-full">
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
