"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [ip, setIp] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/geo")
      .then((res) => res.json())
      .then((data: { ip?: string | null }) => setIp(data.ip ?? null))
      .catch(() => setIp(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        fontFamily: "system-ui, sans-serif",
        padding: 24,
      }}
    >
      <h1>Welcome</h1>
      {loading ? (
        <p style={{ color: "#666" }}>Loading…</p>
      ) : ip ? (
        <p>
          <strong>Your IP address:</strong> {ip}
        </p>
      ) : (
        <p style={{ color: "#666" }}>
          IP not available (deploy on Vercel to see it).
        </p>
      )}
    </main>
  );
}
