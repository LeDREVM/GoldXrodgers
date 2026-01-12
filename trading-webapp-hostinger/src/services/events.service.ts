// Events service
import { supabase } from "../lib/supabaseClient";
import type { EconomicEvent } from "../types/economicEvent";

export async function listUpcomingEvents(limit = 25): Promise<EconomicEvent[]> {
  const nowIso = new Date().toISOString();

  const { data, error } = await supabase
    .from("economic_events")
    .select("*")
    .gte("event_time_utc", nowIso)
    .order("event_time_utc", { ascending: true })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data || []) as EconomicEvent[];
}
