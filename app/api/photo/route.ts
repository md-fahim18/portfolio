import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { PHOTO_BLOB_PATHNAME, PHOTO_FALLBACK_URL } from "@/lib/blob-paths";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const result = await get(PHOTO_BLOB_PATHNAME, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) {
      throw new Error("Not found");
    }
    return new NextResponse(result.stream, {
      status: 200,
      headers: {
        "Content-Type": result.blob.contentType || "image/jpeg",
        "Content-Disposition": "inline",
      },
    });
  } catch {
    return NextResponse.redirect(new URL(PHOTO_FALLBACK_URL, request.url));
  }
}
