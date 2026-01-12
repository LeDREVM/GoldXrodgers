// Impact badge component
import React from "react";
import type { Impact } from "../../types/economicEvent";

export default function ImpactBadge({ impact }: { impact: Impact }) {
  const color =
    impact === "HIGH" ? "var(--danger)" : impact === "MEDIUM" ? "var(--warn)" : "var(--muted)";

  return (
    <span className="badge" style={{ borderColor: "var(--border)" }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: color, display: "inline-block" }} />
      <b>{impact}</b>
    </span>
  );
}
