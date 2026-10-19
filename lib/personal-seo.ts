import type { Metadata } from "next";
import { getSiteUrl, PERSONAL_ORIGIN } from "@/lib/site-url";

export const personalBrand = {
  name: "Fahami Jemal Harun",
  // Search/name variants supplied by the owner; keep one canonical identity.
  nameVariants: [
    "Fahami",
    "Fami",
    "Fahmi",
    "Fahami Jemal",
    "Fahami Jamal",
    "Fahami Jamel",
  ],
  title: "Fahami Jemal Harun | Developer & Founder, IFAA Technologies",
  location: { city: "Adama", region: "Oromia", country: "Ethiopia" },
  topics: [
    "Software engineering",
    "Full-stack development",
    "Backend development",
    "Cloud computing",
    "Digital products",
    "Agentic AI development",
    "Spec-driven development",
    "Retrieval-augmented generation",
    "Prompt engineering",
    "Model Context Protocol (MCP)",
    "LangGraph",
    "Software development lifecycle",
    "Requirements engineering",
    "Software testing",
    "Entrepreneurship",
  ],
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
    "Fahami Jemal Harun is a full-stack developer, Software Engineering student, and founder of IFAA TECHNOLOGIES, building digital products with agentic AI, spec-driven development, and thoughtful engineering in Ethiopia.",
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
    robots: {
      index: process.env.VERCEL_ENV !== "preview",
      follow: true,
      googleBot: {
        index: process.env.VERCEL_ENV !== "preview",
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
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
        alternateName: personalBrand.nameVariants,
        knowsAbout: personalBrand.topics,
        knowsLanguage: ["English", "Afaan Oromo", "Amharic"],
        homeLocation: {
          "@type": "City",
          name: personalBrand.location.city,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: personalBrand.location.region,
            containedInPlace: {
              "@type": "Country",
              name: personalBrand.location.country,
            },
          },
        },
        subjectOf: { "@id": `${PERSONAL_ORIGIN}/#profile` },
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
        about: { "@id": personalBrand.personId },
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
    description: personalBrand.description,
    isPartOf: { "@id": `${PERSONAL_ORIGIN}/#website` },
    inLanguage: "en",
    mainEntity: { "@id": personalBrand.personId },
  };
}
