// Login component
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../services/auth.service";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await signIn(email, password);
      nav("/dashboard");
    } catch (ex: any) {
      setErr(ex?.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div className="card">
        <div className="cardHeader">
          <div style={{ fontWeight: 800, fontSize: 20 }}>Connexion</div>
          <div className="muted">
            Accès dashboard + journal (Supabase Auth).
          </div>
        </div>

        <div className="cardBody">
          <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
            <label style={{ display: "grid", gap: 6 }}>
              <span className="muted">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="toi@exemple.com"
                required
                style={inputStyle}
              />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              <span className="muted">Mot de passe</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                required
                style={inputStyle}
              />
            </label>

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

            <button
              disabled={loading}
              type="submit"
              style={{
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.06)",
                color: "var(--text)",
                padding: "10px 12px",
                borderRadius: 12,
                cursor: "pointer",
                fontWeight: 700
              }}
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>

            <div className="muted" style={{ fontSize: 13 }}>
              Pas de compte ? <Link to="/register">Créer un compte</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,0.04)",
  color: "var(--text)",
  padding: "10px 12px",
  borderRadius: 12,
  outline: "none"
};
