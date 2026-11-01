-- Initial schema for admin panels (private notes + cover letters)
-- These tables already exist in the remote project; this migration tracks
-- the current state for version control and future local development.

-- Enable extensions used by the schema
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Private administrative notes (cross-device synced via Supabase)
create table if not exists public.private_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'General',
  content text not null,
  tags text[] not null default '{}',
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Hosted cover letters with public share slugs
create table if not exists public.cover_letters (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  recipient text,
  subject text,
  content text not null,
  company text,
  role_title text,
  status text not null default 'active'
    check (status IS NULL OR status = ANY (ARRAY['draft'::text, 'active'::text, 'archived'::text])),
  applied_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row-Level Security: only the admin email can read/write
alter table public.private_notes enable row level security;
alter table public.cover_letters enable row level security;

create policy if not exists admin_full_access_private_notes
  on public.private_notes
  for all
  to authenticated
  using (auth.jwt() ->> 'email' = 'eng618@garciaericn.com')
  with check (auth.jwt() ->> 'email' = 'eng618@garciaericn.com');

create policy if not exists admin_full_access_cover_letters
  on public.cover_letters
  for all
  to authenticated
  using (auth.jwt() ->> 'email' = 'eng618@garciaericn.com')
  with check (auth.jwt() ->> 'email' = 'eng618@garciaericn.com');

-- Cover letters are publicly readable by slug (share links)
create policy if not exists anonymous_single_read_cover_letters
  on public.cover_letters
  for select
  to anon
  using (true);
