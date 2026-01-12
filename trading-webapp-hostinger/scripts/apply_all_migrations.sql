-- Script pour appliquer toutes les migrations Supabase
-- Copiez ce fichier dans l'éditeur SQL de Supabase Dashboard
-- OU utilisez: supabase db push (après avoir lié le projet)

-- ============================================
-- MIGRATION 001: Initial Schema
-- ============================================

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

-- ============================================
-- MIGRATION 002: Row Level Security Policies
-- ============================================

alter table public.profiles enable row level security;
alter table public.trades enable row level security;
alter table public.economic_events enable row level security;

-- PROFILES: user can read/write their own profile
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- TRADES: full CRUD own rows
drop policy if exists "trades_select_own" on public.trades;
create policy "trades_select_own"
on public.trades
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "trades_insert_own" on public.trades;
create policy "trades_insert_own"
on public.trades
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "trades_update_own" on public.trades;
create policy "trades_update_own"
on public.trades
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "trades_delete_own" on public.trades;
create policy "trades_delete_own"
on public.trades
for delete
to authenticated
using (user_id = auth.uid());

-- ECONOMIC EVENTS: readable by authenticated (MVP)
drop policy if exists "economic_events_select_all" on public.economic_events;
create policy "economic_events_select_all"
on public.economic_events
for select
to authenticated
using (true);

-- ============================================
-- MIGRATION 003: Storage Policies
-- ============================================
-- IMPORTANT: Créez d'abord le bucket "trade-screens" dans Supabase UI (Storage > Buckets)
-- Type: Private

alter table storage.objects enable row level security;

-- Read own files
drop policy if exists "storage_read_own_trade_screens" on storage.objects;
create policy "storage_read_own_trade_screens"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'trade-screens'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Insert own files (only under user folder)
drop policy if exists "storage_insert_own_trade_screens" on storage.objects;
create policy "storage_insert_own_trade_screens"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'trade-screens'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Update own files
drop policy if exists "storage_update_own_trade_screens" on storage.objects;
create policy "storage_update_own_trade_screens"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'trade-screens'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'trade-screens'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Delete own files
drop policy if exists "storage_delete_own_trade_screens" on storage.objects;
create policy "storage_delete_own_trade_screens"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'trade-screens'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================
-- MIGRATION 004: Seed Economic Events
-- ============================================

insert into public.economic_events (title, currency, impact, event_time_utc, source)
values
  ('CPI (Consumer Price Index)', 'USD', 'HIGH', now() + interval '1 day' + interval '14 hours', 'seed'),
  ('Initial Jobless Claims', 'USD', 'MEDIUM', now() + interval '2 days' + interval '13 hours', 'seed'),
  ('FOMC Member Speech', 'USD', 'HIGH', now() + interval '3 days' + interval '15 hours', 'seed'),
  ('BoJ Rate Decision', 'JPY', 'HIGH', now() + interval '4 days' + interval '3 hours', 'seed')
on conflict do nothing;
