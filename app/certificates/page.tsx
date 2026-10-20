import { createClient } from "@/lib/supabase/server";
import { fetchSocialLinks } from "@/lib/site-content";
import { CertificatesPageClient } from "./certificates-page-client";
import { StructuredData } from "@/components/structured-data";
import { publicPageGraph, publicPageMetadata } from "@/lib/personal-seo";

export const metadata = publicPageMetadata({
  title: "Certificates & Credentials",
  description:
    "Browse the certificates and credential links published in Fahami Jemal Harun’s personal portfolio.",
  path: "/certificates",
});

export default async function CertificatesPage() {
  const supabase = await createClient();

  const [socialLinks, { data: certificates }] = await Promise.all([
    fetchSocialLinks(supabase),
    supabase
      .from("certificates")
      .select(
        "id, title_en, title_om, issuer, credential_url, image_url, issued_at",
      )
      .order("display_order", { ascending: true }),
  ]);

  return (
    <>
      <StructuredData
        value={publicPageGraph({
          path: "/certificates",
          name: "Certificates and credentials",
          description:
            "Credentials published by Fahami Jemal Harun, with links to issuing organizations.",
        })}
      />
      <CertificatesPageClient
        certificates={certificates || []}
        socialLinks={socialLinks}
      />
    </>
  );
}
