-- Storage policies
-- 003_storage_policies.sql
-- Storage policies for bucket "trade-screens"
-- IMPORTANT: create the bucket in Supabase UI first (private).

-- Enable RLS on storage objects (usually enabled by default in Supabase)
alter table storage.objects enable row level security;

-- Helper: restrict to bucket
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

-- Update own files (rare in MVP)
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
