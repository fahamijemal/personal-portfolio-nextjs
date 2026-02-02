import { createClient } from "@/lib/supabase/server";
import { CertificatesAdminClient } from "./certificates-admin-client";

export default async function AdminCertificatesPage() {
  const supabase = await createClient();
  const { data: certificates } = await supabase
    .from("certificates")
    .select("*")
    .order("display_order", { ascending: true });

  return <CertificatesAdminClient initialCertificates={certificates || []} />;
}

