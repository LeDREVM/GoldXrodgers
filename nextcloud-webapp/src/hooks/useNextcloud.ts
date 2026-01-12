import { useState, useEffect, useCallback } from 'react';
import { nextcloudService } from '../services/nextcloudService';

interface UseNextcloudReturn {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useNextcloud = (): UseNextcloudReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await nextcloudService.initialize();
      setIsConnected(true);
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion à Nextcloud');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setError(null);
  }, []);

  return {
    isConnected,
    isLoading,
    error,
    connect,
    disconnect,
  };
};
