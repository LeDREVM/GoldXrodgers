import React from 'react';
import { useNextcloud } from '../hooks/useNextcloud';

export const ConnectionStatus: React.FC = () => {
  const { isConnected, isLoading, error, connect } = useNextcloud();

  if (isLoading) {
    return (
      <div className="connection-status loading">
        <span className="status-indicator loading"></span>
        <span>Connexion à Nextcloud...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="connection-status error">
        <span className="status-indicator error"></span>
        <span>{error}</span>
        <button onClick={connect} className="retry-btn">
          Réessayer
        </button>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="connection-status connected">
        <span className="status-indicator connected"></span>
        <span>Connecté à Nextcloud Kaflow</span>
      </div>
    );
  }

  return (
    <div className="connection-status disconnected">
      <span className="status-indicator disconnected"></span>
      <span>Non connecté</span>
      <button onClick={connect} className="connect-btn">
        Se connecter
      </button>
    </div>
  );
};
