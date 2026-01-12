// Session clock component
import React, { useEffect, useState } from "react";
import { APP_TIMEZONE } from "../../config/constants";
import { NY_TIMEZONE } from "../../config/session";
import { formatClock, formatDate, getNySessionStatus, nowInTZ } from "../../lib/date";

export default function SessionClock() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const nyNow = nowInTZ(NY_TIMEZONE);
  const userNow = nowInTZ(APP_TIMEZONE);
  const s = getNySessionStatus();

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div className="row">
        <div className="col">
          <div className="badge" style={{ width: "fit-content" }}>
            <span>NY ({NY_TIMEZONE})</span>
            <b>{formatDate(new Date(), NY_TIMEZONE)}</b>
            <b>{formatClock(new Date(), NY_TIMEZONE)}</b>
          </div>
          <div className="muted" style={{ marginTop: 8 }}>
            Fenêtre : {s.nyOpen} → {s.nyClose} • Statut :{" "}
            <b style={{ color: s.isOpen ? "var(--ok)" : "var(--muted)" }}>
              {s.isOpen ? "OPEN" : "CLOSED"}
            </b>
          </div>
        </div>

        <div className="col">
          <div className="badge" style={{ width: "fit-content" }}>
            <span>Local ({APP_TIMEZONE})</span>
            <b>{formatDate(new Date(), APP_TIMEZONE)}</b>
            <b>{formatClock(new Date(), APP_TIMEZONE)}</b>
          </div>
          <div className="muted" style={{ marginTop: 8 }}>
            Repères locaux : {s.userOpen} → {s.userClose}
          </div>
        </div>
      </div>

      <hr className="sep" />

      <div className="muted" style={{ fontSize: 13 }}>
        Rule: tu trades NY open en positions courtes, validation H4 → exécution M15/M5.
      </div>
    </div>
  );
}
