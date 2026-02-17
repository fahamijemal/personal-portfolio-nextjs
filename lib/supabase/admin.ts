import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/env";

/**
 * Server-only Supabase client using the service role key.
 * Use ONLY in API routes / server code.
 */
export function createAdminClient() {
  const { url } = getSupabaseConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

  return createClient(url, serviceRoleKey, { auth: { persistSession: false } });
}

