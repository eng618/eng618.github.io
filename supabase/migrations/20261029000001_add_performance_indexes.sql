-- Performance indexes for admin list views (sorting by created/updated, pinning)

create index if not exists private_notes_updated_at_idx
  on public.private_notes (updated_at desc);

create index if not exists private_notes_created_at_idx
  on public.private_notes (created_at desc);

create index if not exists private_notes_pinned_idx
  on public.private_notes (pinned);

create index if not exists cover_letters_updated_at_idx
  on public.cover_letters (updated_at desc);

create index if not exists cover_letters_created_at_idx
  on public.cover_letters (created_at desc);
