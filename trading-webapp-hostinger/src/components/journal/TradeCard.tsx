// Trade card component
import React, { useEffect, useState } from "react";
import type { Trade } from "../../types/trade";
import { deleteTrade, updateTrade } from "../../services/trades.service";
import { fmtNumber } from "../../lib/format";
import { APP_TIMEZONE } from "../../config/constants";
import { getSignedUrl } from "../../services/storage.service";

function fmtDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: APP_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(iso));
}

export default function TradeCard({
  trade,
  onChanged
}: {
  trade: Trade;
  onChanged: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!trade.screenshot_url) return;
      try {
        const url = await getSignedUrl(trade.screenshot_url, 60 * 30);
        if (!mounted) return;
        setSignedUrl(url);
      } catch {
        if (!mounted) return;
        setSignedUrl(null);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [trade.screenshot_url]);

  async function quickSetResult(r: number) {
    setBusy(true);
    try {
      await updateTrade(trade.id, { result_r: r });
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Supprimer ce trade ?")) return;
    setBusy(true);
    try {
      await deleteTrade(trade.id);
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  const res = trade.result_r;
  const resColor = res === null ? "var(--muted)" : res > 0 ? "var(--ok)" : res < 0 ? "var(--danger)" : "var(--warn)";

  return (
    <div
      style={{
        display: "grid",
        gap: 10,
        padding: "12px",
        borderRadius: 16,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.04)"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "grid", gap: 4 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <b style={{ fontSize: 16 }}>{trade.symbol}</b>
            <span className="badge">{trade.timeframe}</span>
            <span className="badge">{trade.direction}</span>
            <span className="badge">
              Result: <b style={{ color: resColor }}>{res === null ? "—" : fmtNumber(res, 2)}R</b>
            </span>
          </div>
          <div className="muted" style={{ fontSize: 12 }}>
            {fmtDate(trade.created_at)}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button disabled={busy} onClick={() => quickSetResult(2)} style={miniBtn}>
            +2R
          </button>
          <button disabled={busy} onClick={() => quickSetResult(1)} style={miniBtn}>
            +1R
          </button>
          <button disabled={busy} onClick={() => quickSetResult(-1)} style={miniBtn}>
            -1R
          </button>
          <button disabled={busy} onClick={remove} style={{ ...miniBtn, color: "var(--danger)" }}>
            Delete
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="muted" style={{ fontSize: 12 }}>Entry / SL / TP</div>
          <div>
            {fmtNumber(trade.entry)} / {fmtNumber(trade.sl)} / {fmtNumber(trade.tp)}
          </div>
        </div>
        <div className="col">
          <div className="muted" style={{ fontSize: 12 }}>Planned Risk</div>
          <div>{trade.risk_r === null ? "—" : `${fmtNumber(trade.risk_r, 2)}R`}</div>
        </div>
      </div>

      {trade.tags?.length ? (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {trade.tags.map((t) => (
            <span key={t} className="badge">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {trade.notes ? (
        <div style={{ color: "var(--text)", whiteSpace: "pre-wrap" }}>
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            Notes
          </div>
          {trade.notes}
        </div>
      ) : null}

      {trade.screenshot_url ? (
        signedUrl ? (
          <a href={signedUrl} target="_blank" rel="noreferrer" className="muted">
            Open screenshot
          </a>
        ) : (
          <div className="muted" style={{ fontSize: 12 }}>
            Screenshot path enregistré (preview indisponible si policies Storage non OK).
          </div>
        )
      ) : null}
    </div>
  );
}

const miniBtn: React.CSSProperties = {
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,0.06)",
  color: "var(--text)",
  padding: "8px 10px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 700
};
