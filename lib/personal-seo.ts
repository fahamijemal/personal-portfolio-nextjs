import type { Metadata } from "next";
import { getSiteUrl, PERSONAL_ORIGIN } from "@/lib/site-url";

export const personalBrand = {
  name: "Fahami Jemal Harun",
  personId: `${PERSONAL_ORIGIN}/#person`,
  companyName: "IFAA TECHNOLOGIES",
  companyAliases: [
    "Ifaa Technology",
    "Ifaa Tech",
    "Ifaa Tech Ethiopia",
    "Ifaa Teknoonoojii",
    "Teknoolojii Ifaa",
  ],
  companyUrl: "https://www.ifaatechnologies.tech/",
  companyId: "https://www.ifaatechnologies.tech/#organization",
  github: "https://github.com/fahamijemal",
  linkedin: "https://linkedin.com/in/fahamijemal",
  telegram: "https://t.me/fahamijemal",
  description:
    "Fahami Jemal Harun is a software developer and founder of IFAA TECHNOLOGIES, building practical digital products and software with a focus on Ethiopia and Oromia.",
} as const;

export function publicPageMetadata({
  title,
  description,
  path,
  home = false,
  image,
  article,
}: {
  title: string;
  description: string;
  path: string;
  home?: boolean;
  image?: string;
  article?: { publishedAt?: string | null };
}): Metadata {
  const origin = getSiteUrl();
  const url = new URL(path, `${origin}/`).href;
  const fullTitle = home ? title : `${title} | ${personalBrand.name}`;
  const shareImage = image || `${origin}/opengraph-image`;
  return {
    title: home ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: article ? "article" : "website",
      url,
      title: fullTitle,
      description,
      siteName: personalBrand.name,
      locale: "en_ET",
      images: [
        {
          url: shareImage,
          alt: image
            ? title
            : `${personalBrand.name} — Software Developer & IFAA TECHNOLOGIES Founder`,
        },
      ],
      ...(article && {
        authors: [PERSONAL_ORIGIN],
        ...(article.publishedAt && { publishedTime: article.publishedAt }),
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },
  };
}

export const noIndexMetadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: null, languages: {} },
};

export function personalIdentityGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personalBrand.personId,
        name: personalBrand.name,
        url: `${PERSONAL_ORIGIN}/`,
        description: personalBrand.description,
        jobTitle: "Software Developer and Founder of IFAA TECHNOLOGIES",
        affiliation: { "@id": personalBrand.companyId },
        sameAs: [
          personalBrand.github,
          personalBrand.linkedin,
          personalBrand.telegram,
        ],
      },
      {
        "@type": "Organization",
        "@id": personalBrand.companyId,
        name: personalBrand.companyName,
        alternateName: personalBrand.companyAliases,
        url: personalBrand.companyUrl,
        founder: { "@id": personalBrand.personId },
      },
      {
        "@type": "WebSite",
        "@id": `${PERSONAL_ORIGIN}/#website`,
        url: `${PERSONAL_ORIGIN}/`,
        name: personalBrand.name,
        inLanguage: "en",
        publisher: { "@id": personalBrand.personId },
      },
    ],
  };
}

export function serializeStructuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function profilePageGraph(path: "/") {
  const url = new URL(path, `${PERSONAL_ORIGIN}/`).href;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    name: personalBrand.name,
    inLanguage: "en",
    mainEntity: { "@id": personalBrand.personId },
  };
}
