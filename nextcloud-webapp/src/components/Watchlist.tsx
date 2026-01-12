import React, { useState } from 'react';
import { useWatchlist } from '../hooks/useWatchlist';
import { WatchlistItem } from '../types';

export const Watchlist: React.FC = () => {
  const { watchlist, isLoading, error, addItem, removeItem } = useWatchlist();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<WatchlistItem>>({
    symbol: '',
    description: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.symbol && formData.description) {
      await addItem(formData as WatchlistItem);
      setFormData({ symbol: '', description: '', notes: '' });
      setShowAddForm(false);
    }
  };

  if (isLoading && watchlist.length === 0) {
    return <div className="watchlist loading">Chargement de la watchlist...</div>;
  }

  if (error) {
    return <div className="watchlist error">Erreur: {error}</div>;
  }

  return (
    <div className="watchlist">
      <div className="watchlist-header">
        <h2>Watchlist</h2>
        <button onClick={() => setShowAddForm(!showAddForm)} className="add-btn">
          {showAddForm ? 'Annuler' : '+ Ajouter'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="add-form">
          <input
            type="text"
            placeholder="Symbole (ex: XBRUSD)"
            value={formData.symbol}
            onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <textarea
            placeholder="Remarques (optionnel)"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
          <button type="submit" className="submit-btn">
            Ajouter
          </button>
        </form>
      )}

      <div className="watchlist-items">
        {watchlist.length === 0 ? (
          <div className="empty-state">Aucun symbole dans la watchlist</div>
        ) : (
          watchlist.map((item) => (
            <div key={item.symbol} className="watchlist-item">
              <div className="item-content">
                <h3>{item.symbol}</h3>
                <p>{item.description}</p>
                {item.notes && <p className="notes">{item.notes}</p>}
              </div>
              <button
                onClick={() => removeItem(item.symbol)}
                className="remove-btn"
                title="Supprimer"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
