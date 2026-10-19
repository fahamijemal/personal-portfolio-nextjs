import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { CURRENT_CV_PATH, RESUME_STORAGE_FILE } from "@/lib/resume";

const RESUME_BUCKET = "resumes";
const SIGNED_URL_EXPIRY_SECONDS = 3600;

/**
 * GET /api/resume
 * Serves the bundled current CV unless a newer admin upload is available.
 */
export async function GET(request: Request) {
  const fallback = () =>
    NextResponse.redirect(new URL(CURRENT_CV_PATH, request.url), {
      status: 302,
      headers: { "Cache-Control": "no-store" },
    });
  try {
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createAdminClient()
      : await createClient();

    const { data, error } = await supabase.storage
      .from(RESUME_BUCKET)
      .createSignedUrl(RESUME_STORAGE_FILE, SIGNED_URL_EXPIRY_SECONDS);

    if (error || !data?.signedUrl) {
      return fallback();
    }

    return NextResponse.redirect(data.signedUrl, {
      status: 302,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return fallback();
  }
}
