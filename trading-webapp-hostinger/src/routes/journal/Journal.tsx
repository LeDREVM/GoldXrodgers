// Journal component
import React, { useEffect, useMemo, useState } from "react";
import type { Trade } from "../../types/trade";
import { listTrades } from "../../services/trades.service";
import TradeForm from "../../components/journal/TradeForm";
import TradeFilters, { TradeFilterState } from "../../components/journal/TradeFilters";
import TradeList from "../../components/journal/TradeList";
import StatsSummary from "../../components/stats/StatsSummary";

export default function Journal() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [filters, setFilters] = useState<TradeFilterState>({
    symbol: "ALL",
    direction: "ALL",
    timeframe: "ALL",
    minResultR: null
  });

  async function refresh() {
    setLoading(true);
    setErr(null);
    try {
      const data = await listTrades(300);
      setTrades(data);
    } catch (ex: any) {
      setErr(ex?.message || "Erreur chargement trades.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    return trades.filter((t) => {
      if (filters.symbol !== "ALL" && t.symbol !== filters.symbol) return false;
      if (filters.direction !== "ALL" && t.direction !== filters.direction) return false;
      if (filters.timeframe !== "ALL" && t.timeframe !== filters.timeframe) return false;

      if (filters.minResultR !== null && filters.minResultR !== undefined) {
        const rr = t.result_r ?? null;
        if (rr === null) return false;
        if (rr < filters.minResultR) return false;
      }
      return true;
    });
  }, [trades, filters]);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="cardHeader">
              <div style={{ fontWeight: 800, fontSize: 18 }}>Nouveau trade</div>
              <div className="muted">Saisie rapide, orientée exécution.</div>
            </div>
            <div className="cardBody">
              <TradeForm
                onCreated={() => refresh()}
              />
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="cardHeader">
              <div style={{ fontWeight: 800, fontSize: 18 }}>Stats</div>
              <div className="muted">Pilotage par données, pas par émotions.</div>
            </div>
            <div className="cardBody">
              <StatsSummary trades={filtered} />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="cardHeader">
          <div style={{ fontWeight: 800, fontSize: 18 }}>Historique</div>
          <div className="muted">Filtrer, comparer, répéter ce qui marche.</div>
        </div>
        <div className="cardBody" style={{ display: "grid", gap: 12 }}>
          <TradeFilters value={filters} onChange={setFilters} />

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

          {!loading && !err ? <TradeList trades={filtered} onChanged={refresh} /> : null}
        </div>
      </div>
    </div>
  );
}
