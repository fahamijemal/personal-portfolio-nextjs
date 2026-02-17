import { createClient } from "@/lib/supabase/server";
import { SkillsAdminClient } from "./skills-admin-client";

export default async function AdminSkillsPage() {
  const supabase = await createClient();

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("display_order", { ascending: true });

  return <SkillsAdminClient initialSkills={skills || []} />;
}
