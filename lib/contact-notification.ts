export type ContactNotification = {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
};
/** Optional server-only notification; saving the inbox message remains the primary action. */
export async function notifyContact(
  message: ContactNotification,
  config = {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_NOTIFICATION_FROM,
    to: process.env.CONTACT_NOTIFICATION_TO,
  },
  send: typeof fetch = fetch,
): Promise<"sent" | "skipped" | "failed"> {
  if (!config.apiKey || !config.from || !config.to) return "skipped";
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: message.email,
        subject: `Portfolio inquiry: ${(message.subject || "New message").replace(/[\r\n]/g, " ").slice(0, 120)}`,
        text: `From: ${message.name}\nEmail: ${message.email}\n\n${message.message}`,
      }),
      signal: AbortSignal.timeout(5000),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
