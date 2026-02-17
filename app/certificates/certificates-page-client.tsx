"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import type { Certificate } from "@/lib/types";

function CertificatesContent({ certificates }: { certificates: Certificate[] }) {
  const { language, t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t.certificates.title}
          </h1>
          <p className="text-muted-foreground mb-12">{t.certificates.subtitle}</p>

          {certificates.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No certificates yet. Check back soon!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((c) => (
                <Card key={c.id} className="bg-card border-border flex flex-col">
                  <CardHeader>
                    <h2 className="font-semibold text-lg text-foreground">
                      {language === "om" && c.title_om ? c.title_om : c.title_en}
                    </h2>
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
                        className="w-full h-44 object-contain rounded-md bg-secondary/20"
                      />
                    ) : null}
                    {c.issued_at ? (
                      <p className="text-xs text-muted-foreground mt-3">
                        {t.certificates.issued}: {new Date(c.issued_at).toLocaleDateString()}
                      </p>
                    ) : null}
                  </CardContent>
                  <CardFooter>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function CertificatesPageClient({ certificates }: { certificates: Certificate[] }) {
  return (
    <I18nProvider>
      <CertificatesContent certificates={certificates} />
    </I18nProvider>
  );
}

