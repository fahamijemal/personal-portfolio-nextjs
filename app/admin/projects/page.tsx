import { createClient } from "@/lib/supabase/server";
import { ProjectsAdminClient } from "./projects-admin-client";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  return <ProjectsAdminClient initialProjects={projects || []} />;
}
