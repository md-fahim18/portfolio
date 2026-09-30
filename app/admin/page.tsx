"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CheckStatus = "loading" | "authenticated" | "unauthenticated";

export default function AdminPage() {
  const [status, setStatus] = useState<CheckStatus>("loading");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => setStatus(data.authenticated ? "authenticated" : "unauthenticated"))
      .catch(() => setStatus("unauthenticated"));
  }, []);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setLoggingIn(true);
    setLoginError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoggingIn(false);

    if (res.ok) {
      setStatus("authenticated");
      setPassword("");
    } else {
      const data = await res.json().catch(() => ({}));
      setLoginError(data.error ?? "Incorrect password");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setStatus("unauthenticated");
  }

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter the admin password to manage your CV and photo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              {loginError && (
                <p className="text-sm text-destructive">{loginError}</p>
              )}
              <Button type="submit" className="w-full" disabled={loggingIn}>
                {loggingIn ? "Checking..." : "Log In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Site Admin</h1>
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        </div>

        <UploadCard
          type="cv"
          title="CV / Resume"
          description="Upload a PDF to replace the downloadable CV on your site."
          accept="application/pdf"
        />

        <UploadCard
          type="photo"
          title="Profile Photo"
          description="Upload a JPEG, PNG, or WebP image to replace your hero photo."
          accept="image/jpeg,image/png,image/webp"
        />
      </div>
    </main>
  );
}

function UploadCard({
  type,
  title,
  description,
  accept,
}: {
  type: "cv" | "photo";
  title: string;
  description: string;
  accept: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.set("type", type);
    formData.set("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    if (res.ok) {
      setMessage({ kind: "success", text: "Uploaded. Live on the site immediately." });
      setFile(null);
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage({ kind: "error", text: data.error ?? "Upload failed" });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="file"
          accept={accept}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        {message && (
          <p
            className={
              message.kind === "success"
                ? "text-sm text-primary"
                : "text-sm text-destructive"
            }
          >
            {message.text}
          </p>
        )}
        <Button onClick={handleUpload} disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </CardContent>
    </Card>
  );
}
