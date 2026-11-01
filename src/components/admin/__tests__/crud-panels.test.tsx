import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';

import { CoverLettersPanel } from '@/components/admin/cover-letters-panel';
import { PrivateNotesPanel } from '@/components/admin/private-notes-panel';
import { trackAdminEvent } from '@/lib/admin';

const state = vi.hoisted(() => ({
  rows: [] as Array<Record<string, unknown>>,
  inserts: [] as unknown[][],
  updates: [] as { id: string; payload: Record<string, unknown> }[],
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: async () => ({ data: state.rows, error: null }),
      }),
      insert: async (payload: unknown[]) => {
        state.inserts.push(payload);
        return { error: null };
      },
      update: (payload: Record<string, unknown>) => ({
        eq: async (_column: string, id: string) => {
          state.updates.push({ id, payload });
          return { error: null };
        },
      }),
      delete: () => ({
        eq: async () => ({ error: null }),
      }),
    }),
  },
}));

vi.mock('@gv-tech/ui-web', async (importOriginal) => {
  const actual = await importOriginal<object>();
  return {
    ...actual,
    toast: vi.fn<(input: { title: string; description?: string; variant?: string }) => void>(),
  };
});

vi.mock('@/lib/admin', async (importOriginal) => {
  const actual = await importOriginal<object>();
  return {
    ...actual,
    trackAdminEvent: vi.fn<(eventName: string, props?: Record<string, string | number | boolean>) => void>(),
  };
});

beforeEach(() => {
  state.rows = [];
  state.inserts = [];
  state.updates = [];
  vi.mocked(trackAdminEvent).mockClear();
});

function cardTitles(): string[] {
  return Array.from(document.querySelectorAll('[data-slot="card-title"]')).map((node) => node.textContent ?? '');
}

function formById(id: string): HTMLFormElement {
  const form = document.getElementById(id);
  if (!(form instanceof HTMLFormElement)) {
    throw new Error(`Missing form #${id}`);
  }
  return form;
}

test('private note tags survive other edits and are saved from the text box', async () => {
  state.rows = [
    {
      id: 'note-1',
      title: 'Escalation',
      category: 'Verizon',
      content: 'Original body',
      tags: ['keep', 'me'],
      pinned: false,
      created_at: '2026-01-01T00:00:00.000Z',
      updated_at: '2026-02-01T00:00:00.000Z',
    },
  ];

  render(<PrivateNotesPanel />);
  expect(await screen.findByText('Escalation')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
  const tags = screen.getByLabelText(/Tags/);
  const title = screen.getByLabelText('Note title');
  expect(tags).toHaveValue('keep, me');

  fireEvent.change(title, { target: { value: 'Renamed' } });
  expect(tags).toHaveValue('keep, me');

  fireEvent.change(tags, { target: { value: 'keep, me, new' } });
  fireEvent.change(title, { target: { value: 'Renamed again' } });
  expect(tags).toHaveValue('keep, me, new');

  fireEvent.submit(formById('private_notes-form'));

  await waitFor(() => expect(state.updates).toHaveLength(1));
  expect(state.updates[0]).toMatchObject({
    id: 'note-1',
    payload: {
      title: 'Renamed again',
      category: 'Verizon',
      content: 'Original body',
      tags: ['keep', 'me', 'new'],
    },
  });
  expect(trackAdminEvent).toHaveBeenCalledWith('Admin Private Note Saved', {
    is_new: false,
    category: 'Verizon',
    tag_count: 3,
  });
});

test('private note save explains when title or content is missing', async () => {
  render(<PrivateNotesPanel />);
  expect(await screen.findByText('No private notes yet. Create your first note.')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Create note' }));
  fireEvent.submit(formById('private_notes-form'));

  expect(await screen.findByText('Title and content are required.')).toBeInTheDocument();
  expect(state.inserts).toHaveLength(0);
});

test('cover letters sort by recipient and treat a missing status as active', async () => {
  state.rows = [
    {
      id: 'zeta',
      slug: 'zeta',
      recipient: 'Zeta',
      company: 'Zeta Co',
      subject: 'Role',
      content: 'Zeta body',
      status: 'draft',
      created_at: '2026-01-01T00:00:00.000Z',
      updated_at: '2026-03-01T00:00:00.000Z',
    },
    {
      id: 'alpha',
      slug: 'alpha',
      recipient: 'Alpha',
      company: 'Alpha Co',
      subject: 'Role',
      content: 'Alpha body',
      status: null,
      created_at: '2026-01-01T00:00:00.000Z',
      updated_at: '2026-01-15T00:00:00.000Z',
    },
  ];

  render(<CoverLettersPanel />);
  expect(await screen.findByText('Zeta Co')).toBeInTheDocument();
  expect(cardTitles()).toEqual(['Zeta Co', 'Alpha Co']);

  const [statusSelect, sortSelect] = screen.getAllByRole('combobox');
  if (!statusSelect || !sortSelect) {
    throw new Error('Missing filter controls');
  }
  fireEvent.change(sortSelect, { target: { value: 'recipient' } });
  expect(cardTitles()).toEqual(['Alpha Co', 'Zeta Co']);

  fireEvent.change(statusSelect, { target: { value: 'active' } });
  expect(cardTitles()).toEqual(['Alpha Co']);
  expect(screen.queryByText('Zeta Co')).not.toBeInTheDocument();
});

test('cover letter save goes through the shared hook', async () => {
  render(<CoverLettersPanel />);
  expect(await screen.findByText('No cover letters yet. Create one or start from a template.')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Create letter' }));
  fireEvent.submit(formById('cover_letters-form'));
  expect(await screen.findByText('Slug and content are required.')).toBeInTheDocument();
  expect(state.inserts).toHaveLength(0);

  fireEvent.change(screen.getByLabelText('Company'), { target: { value: 'Acme' } });
  fireEvent.change(screen.getByLabelText(/Body Content/), { target: { value: 'Hello team' } });
  fireEvent.submit(formById('cover_letters-form'));

  await waitFor(() => expect(state.inserts).toHaveLength(1));
  const payload = state.inserts[0]?.[0] as Record<string, unknown>;
  expect(payload.company).toBe('Acme');
  expect(payload.content).toBe('Hello team');
  expect(payload.status).toBe('draft');
  expect(typeof payload.slug).toBe('string');
  expect(trackAdminEvent).toHaveBeenCalledWith('Admin Cover Letter Saved', {
    is_new: true,
    has_company: true,
    status: 'draft',
  });
});
