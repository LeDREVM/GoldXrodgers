import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ConnectionStatus } from './components/ConnectionStatus';
import { Watchlist } from './components/Watchlist';
import { useNextcloud } from './hooks/useNextcloud';
import './App.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard Trading</h1>
      <div className="dashboard-grid">
        <div className="card">
          <h3>Watchlist</h3>
          <p>Gérez vos symboles de trading</p>
          <Link to="/watchlist" className="card-link">Voir la watchlist</Link>
        </div>
        <div className="card">
          <h3>Analyses</h3>
          <p>Consultez vos analyses techniques</p>
          <Link to="/analyses" className="card-link">Voir les analyses</Link>
        </div>
        <div className="card">
          <h3>Données Économiques</h3>
          <p>Événements économiques importants</p>
          <Link to="/economic-data" className="card-link">Voir les données</Link>
        </div>
        <div className="card">
          <h3>Corrélations</h3>
          <p>Analyse des corrélations entre symboles</p>
          <Link to="/correlations" className="card-link">Voir les corrélations</Link>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const { connect, isConnected } = useNextcloud();

  useEffect(() => {
    if (!isConnected) {
      connect();
    }
  }, [connect, isConnected]);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1>GoldyX Trading App</h1>
            <ConnectionStatus />
          </div>
          <nav className="app-nav">
            <Link to="/">Dashboard</Link>
            <Link to="/watchlist">Watchlist</Link>
            <Link to="/analyses">Analyses</Link>
            <Link to="/economic-data">Données Économiques</Link>
            <Link to="/correlations">Corrélations</Link>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/analyses" element={<div className="page"><h2>Analyses</h2><p>Fonctionnalité à venir...</p></div>} />
            <Route path="/economic-data" element={<div className="page"><h2>Données Économiques</h2><p>Fonctionnalité à venir...</p></div>} />
            <Route path="/correlations" element={<div className="page"><h2>Corrélations</h2><p>Fonctionnalité à venir...</p></div>} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>Nextcloud Kaflow Database - BreakZen Ultimate</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
