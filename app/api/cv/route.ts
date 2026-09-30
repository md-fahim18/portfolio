import { NextRequest, NextResponse } from "next/server";
import { head } from "@vercel/blob";
import { CV_BLOB_PATHNAME, CV_FALLBACK_URL } from "@/lib/blob-paths";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const blob = await head(CV_BLOB_PATHNAME);
    return NextResponse.redirect(blob.url);
  } catch {
    return NextResponse.redirect(new URL(CV_FALLBACK_URL, request.url));
  }
}
