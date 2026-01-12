// Trade list component
import React from "react";
import type { Trade } from "../../types/trade";
import TradeCard from "./TradeCard";

export default function TradeList({
  trades,
  onChanged
}: {
  trades: Trade[];
  onChanged: () => void;
}) {
  if (!trades.length) {
    return <div className="muted">Aucun trade. Ajoute le premier, puis répète.</div>;
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {trades.map((t) => (
        <TradeCard key={t.id} trade={t} onChanged={onChanged} />
      ))}
    </div>
  );
}
