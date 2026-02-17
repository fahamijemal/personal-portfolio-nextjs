import { createClient } from "@/lib/supabase/server";
import { fetchSocialLinks } from "@/lib/site-content";
import { CertificatesPageClient } from "./certificates-page-client";

export default async function CertificatesPage() {
  const supabase = await createClient();

  const [socialLinks, { data: certificates }] = await Promise.all([
    fetchSocialLinks(supabase),
    supabase
      .from("certificates")
      .select("id, title_en, title_om, issuer, credential_url, image_url, issued_at")
      .order("display_order", { ascending: true }),
  ]);

  return (
    <CertificatesPageClient
      certificates={certificates || []}
      socialLinks={socialLinks}
    />
  );
}

