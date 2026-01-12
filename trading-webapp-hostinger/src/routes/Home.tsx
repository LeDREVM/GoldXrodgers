// Home page - Landing page
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { APP_NAME } from "../config/constants";
import { DEFAULT_WATCHLIST } from "../config/constants";

export default function Home() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/dashboard", { replace: true });
      } else {
        setChecking(false);
      }
    });
  }, [navigate]);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "var(--muted)" }}>Chargement...</div>
      </div>
    );
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(17, 17, 26, 0.8)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="container" style={{ padding: "18px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 20 }}>
              {APP_NAME}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Link
                to="/login"
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "rgba(255,255,255,0.04)",
                  color: "var(--text)",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
              >
                Connexion
              </Link>
              <Link
                to="/register"
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  background: "var(--link)",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          padding: "80px 18px",
          textAlign: "center",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 800,
            marginBottom: 20,
            lineHeight: 1.2,
          }}
        >
          Journal de Trading
          <br />
          <span style={{ color: "var(--link)" }}>Session New York</span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "var(--muted)",
            marginBottom: 40,
            lineHeight: 1.6,
          }}
        >
          Suivez vos trades, analysez vos performances et optimisez votre
          stratégie de trading avec un outil dédié à la session de New York.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/register"
            style={{
              padding: "14px 32px",
              borderRadius: 12,
              background: "var(--link)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 16,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Commencer gratuitement
          </Link>
          <Link
            to="/login"
            style={{
              padding: "14px 32px",
              borderRadius: 12,
              border: "1px solid var(--border)",
              background: "rgba(255,255,255,0.04)",
              color: "var(--text)",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 16,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            Se connecter
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: "60px 18px",
          background: "rgba(17, 17, 26, 0.4)",
        }}
      >
        <div className="container">
          <h2
            style={{
              textAlign: "center",
              fontSize: 36,
              fontWeight: 800,
              marginBottom: 50,
            }}
          >
            Fonctionnalités
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {/* Feature 1 */}
            <div className="card" style={{ padding: 24 }}>
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 16,
                }}
              >
                📊
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                Dashboard Complet
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                Suivez votre watchlist en temps réel avec les instruments
                principaux : US30, NAS100, XAUUSD, USDJPY, XBRUSD
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card" style={{ padding: 24 }}>
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 16,
                }}
              >
                📝
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                Journal de Trading
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                Enregistrez tous vos trades avec tags, R-multiple, screenshots
                et notes détaillées pour une analyse approfondie
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card" style={{ padding: 24 }}>
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 16,
                }}
              >
                ⏰
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                Session New York
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                Horloge dédiée à la session NY avec timezone America/Martinique
                et repères temporels pour optimiser vos entrées
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card" style={{ padding: 24 }}>
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 16,
                }}
              >
                📰
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                News Risk Gate
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                Alertes sur les événements économiques importants pour éviter
                les risques liés aux annonces majeures
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card" style={{ padding: 24 }}>
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 16,
                }}
              >
                📈
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                Statistiques
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                Analysez vos performances avec winrate, R-multiple moyen et
                résumé détaillé de vos résultats
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card" style={{ padding: 24 }}>
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 16,
                }}
              >
                🔒
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                Sécurisé
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                Vos données sont protégées avec Supabase Auth et Row Level
                Security. Chaque utilisateur voit uniquement ses propres trades
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Watchlist Preview */}
      <section style={{ padding: "60px 18px" }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: 36,
              fontWeight: 800,
              marginBottom: 30,
            }}
          >
            Instruments Suivis
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            {DEFAULT_WATCHLIST.map((symbol) => (
              <div
                key={symbol}
                style={{
                  padding: "12px 24px",
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "rgba(136, 168, 255, 0.08)",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                {symbol}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "80px 18px",
          textAlign: "center",
          background: "rgba(136, 168, 255, 0.05)",
        }}
      >
        <div className="container" style={{ maxWidth: 600 }}>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              marginBottom: 20,
            }}
          >
            Prêt à améliorer votre trading ?
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--muted)",
              marginBottom: 40,
            }}
          >
            Créez votre compte gratuitement et commencez à suivre vos trades
            dès aujourd'hui.
          </p>
          <Link
            to="/register"
            style={{
              padding: "16px 40px",
              borderRadius: 12,
              background: "var(--link)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 18,
              display: "inline-block",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Créer un compte
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "40px 18px",
          borderTop: "1px solid var(--border)",
          textAlign: "center",
          color: "var(--muted)",
        }}
      >
        <div className="container">
          <p style={{ marginBottom: 12 }}>
            {APP_NAME} - Journal de Trading Session NY
          </p>
          <p style={{ fontSize: 14 }}>
            Développé avec React, TypeScript et Supabase
          </p>
        </div>
      </footer>
    </div>
  );
}
