create extension if not exists "pgcrypto";

create table if not exists organizer_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  event_focus text,
  default_locale text not null default 'he',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists event_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_he text not null,
  name_en text not null,
  created_at timestamptz not null default now()
);

create table if not exists event_subtypes (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references event_categories(id) on delete cascade,
  slug text not null,
  name_he text not null,
  name_en text not null,
  created_at timestamptz not null default now(),
  unique (category_id, slug)
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid not null references organizer_profiles(id) on delete cascade,
  category_id uuid references event_categories(id),
  subtype_id uuid references event_subtypes(id),
  title text not null,
  description text,
  event_at timestamptz not null,
  location text not null,
  maps_url text,
  cover_image_url text,
  max_attendees integer not null default 50,
  is_public boolean not null default true,
  access_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists event_questions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  question text not null,
  type text not null check (type in ('yes_no', 'select', 'text')),
  options jsonb not null default '[]'::jsonb,
  is_required boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  name text not null,
  phone text,
  status text not null check (status in ('going', 'not_going', 'maybe')),
  checked_in boolean not null default false,
  checked_in_at timestamptz,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists event_checklists (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  label text not null,
  is_done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists event_bring_items (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  label text not null,
  claimed_by_name text,
  claimed_by_phone text,
  created_at timestamptz not null default now()
);

create table if not exists vendor_recommendations (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references event_categories(id) on delete cascade,
  subtype_id uuid references event_subtypes(id) on delete set null,
  created_by uuid references organizer_profiles(id) on delete set null,
  source_event_id uuid references events(id) on delete set null,
  vendor_name text not null,
  vendor_type text not null,
  city text,
  link_url text,
  notes text,
  price_range text,
  actual_price numeric(10,2),
  is_recommended boolean not null default true,
  created_at timestamptz not null default now()
);

alter table organizer_profiles enable row level security;
alter table events enable row level security;
alter table event_questions enable row level security;
alter table rsvps enable row level security;
alter table event_checklists enable row level security;
alter table event_bring_items enable row level security;
alter table vendor_recommendations enable row level security;

create policy "profiles owner read write"
on organizer_profiles
for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "public events readable"
on events
for select
using (is_public = true or organizer_id = auth.uid());

create policy "organizer manages own events"
on events
for all
using (organizer_id = auth.uid())
with check (organizer_id = auth.uid());

create policy "event questions readable"
on event_questions
for select
using (
  exists (
    select 1 from events
    where events.id = event_questions.event_id
      and (events.is_public = true or events.organizer_id = auth.uid())
  )
);

create policy "organizer manages event questions"
on event_questions
for all
using (
  exists (
    select 1 from events
    where events.id = event_questions.event_id
      and events.organizer_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from events
    where events.id = event_questions.event_id
      and events.organizer_id = auth.uid()
  )
);

create policy "anyone can create rsvp for readable events"
on rsvps
for insert
with check (
  exists (
    select 1 from events
    where events.id = rsvps.event_id
      and events.is_public = true
  )
);

create policy "organizer can read event rsvps"
on rsvps
for select
using (
  exists (
    select 1 from events
    where events.id = rsvps.event_id
      and events.organizer_id = auth.uid()
  )
);

create policy "organizer updates rsvps"
on rsvps
for update
using (
  exists (
    select 1 from events
    where events.id = rsvps.event_id
      and events.organizer_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from events
    where events.id = rsvps.event_id
      and events.organizer_id = auth.uid()
  )
);

create policy "organizer checklist only"
on event_checklists
for all
using (
  exists (
    select 1 from events
    where events.id = event_checklists.event_id
      and events.organizer_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from events
    where events.id = event_checklists.event_id
      and events.organizer_id = auth.uid()
  )
);

create policy "public bring list readable"
on event_bring_items
for select
using (
  exists (
    select 1 from events
    where events.id = event_bring_items.event_id
      and events.is_public = true
  )
);

create policy "organizer manages bring list"
on event_bring_items
for all
using (
  exists (
    select 1 from events
    where events.id = event_bring_items.event_id
      and events.organizer_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from events
    where events.id = event_bring_items.event_id
      and events.organizer_id = auth.uid()
  )
);

create policy "public recommendations readable"
on vendor_recommendations
for select
using (true);

create policy "authenticated users create recommendations"
on vendor_recommendations
for insert
with check (auth.uid() = created_by);
