// Trade filters component
import React from "react";
import type { TradeDirection, Timeframe } from "../../types/trade";
import { INSTRUMENTS } from "../../config/instruments";

export type TradeFilterState = {
  symbol: "ALL" | (typeof INSTRUMENTS)[number];
  direction: "ALL" | TradeDirection;
  timeframe: "ALL" | Timeframe;
  minResultR: number | null;
};

export default function TradeFilters({
  value,
  onChange
}: {
  value: TradeFilterState;
  onChange: (v: TradeFilterState) => void;
}) {
  return (
    <div className="row" style={{ alignItems: "end" }}>
      <div className="col">
        <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
          Symbol
        </div>
        <select
          value={value.symbol}
          onChange={(e) => onChange({ ...value, symbol: e.target.value as any })}
          style={selectStyle}
        >
          <option value="ALL">ALL</option>
          {INSTRUMENTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="col">
        <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
          Direction
        </div>
        <select
          value={value.direction}
          onChange={(e) => onChange({ ...value, direction: e.target.value as any })}
          style={selectStyle}
        >
          <option value="ALL">ALL</option>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>
      </div>

      <div className="col">
        <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
          Timeframe
        </div>
        <select
          value={value.timeframe}
          onChange={(e) => onChange({ ...value, timeframe: e.target.value as any })}
          style={selectStyle}
        >
          <option value="ALL">ALL</option>
          <option value="M5">M5</option>
          <option value="M15">M15</option>
          <option value="H1">H1</option>
          <option value="H4">H4</option>
          <option value="D1">D1</option>
        </select>
      </div>

      <div className="col">
        <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
          Min Result (R)
        </div>
        <input
          type="number"
          step="0.25"
          placeholder="ex: 1"
          value={value.minResultR ?? ""}
          onChange={(e) =>
            onChange({
              ...value,
              minResultR: e.target.value === "" ? null : Number(e.target.value)
            })
          }
          style={inputStyle}
        />
      </div>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,0.04)",
  color: "var(--text)",
  padding: "10px 12px",
  borderRadius: 12,
  outline: "none"
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,0.04)",
  color: "var(--text)",
  padding: "10px 12px",
  borderRadius: 12,
  outline: "none"
};
