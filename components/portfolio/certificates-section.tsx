"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import type { Certificate } from "@/lib/types";

export function CertificatesSection({ certificates }: { certificates: Certificate[] }) {
  const { language, t } = useI18n();

  return (
    <section id="certificates" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
          {t.certificates.title}
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          {t.certificates.subtitle}
        </p>

        {certificates.length === 0 ? (
          <p className="text-center text-muted-foreground py-10">No certificates yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((c) => (
              <Card key={c.id} className="bg-card border-border flex flex-col">
                <CardHeader>
                  <h3 className="font-semibold text-lg text-foreground">
                    {language === "om" && c.title_om ? c.title_om : c.title_en}
                  </h3>
                  {c.issuer ? (
                    <p className="text-sm text-muted-foreground">{c.issuer}</p>
                  ) : null}
                </CardHeader>
                <CardContent className="flex-1">
                  {c.image_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={c.image_url}
                      alt={c.title_en}
                      className="w-full h-40 object-contain rounded-md bg-secondary/20"
                    />
                  ) : null}
                  {c.issued_at ? (
                    <p className="text-xs text-muted-foreground mt-3">
                      {t.certificates.issued}: {new Date(c.issued_at).toLocaleDateString()}
                    </p>
                  ) : null}
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm" asChild>
                    <a href={c.credential_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {t.certificates.viewCredential}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/certificates">{t.certificates.viewAll}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

