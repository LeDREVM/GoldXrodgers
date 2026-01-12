// Watchlist component
import React, { useMemo } from "react";
import { DEFAULT_WATCHLIST } from "../../config/constants";

export default function Watchlist() {
  const items = useMemo(() => DEFAULT_WATCHLIST, []);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {items.map((sym) => (
        <div
          key={sym}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderRadius: 14,
            border: "1px solid var(--border)",
            background: "rgba(255,255,255,0.04)"
          }}
        >
          <div style={{ fontWeight: 800 }}>{sym}</div>
          <div className="muted" style={{ fontSize: 12 }}>
            Priorité NY
          </div>
        </div>
      ))}
      <div className="muted" style={{ fontSize: 12 }}>
        (V2) Ajout prix/variation via API si tu veux.
      </div>
    </div>
  );
}
