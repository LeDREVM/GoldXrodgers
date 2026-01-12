import React, { useMemo, useState } from "react";
import { INSTRUMENTS } from "../../config/instruments";
import type { TradeDirection, Timeframe } from "../../types/trade";
import TagsInput from "./TagsInput";
import ScreenshotUploader from "./ScreenshotUploader";
import { createTrade } from "../../services/trades.service";

const TIMEFRAMES: Timeframe[] = ["M5", "M15", "H1", "H4", "D1"];

export default function TradeForm({ onCreated }: { onCreated: () => void }) {
  const [symbol, setSymbol] = useState<(typeof INSTRUMENTS)[number]>("US30");
  const [timeframe, setTimeframe] = useState<Timeframe>("M15");
  const [direction, setDirection] = useState<TradeDirection>("SELL");

  const [entry, setEntry] = useState<string>("");
  const [sl, setSl] = useState<string>("");
  const [tp, setTp] = useState<string>("");

  const [riskR, setRiskR] = useState<string>("1");
  const [resultR, setResultR] = useState<string>("");

  const [tags, setTags] = useState<string[]>(["ny-open"]);
  const [notes, setNotes] = useState<string>("");
  const [screenshotPath, setScreenshotPath] = useState<string | null>(null);

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const parsed = useMemo(() => {
    const num = (v: string) => (v.trim() === "" ? null : Number(v));
    return {
      entry: num(entry),
      sl: num(sl),
      tp: num(tp),
      risk_r: num(riskR),
      result_r: num(resultR)
    };
  }, [entry, sl, tp, riskR, resultR]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);

    try {
      await createTrade({
        symbol,
        timeframe,
        direction,
        entry: parsed.entry,
        sl: parsed.sl,
        tp: parsed.tp,
        risk_r: parsed.risk_r,
        result_r: parsed.result_r,
        tags,
        notes: notes.trim() ? notes.trim() : null,
        screenshot_url: screenshotPath
      });

      // reset minimal pour enchaîner vite
      setEntry("");
      setSl("");
      setTp("");
      setResultR("");
      setNotes("");
      setScreenshotPath(null);

      onCreated();
    } catch (ex: any) {
      setErr(ex?.message || "Erreur création trade.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
      <div className="row">
        <div className="col">
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            Symbol
          </div>
          <select value={symbol} onChange={(e) => setSymbol(e.target.value as any)} style={selectStyle}>
            {INSTRUMENTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            Timeframe
          </div>
          <select value={timeframe} onChange={(e) => setTimeframe(e.target.value as any)} style={selectStyle}>
            {TIMEFRAMES.map((tf) => (
              <option key={tf} value={tf}>
                {tf}
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            Direction
          </div>
          <select value={direction} onChange={(e) => setDirection(e.target.value as any)} style={selectStyle}>
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            Entry
          </div>
          <input value={entry} onChange={(e) => setEntry(e.target.value)} placeholder="ex: 38650" style={inputStyle} />
        </div>
        <div className="col">
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            SL
          </div>
          <input value={sl} onChange={(e) => setSl(e.target.value)} placeholder="ex: 38720" style={inputStyle} />
        </div>
        <div className="col">
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            TP
          </div>
          <input value={tp} onChange={(e) => setTp(e.target.value)} placeholder="ex: 38480" style={inputStyle} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            Risk (R)
          </div>
          <input value={riskR} onChange={(e) => setRiskR(e.target.value)} placeholder="ex: 1" style={inputStyle} />
        </div>
        <div className="col">
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            Result (R)
          </div>
          <input
            value={resultR}
            onChange={(e) => setResultR(e.target.value)}
            placeholder="ex: 2 (gain) / -1 (stop)"
            style={inputStyle}
          />
        </div>
        <div className="col">
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            Screenshot
          </div>
          <ScreenshotUploader value={screenshotPath} onChange={setScreenshotPath} />
        </div>
      </div>

      <div>
        <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
          Tags
        </div>
        <TagsInput value={tags} onChange={setTags} />
      </div>

      <div>
        <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
          Notes
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="setup, contexte, erreur, discipline…"
          rows={4}
          style={textareaStyle}
        />
      </div>

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

      <button disabled={busy} type="submit" style={btnStyle}>
        {busy ? "Saving…" : "Save trade"}
      </button>
    </form>
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

const textareaStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,0.04)",
  color: "var(--text)",
  padding: "10px 12px",
  borderRadius: 12,
  outline: "none",
  resize: "vertical"
};

const btnStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,0.06)",
  color: "var(--text)",
  padding: "10px 12px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 800
};
