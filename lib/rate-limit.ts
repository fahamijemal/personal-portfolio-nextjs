/**
 * In-memory rate limiter for API routes.
 * Resets on serverless cold starts. For production at scale, consider Upstash Redis.
 */

const store = new Map<
  string,
  { count: number; resetAt: number }
>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per window per IP

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function rateLimitContact(request: Request): {
  success: boolean;
  remaining: number;
  resetAt: number;
} {
  const ip = getClientIp(request);
  const now = Date.now();
  const record = store.get(ip);

  if (!record) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_MS };
  }

  if (now > record.resetAt) {
    const resetAt = now + WINDOW_MS;
    store.set(ip, { count: 1, resetAt });
    return { success: true, remaining: MAX_REQUESTS - 1, resetAt };
  }

  record.count += 1;
  const remaining = Math.max(0, MAX_REQUESTS - record.count);
  const success = record.count <= MAX_REQUESTS;

  return {
    success,
    remaining,
    resetAt: record.resetAt,
  };
}
