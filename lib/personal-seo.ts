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
    "Fahami Jemal Harun, full-stack developer and IFAA TECHNOLOGIES founder in Ethiopia. Explore backend systems, AI engineering, project case studies, and technical writing.",
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
  article?: { publishedAt?: string | null; modifiedAt?: string | null };
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
      types: { "application/rss+xml": `${origin}/blog/feed.xml` },
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
        ...(article.modifiedAt && { modifiedTime: article.modifiedAt }),
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
        image: {
          "@type": "ImageObject",
          "@id": `${PERSONAL_ORIGIN}/#portrait`,
          contentUrl: `${PERSONAL_ORIGIN}/fahamijemal.jpg`,
          caption: personalBrand.name,
        },
        mainEntityOfPage: { "@id": `${PERSONAL_ORIGIN}/#profile` },
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
    primaryImageOfPage: { "@id": `${PERSONAL_ORIGIN}/#portrait` },
  };
}

/** Crawlable page hierarchy and lists use the same public URLs as the interface. */
export function publicPageGraph({
  path,
  name,
  description,
  parent,
  items,
  mainEntityId,
}: {
  path: string;
  name: string;
  description: string;
  parent?: { path: string; name: string };
  items?: { path: string; name: string }[];
  mainEntityId?: string;
}) {
  const url = new URL(path, PERSONAL_ORIGIN).href;
  const hierarchy = [
    { path: "/", name: personalBrand.name },
    ...(parent ? [parent] : []),
    { path, name },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": items ? "CollectionPage" : "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en",
        isPartOf: { "@id": `${PERSONAL_ORIGIN}/#website` },
        author: { "@id": personalBrand.personId },
        breadcrumb: { "@id": `${url}#breadcrumbs` },
        ...(items && { mainEntity: { "@id": `${url}#list` } }),
        ...(mainEntityId && { mainEntity: { "@id": mainEntityId } }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: hierarchy.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: new URL(item.path, PERSONAL_ORIGIN).href,
        })),
      },
      ...(items
        ? [
            {
              "@type": "ItemList",
              "@id": `${url}#list`,
              numberOfItems: items.length,
              itemListElement: items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                url: new URL(item.path, PERSONAL_ORIGIN).href,
              })),
            },
          ]
        : []),
    ],
  };
}
