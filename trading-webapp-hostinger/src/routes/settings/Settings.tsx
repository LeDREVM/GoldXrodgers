// Settings component
import React, { useEffect, useState } from "react";
import { APP_TIMEZONE, DEFAULT_WATCHLIST, MAX_UPLOAD_MB } from "../../config/constants";
import { supabase } from "../../lib/supabaseClient";

export default function Settings() {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setEmail(data.user?.email ?? "");
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 920 }}>
      <div className="card">
        <div className="cardHeader">
          <div style={{ fontWeight: 800, fontSize: 18 }}>Settings</div>
          <div className="muted">Paramètres MVP (lecture seule côté front).</div>
        </div>
        <div className="cardBody" style={{ display: "grid", gap: 10 }}>
          <div className="row">
            <div className="col">
              <div className="muted" style={{ fontSize: 12 }}>Compte</div>
              <div style={{ fontWeight: 800 }}>{email || "—"}</div>
            </div>

            <div className="col">
              <div className="muted" style={{ fontSize: 12 }}>Timezone app</div>
              <div style={{ fontWeight: 800 }}>{APP_TIMEZONE}</div>
            </div>

            <div className="col">
              <div className="muted" style={{ fontSize: 12 }}>Max upload</div>
              <div style={{ fontWeight: 800 }}>{MAX_UPLOAD_MB} MB</div>
            </div>
          </div>

          <hr className="sep" />

          <div>
            <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
              Watchlist défaut
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {DEFAULT_WATCHLIST.map((s) => (
                <span key={s} className="badge">{s}</span>
              ))}
            </div>
            <div className="muted" style={{ fontSize: 12, marginTop: 8 }}>
              (V2) On pourra rendre la watchlist modifiable et sauvegardée en DB.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
