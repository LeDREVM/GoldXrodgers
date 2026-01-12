// Economic event type definitions
export type Impact = "LOW" | "MEDIUM" | "HIGH";

export type EconomicEvent = {
  id: string;
  title: string;
  currency: string; // USD, JPY, etc.
  impact: Impact;
  event_time_utc: string; // ISO (UTC)
  source: string | null;
  created_at: string;
};
