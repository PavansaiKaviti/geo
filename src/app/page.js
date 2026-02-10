"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [geo, setGeo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        setGeo(data);
        setError(null);
      })
      .catch(() => setError("Could not load location"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Geolocation (Vercel)</h1>
          <p>
            This page uses{" "}
            <a
              href="https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions#using-the-geolocation-helper"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel geo IP headers
            </a>{" "}
            via <code>@vercel/functions</code> to show your location. Headers are only set when deployed on Vercel.
          </p>
          {loading && <p className={styles.geoStatus}>Loading…</p>}
          {error && <p className={styles.geoError}>{error}</p>}
          {!loading && !error && geo && (
            <div className={styles.geoCard}>
              <h2>Your location</h2>
              <dl className={styles.geoList}>
                {geo.city != null && (
                  <>
                    <dt>City</dt>
                    <dd>{geo.city}</dd>
                  </>
                )}
                {geo.region != null && (
                  <>
                    <dt>Region</dt>
                    <dd>{geo.region}</dd>
                  </>
                )}
                {geo.country != null && (
                  <>
                    <dt>Country</dt>
                    <dd>{geo.country}</dd>
                  </>
                )}
                {geo.latitude != null && geo.longitude != null && (
                  <>
                    <dt>Coordinates</dt>
                    <dd>{geo.latitude}, {geo.longitude}</dd>
                  </>
                )}
              </dl>
              {!geo.city && !geo.country && (
                <p className={styles.geoHint}>
                  No geo data — run this app on Vercel to see your location.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
