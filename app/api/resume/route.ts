import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const RESUME_BUCKET = "resumes";
const RESUME_FILE_NAME = "resume.pdf";
const SIGNED_URL_EXPIRY_SECONDS = 3600;

/**
 * GET /api/resume
 * Redirects to a signed URL for the resume file (works with private buckets).
 */
export async function GET() {
  try {
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createAdminClient()
      : await createClient();

    const { data, error } = await supabase.storage
      .from(RESUME_BUCKET)
      .createSignedUrl(RESUME_FILE_NAME, SIGNED_URL_EXPIRY_SECONDS);

    if (error || !data?.signedUrl) {
      return NextResponse.json({ error: "Resume not available" }, { status: 404 });
    }

    return NextResponse.redirect(data.signedUrl, 302);
  } catch {
    return NextResponse.json({ error: "Resume not available" }, { status: 500 });
  }
}

