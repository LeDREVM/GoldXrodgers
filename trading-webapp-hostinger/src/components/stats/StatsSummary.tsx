// Stats summary component
import React, { useMemo } from "react";
import type { Trade } from "../../types/trade";
import { computeAvgR, computeWinrate } from "../../lib/risk";
import { fmtNumber, fmtPct } from "../../lib/format";

export default function StatsSummary({ trades }: { trades: Trade[] }) {
  const { winrate, avgR, n, sampleN } = useMemo(() => {
    const results = trades
      .map((t) => t.result_r)
      .filter((x): x is number => typeof x === "number");

    return {
      n: trades.length,
      sampleN: results.length,
      winrate: computeWinrate(results),
      avgR: computeAvgR(results)
    };
  }, [trades]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div className="row">
        <div className="col">
          <div className="badge" style={{ width: "fit-content" }}>
            Trades: <b>{n}</b>
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Résultats renseignés: {sampleN}
          </div>
        </div>

        <div className="col">
          <div className="badge" style={{ width: "fit-content" }}>
            Winrate: <b>{fmtPct(winrate)}</b>
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Basé sur {sampleN} trades.
          </div>
        </div>

        <div className="col">
          <div className="badge" style={{ width: "fit-content" }}>
            Avg R: <b>{fmtNumber(avgR, 2)}R</b>
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Objectif : stabilité, pas excitation.
          </div>
        </div>
      </div>

      <hr className="sep" />

      <div className="muted" style={{ fontSize: 12 }}>
        Lecture rapide : si Avg R monte et winrate stable → ton process est bon. Sinon, ajuste le setup (tags) et coupe ce qui saigne.
      </div>
    </div>
  );
}
