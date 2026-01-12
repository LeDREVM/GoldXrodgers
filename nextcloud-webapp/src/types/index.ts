export interface WatchlistItem {
  symbol: string;
  description: string;
  notes?: string;
  addedAt?: string;
}

export interface Analysis {
  id: string;
  symbol: string;
  timeframe: string;
  direction: 'long' | 'short';
  entry: number;
  stopLoss: number;
  takeProfit: number;
  confluence: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EconomicEvent {
  id: string;
  currency: string;
  event: string;
  impact: 'Low' | 'Medium' | 'High';
  date: string;
  time: string;
  actual?: number;
  forecast?: number;
  previous?: number;
}

export interface Correlation {
  symbol1: string;
  symbol2: string;
  correlation: number;
  period: number;
  updatedAt: string;
}
