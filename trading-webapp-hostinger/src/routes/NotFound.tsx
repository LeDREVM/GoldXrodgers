// 404 Not Found component
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ maxWidth: 720 }}>
      <div className="card">
        <div className="cardHeader">
          <div style={{ fontWeight: 800, fontSize: 20 }}>404</div>
          <div className="muted">Page introuvable.</div>
        </div>
        <div className="cardBody">
          <Link to="/dashboard">Retour dashboard</Link>
        </div>
      </div>
    </div>
  );
}
