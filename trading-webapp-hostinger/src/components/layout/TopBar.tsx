// Top bar component
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getNySessionStatus } from "../../lib/date";
import { APP_TIMEZONE } from "../../config/constants";
import { supabase } from "../../lib/supabaseClient";

export default function TopBar() {
  const nav = useNavigate();
  const [tick, setTick] = useState(0);
  const s = getNySessionStatus();

  useEffect(() => {
    const id = window.setInterval(() => setTick((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    nav("/login");
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(11, 11, 15, 0.75)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link to="/dashboard" style={{ fontWeight: 700 }}>
            Trading NY
          </Link>
          <span className="badge">
            NY {s.nyOpen}–{s.nyClose} ·{" "}
            <b style={{ color: s.isOpen ? "var(--ok)" : "var(--muted)" }}>
              {s.isOpen ? "OPEN" : "CLOSED"}
            </b>
          </span>
          <span className="badge">
            Local ({APP_TIMEZONE}): <b>{s.userOpen}</b>–<b>{s.userClose}</b>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link to="/settings" className="muted">
            Settings
          </Link>
          <button
            onClick={logout}
            style={{
              border: "1px solid var(--border)",
              background: "rgba(255,255,255,0.04)",
              color: "var(--text)",
              padding: "8px 12px",
              borderRadius: 12,
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
