// Supabase type definitions
// Minimal typing for this MVP.
// You can replace with Supabase generated types later.
export type DbTradeRow = {
    id: string;
    user_id: string;
    symbol: string;
    timeframe: string;
    direction: string;
    entry: number | null;
    sl: number | null;
    tp: number | null;
    risk_r: number | null;
    result_r: number | null;
    tags: string[] | null;
    notes: string | null;
    screenshot_url: string | null;
    created_at: string;
  };
  