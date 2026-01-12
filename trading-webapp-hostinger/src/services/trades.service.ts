// Trades service
import { supabase } from "../lib/supabaseClient";
import type { Trade } from "../types/trade";

export type CreateTradeInput = Omit<
  Trade,
  "id" | "user_id" | "created_at"
>;

export async function listTrades(limit = 200): Promise<Trade[]> {
  const { data, error } = await supabase
    .from("trades")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data || []) as Trade[];
}

export async function createTrade(input: CreateTradeInput): Promise<Trade> {
  const payload = {
    symbol: input.symbol,
    timeframe: input.timeframe,
    direction: input.direction,
    entry: input.entry,
    sl: input.sl,
    tp: input.tp,
    risk_r: input.risk_r,
    result_r: input.result_r,
    tags: input.tags,
    notes: input.notes,
    screenshot_url: input.screenshot_url
  };

  const { data, error } = await supabase
    .from("trades")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as Trade;
}

export async function updateTrade(
  id: string,
  patch: Partial<CreateTradeInput>
): Promise<Trade> {
  const { data, error } = await supabase
    .from("trades")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as Trade;
}

export async function deleteTrade(id: string): Promise<void> {
  const { error } = await supabase.from("trades").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
