"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const US_URL = "https://geo-two-xi.vercel.app/?site_region=us";
const CA_URL = "https://geo-two-xi.vercel.app/?site_region=ca";

export default function Home() {
  const searchParams = useSearchParams();
  const [ip, setIp] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const siteRegion = searchParams.get("site_region")?.toLowerCase();
  const isUS = siteRegion === "us";
  const isCA = siteRegion === "ca";

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
        gap: 24,
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

      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Region</h2>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="button"
            onClick={() => { window.location.href = US_URL; }}
            style={{
              padding: "12px 24px",
              fontSize: 16,
              fontWeight: 600,
              border: "1px solid #333",
              borderRadius: 8,
              cursor: "pointer",
              background: isUS ? "#000" : "#fff",
              color: isUS ? "#fff" : "#000",
            }}
          >
            US
          </button>
          <button
            type="button"
            onClick={() => { window.location.href = CA_URL; }}
            style={{
              padding: "12px 24px",
              fontSize: 16,
              fontWeight: 600,
              border: "1px solid #333",
              borderRadius: 8,
              cursor: "pointer",
              background: isCA ? "#000" : "#fff",
              color: isCA ? "#fff" : "#000",
            }}
          >
            Canada
          </button>
        </div>
      </section>
    </main>
  );
}
