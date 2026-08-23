-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/bwufzzwdifcyasqmyhcv/sql/new

-- 1. Profiles table (one row per Clerk user)
create table if not exists profiles (
  clerk_id text primary key,
  role text check (role in ('creator','business')),
  username text unique,
  display_name text,
  avatar_url text,
  location text,
  language text,
  business_name text,
  business_website text,
  onboarding_completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Keep updated_at fresh
create or replace function handle_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
drop trigger if exists profiles_updated_at on profiles;
create trigger profiles_updated_at before update on profiles for each row execute function handle_updated_at();

-- RLS: allow anon/auth to read/write their own row via clerk_id (we use publishable key, so enable permissive policies for now)
alter table profiles enable row level security;
drop policy if exists "allow all" on profiles;
create policy "allow all" on profiles for all using (true) with check (true);

-- Storage bucket for avatars (create if not exists via dashboard if needed)
-- insert into storage.buckets (id, name, public) values ('avatars','avatars', true) on conflict do nothing;
-- create policy "avatars public read" on storage.objects for select using (bucket_id='avatars');
-- create policy "avatars allow upload" on storage.objects for insert with check (bucket_id='avatars');
