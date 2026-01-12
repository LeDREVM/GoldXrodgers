-- Initial database schema
-- 001_init.sql
-- Tables: profiles, trades, economic_events
-- Extensions
create extension if not exists pgcrypto;

-- PROFILES (optionnel en MVP, utile pour V2)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

-- TRADES
create table if not exists public.trades (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,

  symbol text not null,
  timeframe text not null check (timeframe in ('M5','M15','H1','H4','D1')),
  direction text not null check (direction in ('BUY','SELL')),

  entry numeric null,
  sl numeric null,
  tp numeric null,

  risk_r numeric null,
  result_r numeric null,

  tags text[] not null default '{}'::text[],
  notes text null,
  screenshot_url text null,

  created_at timestamptz not null default now()
);

create index if not exists trades_user_id_idx on public.trades (user_id);
create index if not exists trades_created_at_idx on public.trades (created_at desc);
create index if not exists trades_symbol_idx on public.trades (symbol);

-- ECONOMIC EVENTS (News Gate)
create table if not exists public.economic_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  currency text not null,
  impact text not null check (impact in ('LOW','MEDIUM','HIGH')),
  event_time_utc timestamptz not null,
  source text null,
  created_at timestamptz not null default now()
);

create index if not exists economic_events_time_idx on public.economic_events (event_time_utc);

-- Trigger: auto-create profile row on signup (safe)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
