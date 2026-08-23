-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/bwufzzwdifcyasqmyhcv/sql/new
-- Idempotent: can re-run safely

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
  social_link text,
  industry text,
  country text,
  estimated_monthly_range text,
  onboarding_completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add missing columns if table already exists
alter table profiles add column if not exists social_link text;
alter table profiles add column if not exists industry text;
alter table profiles add column if not exists country text;
alter table profiles add column if not exists estimated_monthly_range text;
alter table profiles add column if not exists avatar_url text;
alter table profiles add column if not exists business_website text;
alter table profiles add column if not exists business_name text;
alter table profiles add column if not exists location text;
alter table profiles add column if not exists language text;

create or replace function handle_updated_at() returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;
drop trigger if exists profiles_updated_at on profiles;
create trigger profiles_updated_at before update on profiles for each row execute function handle_updated_at();

alter table profiles enable row level security;
drop policy if exists "allow all" on profiles;
create policy "allow all" on profiles for all using (true) with check (true);

-- Storage bucket for avatars/logos (public)
insert into storage.buckets (id, name, public) values ('avatars','avatars', true) on conflict (id) do nothing;
drop policy if exists "avatars public read" on storage.objects;
create policy "avatars public read" on storage.objects for select using (bucket_id='avatars');
drop policy if exists "avatars allow upload" on storage.objects;
create policy "avatars allow upload" on storage.objects for insert with check (bucket_id='avatars');
drop policy if exists "avatars allow update" on storage.objects;
create policy "avatars allow update" on storage.objects for update using (bucket_id='avatars');
drop policy if exists "avatars allow delete" on storage.objects;
create policy "avatars allow delete" on storage.objects for delete using (bucket_id='avatars');
