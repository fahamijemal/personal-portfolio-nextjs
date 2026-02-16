import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimitContact } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less")
    .trim(),
  email: z.string().email("Invalid email address").max(254),
  subject: z.string().max(200, "Subject must be 200 characters or less").optional().or(z.literal("")),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message must be 5000 characters or less"),
});

export async function POST(request: Request) {
  const rateLimit = rateLimitContact(request);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const parseResult = contactSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0];
      const message = firstError?.message ?? "Invalid input";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { name, email, subject, message } = parseResult.data;

    const supabase = await createClient();

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject: subject || null,
      message,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to save message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
