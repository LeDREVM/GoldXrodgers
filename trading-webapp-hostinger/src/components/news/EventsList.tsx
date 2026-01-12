// Events list component
import React from "react";
import type { EconomicEvent } from "../../types/economicEvent";
import ImpactBadge from "./ImpactBadge";
import { APP_TIMEZONE } from "../../config/constants";

function fmtEventTime(isoUtc: string) {
  const d = new Date(isoUtc);
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: APP_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(d);
}

export default function EventsList({ events }: { events: EconomicEvent[] }) {
  if (!events.length) {
    return <div className="muted">Aucun événement à venir (table vide).</div>;
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {events.map((e) => (
        <div
          key={e.id}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderRadius: 14,
            border: "1px solid var(--border)",
            background: "rgba(255,255,255,0.04)"
          }}
        >
          <div style={{ display: "grid", gap: 4 }}>
            <div style={{ fontWeight: 800 }}>{e.title}</div>
            <div className="muted" style={{ fontSize: 12 }}>
              {e.currency} • {fmtEventTime(e.event_time_utc)} (local)
            </div>
          </div>
          <ImpactBadge impact={e.impact} />
        </div>
      ))}
    </div>
  );
}
