"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import { skills } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  const { t } = useI18n();

  const categories = [
    { key: "backend" as const, data: skills.backend },
    { key: "frontend" as const, data: skills.frontend },
    { key: "cloud" as const, data: skills.cloud },
    { key: "database" as const, data: skills.database },
    { key: "tools" as const, data: skills.tools },
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
          {t.skills.title}
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          {t.skills.subtitle}
        </p>

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
                    <div key={skill.name}>
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
      </div>
    </section>
  );
}
