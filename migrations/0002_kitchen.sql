create table if not exists kitchens (
  id text primary key,
  invite_code text not null unique,
  owner_id text not null,
  created_at timestamptz not null default now()
);

create table if not exists kitchen_members (
  kitchen_id text not null references kitchens(id),
  user_id text not null,
  joined_at timestamptz not null default now(),
  primary key (user_id)
);

create index if not exists kitchen_members_kitchen_id_idx on kitchen_members (kitchen_id);

create table if not exists kitchen_state (
  kitchen_id text primary key references kitchens(id),
  week_ids jsonb not null,
  checked jsonb not null,
  ratings jsonb not null,
  custom jsonb not null,
  updated_at timestamptz not null default now()
);
