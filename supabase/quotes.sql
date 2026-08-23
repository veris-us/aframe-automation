-- Quote Builder schema for A Frame Automation.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.

-- Sequential, human-readable quote numbers: AFA-1001, AFA-1002, ...
create sequence if not exists public.quote_number_seq start 1001;

create table if not exists public.quotes (
  id              uuid primary key default gen_random_uuid(),
  owner_id        uuid not null references auth.users (id) on delete cascade,

  quote_number    text not null default ('AFA-' || nextval('public.quote_number_seq')),
  status          text not null default 'draft'
                    check (status in ('draft', 'sent', 'accepted', 'declined')),

  client_name     text,
  client_company  text,
  client_email    text,
  client_phone    text,

  project_title   text,
  summary         text,

  -- [{ id, description, quantity, unitPrice }]
  line_items      jsonb not null default '[]'::jsonb,

  tax_rate        numeric(6, 3)  not null default 0 check (tax_rate >= 0),
  discount        numeric(12, 2) not null default 0 check (discount >= 0),
  deposit_percent numeric(5, 2)  not null default 0
                    check (deposit_percent between 0 and 100),

  notes           text,
  terms           text,

  issued_on       date not null default current_date,
  valid_until     date,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists quotes_owner_created_idx
  on public.quotes (owner_id, created_at desc);

-- Keep updated_at honest without trusting the client to send it.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists quotes_set_updated_at on public.quotes;

create trigger quotes_set_updated_at
  before update on public.quotes
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- This is the actual lock on the data. The browser holds a public anon key, so
-- without RLS anyone could read this table directly. With it, Postgres itself
-- refuses to return rows that aren't yours, regardless of what the app does.
-- ---------------------------------------------------------------------------

alter table public.quotes enable row level security;

drop policy if exists "owner reads own quotes"   on public.quotes;
drop policy if exists "owner inserts own quotes" on public.quotes;
drop policy if exists "owner updates own quotes" on public.quotes;
drop policy if exists "owner deletes own quotes" on public.quotes;

create policy "owner reads own quotes"
  on public.quotes for select
  to authenticated
  using (auth.uid() = owner_id);

create policy "owner inserts own quotes"
  on public.quotes for insert
  to authenticated
  with check (auth.uid() = owner_id);

create policy "owner updates own quotes"
  on public.quotes for update
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "owner deletes own quotes"
  on public.quotes for delete
  to authenticated
  using (auth.uid() = owner_id);
