import { updateSession } from "@/lib/supabase/proxy";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Derive the document language from the route, never a caller's header.
  request.headers.set(
    "x-portfolio-language",
    request.nextUrl.pathname === "/om" ? "om" : "en",
  );
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
