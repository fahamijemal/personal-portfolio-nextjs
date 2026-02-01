import { createClient } from "@/lib/supabase/server";
import { SettingsAdminClient } from "./settings-admin-client";

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  const { data: settings } = await supabase.from("site_settings").select("*");

  const settingsMap: Record<string, string> = {};
  settings?.forEach((s) => {
    settingsMap[s.key] = s.value || "";
  });

  return <SettingsAdminClient initialSettings={settingsMap} />;
}
