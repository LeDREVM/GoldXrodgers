// Dashboard component
import React from "react";
import SessionClock from "../../components/dashboard/SessionClock";
import Watchlist from "../../components/dashboard/Watchlist";
import NewsGate from "../../components/news/NewsGate";

export default function Dashboard() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="cardHeader">
              <div style={{ fontWeight: 800, fontSize: 18 }}>Session</div>
              <div className="muted">NY open → exécution. Local → repères.</div>
            </div>
            <div className="cardBody">
              <SessionClock />
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="cardHeader">
              <div style={{ fontWeight: 800, fontSize: 18 }}>Watchlist</div>
              <div className="muted">Instruments prioritaires NY.</div>
            </div>
            <div className="cardBody">
              <Watchlist />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="cardHeader">
          <div style={{ fontWeight: 800, fontSize: 18 }}>News Risk Gate</div>
          <div className="muted">
            Si HIGH impact proche → discipline (no trade).
          </div>
        </div>
        <div className="cardBody">
          <NewsGate />
        </div>
      </div>
    </div>
  );
}
