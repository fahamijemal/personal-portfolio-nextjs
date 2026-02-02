import { createClient } from "@/lib/supabase/server";
import { CertificatesPageClient } from "./certificates-page-client";

export default async function CertificatesPage() {
  const supabase = await createClient();
  const { data: certificates } = await supabase
    .from("certificates")
    .select("id, title_en, title_om, issuer, credential_url, image_url, issued_at")
    .order("display_order", { ascending: true });

  return <CertificatesPageClient certificates={certificates || []} />;
}

