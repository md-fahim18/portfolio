import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("ADMIN_PASSWORD environment variable is not set");
  }
  return secret;
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function expectedSessionToken(): string {
  return createHmac("sha256", getSecret()).update("admin-session").digest("hex");
}

export function checkPassword(candidate: string): boolean {
  return safeCompare(candidate, getSecret());
}

export function createSessionToken(): string {
  return expectedSessionToken();
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  return safeCompare(token, expectedSessionToken());
}
