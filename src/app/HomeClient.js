"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

function setRegionCookie(region) {
  const value = region === "us" ? "us" : "ca";
  document.cookie = `region=${value}; path=/; max-age=31536000`;
}

export default function HomeClient({ region }) {
  const [geo, setGeo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestedRegion, setRequestedRegion] = useState(null);

  const handleSetRegion = (value) => {
    setRegionCookie(value);
    setRequestedRegion(value);
  };

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

  const regionMessage =
    region === "us"
      ? "You are in US region"
      : region === "ca"
      ? "You're in Canada"
      : null;

  const requestedMessage =
    requestedRegion === "us"
      ? "User requested to use US region"
      : requestedRegion === "ca"
      ? "User requested to use Canada region"
      : null;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          {regionMessage && (
            <p className={styles.regionBanner}>{regionMessage}</p>
          )}

          <div className={styles.regionSection}>
            <h2 className={styles.regionTitle}>Set your region</h2>
            <p className={styles.regionDesc}>
              Choose US or Canada — a cookie will be set. Then open Region
              Content to see it.
            </p>
            <div className={styles.regionButtons}>
              <button
                type="button"
                className={styles.regionBtn}
                onClick={() => handleSetRegion("us")}
              >
                US
              </button>
              <button
                type="button"
                className={styles.regionBtn}
                onClick={() => handleSetRegion("ca")}
              >
                Canada
              </button>
            </div>
            {requestedMessage && (
              <p className={styles.requestedMessage}>{requestedMessage}</p>
            )}
            <Link href="/regionContent" className={styles.regionLink}>
              Go to Region Content →
            </Link>
          </div>

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
                    <dd>
                      {geo.latitude}, {geo.longitude}
                    </dd>
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
