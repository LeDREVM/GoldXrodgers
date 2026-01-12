// Register component
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/auth.service";

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);

    if (password !== password2) {
      setErr("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      setOk("Compte créé. Tu peux te connecter.");
      nav("/login");
    } catch (ex: any) {
      setErr(ex?.message || "Erreur de création de compte.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div className="card">
        <div className="cardHeader">
          <div style={{ fontWeight: 800, fontSize: 20 }}>Créer un compte</div>
          <div className="muted">Session NY • Journal • Upload screenshot</div>
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
                placeholder="8+ caractères"
                required
                style={inputStyle}
              />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              <span className="muted">Confirmer</span>
              <input
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                type="password"
                placeholder="répéter"
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

            {ok ? (
              <div
                style={{
                  border: "1px solid var(--border)",
                  background: "rgba(87,255,138,0.10)",
                  padding: 10,
                  borderRadius: 12
                }}
              >
                {ok}
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
              {loading ? "Création…" : "Créer"}
            </button>

            <div className="muted" style={{ fontSize: 13 }}>
              Déjà un compte ? <Link to="/login">Connexion</Link>
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
