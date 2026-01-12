-- Seed economic events
-- 004_seed_events.sql
-- Seed minimal economic events for testing News Gate.
-- Times are UTC. Replace with your real calendar later.

insert into public.economic_events (title, currency, impact, event_time_utc, source)
values
  ('CPI (Consumer Price Index)', 'USD', 'HIGH', now() + interval '1 day' + interval '14 hours', 'seed'),
  ('Initial Jobless Claims', 'USD', 'MEDIUM', now() + interval '2 days' + interval '13 hours', 'seed'),
  ('FOMC Member Speech', 'USD', 'HIGH', now() + interval '3 days' + interval '15 hours', 'seed'),
  ('BoJ Rate Decision', 'JPY', 'HIGH', now() + interval '4 days' + interval '3 hours', 'seed')
on conflict do nothing;
