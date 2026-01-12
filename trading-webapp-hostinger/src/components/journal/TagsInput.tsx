// Tags input component
import React, { useMemo, useState } from "react";

export default function TagsInput({
  value,
  onChange,
  placeholder = "ex: ny-open, sweep, spring"
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [raw, setRaw] = useState("");

  const normalized = useMemo(() => value.map((t) => t.trim()).filter(Boolean), [value]);

  function add() {
    const parts = raw
      .split(",")
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean);

    if (!parts.length) return;

    const merged = Array.from(new Set([...normalized, ...parts]));
    onChange(merged);
    setRaw("");
  }

  function remove(tag: string) {
    onChange(normalized.filter((t) => t !== tag));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={placeholder}
          style={inputStyle}
        />
        <button type="button" onClick={add} style={btnStyle}>
          Add
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {normalized.map((t) => (
          <span key={t} className="badge" style={{ cursor: "pointer" }} onClick={() => remove(t)}>
            {t} <span className="muted">×</span>
          </span>
        ))}
        {!normalized.length ? <span className="muted">Aucun tag.</span> : null}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,0.04)",
  color: "var(--text)",
  padding: "10px 12px",
  borderRadius: 12,
  outline: "none"
};

const btnStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,0.06)",
  color: "var(--text)",
  padding: "10px 12px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 700
};
