import type { User } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Checks if the user is an admin. Prefers profiles.is_admin, falls back to
 * user_metadata.is_admin for backward compatibility during migration.
 */
export async function getIsAdmin(
  supabase: SupabaseClient,
  user: User
): Promise<boolean> {
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (profile?.is_admin === true) return true;

  // Fallback: existing admin users may only have user_metadata.is_admin
  return user.user_metadata?.is_admin === true;
}
