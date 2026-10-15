"use client";

import { ArrowUpRight, Code2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { personalBrand } from "@/lib/personal-seo";

export function FounderSection() {
  const { language } = useI18n();
  const om = language === "om";
  return (
    <section
      aria-labelledby="founder-title"
      className="border-y border-border bg-primary/5 px-4 py-16"
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-widest text-primary">
            {om
              ? "YAADA IRRAA GARA HOJIITTI"
              : "FROM IDEAS TO MEANINGFUL SOFTWARE"}
          </p>
          <h2
            id="founder-title"
            className="text-3xl font-bold leading-tight text-foreground"
          >
            {om
              ? "Hundeessaa IFAA TECHNOLOGIES."
              : "Founder of IFAA TECHNOLOGIES."}
          </h2>
        </div>
        <div>
          <p className="mb-6 leading-8 text-muted-foreground">
            {om
              ? "Ani Fahami Jemal Harun, hundeessaa IFAA TECHNOLOGIES dha. Sooftiweerii faayidaa qabu, oomisha dijitaalaa fi furmaata teeknooloojii namootaa fi dhaabbilee gargaaru ijaaruu irratti xiyyeeffadha. Kaayyoon koo teeknooloojiin Itoophiyaa, Oromiyaa fi isaaniin alatti carraa haaraa akka uumu gochuu dha."
              : "I’m Fahami Jemal Harun, founder of IFAA TECHNOLOGIES. My work connects software engineering with practical digital products and technology solutions for people and businesses, with a focus on Ethiopia and Oromia and possibilities beyond them."}
          </p>
          <a
            href={personalBrand.companyUrl}
            className="inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
          >
            <Code2 size={18} aria-hidden="true" />
            {om
              ? "Waa’ee IFAA TECHNOLOGIES baradhu"
              : "Discover IFAA TECHNOLOGIES"}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
