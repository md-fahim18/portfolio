import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { CV_BLOB_PATHNAME, CV_FALLBACK_URL } from "@/lib/blob-paths";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const result = await get(CV_BLOB_PATHNAME, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) {
      throw new Error("Not found");
    }
    return new NextResponse(result.stream, {
      status: 200,
      headers: {
        "Content-Type": result.blob.contentType || "application/pdf",
        "Content-Disposition": result.blob.contentDisposition,
      },
    });
  } catch {
    return NextResponse.redirect(new URL(CV_FALLBACK_URL, request.url));
  }
}
