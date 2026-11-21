export const schemaSql = `
create extension if not exists pgcrypto;

create table if not exists site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  category text not null default '',
  description text not null default '',
  image_key text,
  image_url text,
  link_url text default '',
  stage text not null default 'in-progress',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text not null,
  role text not null default '',
  metric text not null default '',
  sort_order integer not null default 0
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text not null default '',
  project_type text not null default '',
  budget text not null default '',
  timeline text not null default '',
  message text not null,
  status text not null default 'new',
  source text not null default 'contact',
  project_id uuid references projects(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists admin_users (
  email text primary key,
  name text not null default '',
  created_at timestamptz not null default now()
);

-- Added after the first release; create table if not exists never applies these
-- to databases created earlier, so they are declared idempotently here.
alter table inquiries add column if not exists budget text not null default '';
alter table inquiries add column if not exists timeline text not null default '';

create index if not exists inquiries_created_at_idx on inquiries (created_at desc);
create index if not exists inquiries_status_idx on inquiries (status);
create index if not exists projects_sort_order_idx on projects (sort_order);
`;
