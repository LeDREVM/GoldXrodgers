-- Row Level Security policies
-- 002_rls_policies.sql
-- RLS for profiles, trades, economic_events

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
-- (write reserved to service role / admin - later)
drop policy if exists "economic_events_select_all" on public.economic_events;
create policy "economic_events_select_all"
on public.economic_events
for select
to authenticated
using (true);
