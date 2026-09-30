import { NextRequest, NextResponse } from "next/server";
import { isValidSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return NextResponse.json({ authenticated: isValidSessionToken(token) });
}
