// Trade type definitions
export type TradeDirection = "BUY" | "SELL";
export type Timeframe = "M5" | "M15" | "H1" | "H4" | "D1";

export type Trade = {
  id: string;
  user_id: string;
  symbol: string;
  timeframe: Timeframe;
  direction: TradeDirection;

  entry: number | null;
  sl: number | null;
  tp: number | null;

  risk_r: number | null; // risque prévu (R)
  result_r: number | null; // résultat (R)

  tags: string[];
  notes: string | null;
  screenshot_url: string | null;

  created_at: string; // ISO_
