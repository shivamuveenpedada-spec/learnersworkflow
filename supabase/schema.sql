-- LearnersWorkflow schema: free access, parent accounts with up to 3 child profiles.
-- Run this once in the Supabase project's SQL editor.

create table if not exists public.parents (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null,
  dob date not null,
  created_at timestamptz not null default now()
);

create table if not exists public.child_profiles (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.parents (id) on delete cascade,
  display_name text not null,
  avatar_key text,
  birth_year int,
  created_at timestamptz not null default now()
);

create table if not exists public.module_progress (
  child_profile_id uuid not null references public.child_profiles (id) on delete cascade,
  module text not null,
  item_id text not null,
  completed_at timestamptz,
  score int,
  primary key (child_profile_id, module, item_id)
);

-- Auto-create a parents row from the metadata passed to supabase.auth.signUp().
create or replace function public.handle_new_parent()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.parents (id, first_name, last_name, email, dob)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    new.email,
    (new.raw_user_meta_data ->> 'dob')::date
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_parent();

-- Enforce max 3 child profiles per parent.
create or replace function public.enforce_child_profile_limit()
returns trigger
language plpgsql
as $$
begin
  if (select count(*) from public.child_profiles where parent_id = new.parent_id) >= 3 then
    raise exception 'A parent account can have at most 3 child profiles.';
  end if;
  return new;
end;
$$;

drop trigger if exists child_profile_limit on public.child_profiles;
create trigger child_profile_limit
  before insert on public.child_profiles
  for each row execute function public.enforce_child_profile_limit();

-- Row Level Security: a parent can only ever see/manage their own data.
alter table public.parents enable row level security;
alter table public.child_profiles enable row level security;
alter table public.module_progress enable row level security;

create policy "Parents can view their own row" on public.parents
  for select using (auth.uid() = id);

create policy "Parents can update their own row" on public.parents
  for update using (auth.uid() = id);

create policy "Parents can view their children" on public.child_profiles
  for select using (auth.uid() = parent_id);

create policy "Parents can add children" on public.child_profiles
  for insert with check (auth.uid() = parent_id);

create policy "Parents can update their children" on public.child_profiles
  for update using (auth.uid() = parent_id);

create policy "Parents can delete their children" on public.child_profiles
  for delete using (auth.uid() = parent_id);

create policy "Parents can view their children's progress" on public.module_progress
  for select using (
    child_profile_id in (select id from public.child_profiles where parent_id = auth.uid())
  );

create policy "Parents can write their children's progress" on public.module_progress
  for insert with check (
    child_profile_id in (select id from public.child_profiles where parent_id = auth.uid())
  );

create policy "Parents can update their children's progress" on public.module_progress
  for update using (
    child_profile_id in (select id from public.child_profiles where parent_id = auth.uid())
  );
