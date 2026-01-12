// Screenshot uploader component
import React, { useEffect, useState } from "react";
import { getSignedUrl, uploadTradeScreenshot } from "../../services/storage.service";

export default function ScreenshotUploader({
  value,
  onChange
}: {
  value: string | null;
  onChange: (path: string | null) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!value) {
        setPreviewUrl(null);
        return;
      }
      try {
        const url = await getSignedUrl(value, 60 * 30);
        if (!mounted) return;
        setPreviewUrl(url);
      } catch {
        // On garde silencieux : URL signée peut échouer si policy mal réglée
        if (!mounted) return;
        setPreviewUrl(null);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [value]);

  async function onFile(file: File) {
    setErr(null);
    setBusy(true);
    try {
      const path = await uploadTradeScreenshot(file);
      onChange(path);
    } catch (ex: any) {
      setErr(ex?.message || "Erreur upload.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void onFile(f);
          }}
        />
        {value ? (
          <button type="button" onClick={() => onChange(null)} style={btnStyle}>
            Remove
          </button>
        ) : null}
      </div>

      {busy ? <div className="muted">Upload…</div> : null}
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

      {previewUrl ? (
        <a href={previewUrl} target="_blank" rel="noreferrer" className="muted">
          Preview screenshot (signed)
        </a>
      ) : value ? (
        <div className="muted" style={{ fontSize: 12 }}>
          Screenshot lié (path). Preview indisponible si policies Storage non OK.
        </div>
      ) : (
        <div className="muted" style={{ fontSize: 12 }}>
          (Optionnel) Ajoute une capture TradingView.
        </div>
      )}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,0.06)",
  color: "var(--text)",
  padding: "8px 10px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 700
};
