import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isValidSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import { CV_BLOB_PATHNAME, PHOTO_BLOB_PATHNAME } from "@/lib/blob-paths";

export const runtime = "nodejs";

const MAX_CV_SIZE = 10 * 1024 * 1024;
const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const type = formData.get("type");
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    if (type === "cv") {
      if (file.type !== "application/pdf") {
        return NextResponse.json({ error: "CV must be a PDF file" }, { status: 400 });
      }
      if (file.size > MAX_CV_SIZE) {
        return NextResponse.json({ error: "CV must be under 10MB" }, { status: 400 });
      }
      const blob = await put(CV_BLOB_PATHNAME, file, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: file.type,
      });
      return NextResponse.json({ ok: true, url: blob.url });
    }

    if (type === "photo") {
      if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
        return NextResponse.json({ error: "Photo must be JPEG, PNG, or WebP" }, { status: 400 });
      }
      if (file.size > MAX_PHOTO_SIZE) {
        return NextResponse.json({ error: "Photo must be under 5MB" }, { status: 400 });
      }
      const blob = await put(PHOTO_BLOB_PATHNAME, file, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: file.type,
      });
      return NextResponse.json({ ok: true, url: blob.url });
    }

    return NextResponse.json({ error: "Invalid upload type" }, { status: 400 });
  } catch (err) {
    console.error("Blob upload failed:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Storage error: ${message}` }, { status: 500 });
  }
}
