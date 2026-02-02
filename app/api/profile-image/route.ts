import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const AVATAR_BUCKET = "avatars";
const AVATAR_FILE_NAME = "profile.jpg";

/**
 * GET /api/profile-image
 * If service role is available, downloads the avatar from Storage and returns bytes.
 * Otherwise redirects to the stored URL (works when avatars bucket is public).
 */
export async function GET() {
  try {
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createAdminClient()
      : await createClient();

    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "profile_image_url")
      .maybeSingle();

    const url = data?.value?.trim();
    if (!url) return new NextResponse(null, { status: 404 });

    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const admin = createAdminClient();
      const { data: blob, error } = await admin.storage
        .from(AVATAR_BUCKET)
        .download(AVATAR_FILE_NAME);

      if (!error && blob) {
        const buffer = await blob.arrayBuffer();
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": blob.type || "image/jpeg",
            "Cache-Control": "public, max-age=300",
          },
        });
      }
    }

    return NextResponse.redirect(url, 302);
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}

