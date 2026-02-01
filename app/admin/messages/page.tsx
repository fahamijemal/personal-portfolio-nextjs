import { createClient } from "@/lib/supabase/server";
import { MessagesAdminClient } from "./messages-admin-client";

export default async function AdminMessagesPage() {
  const supabase = await createClient();

  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return <MessagesAdminClient initialMessages={messages || []} />;
}
