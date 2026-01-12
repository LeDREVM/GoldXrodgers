// News gate component
import React, { useEffect, useMemo, useState } from "react";
import { listUpcomingEvents } from "../../services/events.service";
import type { EconomicEvent } from "../../types/economicEvent";
import EventsList from "./EventsList";
import { APP_TIMEZONE } from "../../config/constants";

function minutesBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 60000);
}

export default function NewsGate() {
  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [windowMin, setWindowMin] = useState(90); // fenêtre “danger” en minutes

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const data = await listUpcomingEvents(25);
        if (!mounted) return;
        setEvents(data);
      } catch (ex: any) {
        if (!mounted) return;
        setErr(ex?.message || "Erreur chargement news.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const gate = useMemo(() => {
    const now = new Date();
    const high = events.filter((e) => e.impact === "HIGH");
    const nextHigh = high[0];
    if (!nextHigh) {
      return { status: "TRADE OK" as const, detail: "Aucun HIGH impact détecté." };
    }
    const mins = minutesBetween(now, new Date(nextHigh.event_time_utc));
    if (mins <= windowMin) {
      return {
        status: "NO TRADE" as const,
        detail: `HIGH impact dans ${mins} min (${nextHigh.currency})`
      };
    }
    return {
      status: "TRADE OK" as const,
      detail: `Prochain HIGH impact dans ${mins} min (${nextHigh.currency})`
    };
  }, [events, windowMin]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="row" style={{ alignItems: "center" }}>
        <div className="col">
          <div className="badge" style={{ width: "fit-content" }}>
            <b
              style={{
                color: gate.status === "NO TRADE" ? "var(--danger)" : "var(--ok)"
              }}
            >
              {gate.status}
            </b>
            <span className="muted">{gate.detail}</span>
          </div>
          <div className="muted" style={{ marginTop: 8, fontSize: 12 }}>
            Timezone affichée : {APP_TIMEZONE}
          </div>
        </div>

        <div className="col" style={{ maxWidth: 360 }}>
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            Fenêtre de blocage (minutes)
          </div>
          <input
            type="range"
            min={30}
            max={240}
            value={windowMin}
            onChange={(e) => setWindowMin(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <div className="muted" style={{ fontSize: 12 }}>
            {windowMin} min
          </div>
        </div>
      </div>

      <hr className="sep" />

      {loading ? <div className="muted">Chargement…</div> : null}
      {err ? (
        <div
          style={{
            border: "1px solid var(--border)",
            background: "rgba(255,77,77,0.08)",
            padding: 10,
            borderRadius: 12
          }}
        >
          {err}
        </div>
      ) : null}

      {!loading && !err ? <EventsList events={events} /> : null}
    </div>
  );
}
