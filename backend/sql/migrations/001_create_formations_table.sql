-- Ajoute la table formations pour certiGen
create extension if not exists "pgcrypto";

create table if not exists public.formations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  skills_description text not null,
  start_date date not null,
  end_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.formations.skills_description is 'Description des compétences acquises pendant la formation';
