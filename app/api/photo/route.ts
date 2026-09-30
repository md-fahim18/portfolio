import { NextRequest, NextResponse } from "next/server";
import { head } from "@vercel/blob";
import { PHOTO_BLOB_PATHNAME, PHOTO_FALLBACK_URL } from "@/lib/blob-paths";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const blob = await head(PHOTO_BLOB_PATHNAME);
    return NextResponse.redirect(blob.url);
  } catch {
    return NextResponse.redirect(new URL(PHOTO_FALLBACK_URL, request.url));
  }
}
