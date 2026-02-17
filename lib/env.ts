/**
 * Environment variable validation.
 * Uses direct property access so Next.js can inline NEXT_PUBLIC_* vars at build time
 * (required for client-side bundles). Dynamic process.env[key] breaks inlining.
 */
export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url) throw new Error("Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL");
  if (!anonKey) throw new Error("Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return { url, anonKey };
}
