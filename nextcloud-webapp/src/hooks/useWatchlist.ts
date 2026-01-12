import { useState, useEffect, useCallback } from 'react';
import { nextcloudService } from '../services/nextcloudService';
import { WatchlistItem } from '../types';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWatchlist = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await nextcloudService.getWatchlist();
      setWatchlist(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement de la watchlist');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addItem = useCallback(async (item: WatchlistItem) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newItem = {
        ...item,
        addedAt: new Date().toISOString(),
      };
      const updated = [...watchlist, newItem];
      await nextcloudService.saveWatchlist(updated);
      setWatchlist(updated);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'ajout');
    } finally {
      setIsLoading(false);
    }
  }, [watchlist]);

  const removeItem = useCallback(async (symbol: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updated = watchlist.filter(item => item.symbol !== symbol);
      await nextcloudService.saveWatchlist(updated);
      setWatchlist(updated);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression');
    } finally {
      setIsLoading(false);
    }
  }, [watchlist]);

  useEffect(() => {
    loadWatchlist();
  }, [loadWatchlist]);

  return {
    watchlist,
    isLoading,
    error,
    addItem,
    removeItem,
    refresh: loadWatchlist,
  };
};
