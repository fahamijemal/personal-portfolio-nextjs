"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const CATEGORY_ORDER = ["backend", "frontend", "cloud", "database", "tools"] as const;

type Skill = {
  id: string;
  category: string;
  name: string;
  level: number;
  display_order: number;
};

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const { t } = useI18n();

  const categories = CATEGORY_ORDER.map((key) => ({
    key,
    data: skills
      .filter((s) => s.category === key)
      .sort((a, b) => a.display_order - b.display_order),
  })).filter((cat) => cat.data.length > 0);

  const hasAnySkills = skills.length > 0;

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
          {t.skills.title}
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          {t.skills.subtitle}
        </p>

        {hasAnySkills ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.key} className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-foreground">
                    {t.skills.categories[category.key]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.data.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-foreground">{skill.name}</span>
                          <span className="text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full bg-primary rounded-full transition-all duration-500"
                            )}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            No skills added yet.
          </p>
        )}
      </div>
    </section>
  );
}
