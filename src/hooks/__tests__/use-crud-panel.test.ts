import { toast } from '@gv-tech/ui-web';
import { act, renderHook, waitFor } from '@testing-library/react';
import { type SubmitEvent } from 'react';
import { beforeEach, expect, test, vi } from 'vitest';

import { useCrudPanel, type CrudConfig, type CrudSaveInfo } from '@/hooks/use-crud-panel';

type Row = {
  id: string;
  title: string;
  recipient?: string;
  status?: string | null;
  category?: string;
  pinned?: boolean;
  content?: string;
  created_at: string;
  updated_at: string;
};

const state = vi.hoisted(() => ({
  rows: [] as Row[],
  inserts: [] as unknown[][],
  updates: [] as { id: string; payload: Record<string, unknown> }[],
  deletes: [] as string[],
}));

vi.mock('@gv-tech/ui-web', () => ({
  toast: vi.fn<(input: { title: string; description?: string; variant?: string }) => void>(),
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
        eq: async (_column: string, id: string) => {
          state.deletes.push(id);
          return { error: null };
        },
      }),
    }),
  },
}));

const submitEvent = { preventDefault() {} } as SubmitEvent;

function makeConfig(overrides: Partial<CrudConfig<Row, string>> = {}): CrudConfig<Row, string> {
  return {
    table: 'private_notes',
    emptyItem: () => ({ title: '', content: '' }),
    toPayload: (editing) => ({ title: editing.title ?? '', content: editing.content ?? '' }),
    deleteMessage: (id) => `Delete ${id}?`,
    savedMessage: 'Note saved',
    deletedMessage: 'Note deleted',
    trackSave: vi.fn<(info: CrudSaveInfo) => void>(),
    trackDelete: vi.fn<(props: { id: string }) => void>(),
    allFilterValue: 'all',
    filterMatches: () => true,
    sortText: (item, sortBy) => {
      if (sortBy === 'title') return item.title;
      if (sortBy === 'recipient') return item.recipient || '';
      return null;
    },
    ...overrides,
  };
}

function row(partial: Partial<Row> & Pick<Row, 'id' | 'title'>): Row {
  return {
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
    ...partial,
  };
}

beforeEach(() => {
  state.rows = [];
  state.inserts = [];
  state.updates = [];
  state.deletes = [];
  vi.mocked(toast).mockClear();
  vi.spyOn(window, 'confirm').mockReturnValue(true);
});

test('sorts pinned rows first, then by the requested text field', async () => {
  state.rows = [
    row({ id: 'zeta', title: 'Zeta', recipient: 'Zeta', updated_at: '2026-03-01T00:00:00.000Z' }),
    row({ id: 'alpha', title: 'Alpha', recipient: 'Alpha', updated_at: '2026-01-15T00:00:00.000Z' }),
    row({ id: 'pinned', title: 'Middle', recipient: 'Middle', pinned: true, updated_at: '2026-02-01T00:00:00.000Z' }),
  ];
  const { result } = renderHook(() => useCrudPanel(makeConfig()));

  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.filtered.map((item) => item.id)).toEqual(['pinned', 'zeta', 'alpha']);

  act(() => result.current.setSortBy('recipient'));
  expect(result.current.filtered.map((item) => item.id)).toEqual(['pinned', 'alpha', 'zeta']);
  expect(result.current.items.map((item) => item.id)).toEqual(['zeta', 'alpha', 'pinned']);
});

test('keeps a missing status visible under the active filter', async () => {
  state.rows = [
    row({ id: 'live', title: 'Live', status: null }),
    row({ id: 'draft', title: 'Draft', status: 'draft' }),
  ];
  const { result } = renderHook(() =>
    useCrudPanel(
      makeConfig({
        filterMatches: (item, filterValue) => filterValue === 'all' || (item.status || 'active') === filterValue,
      }),
    ),
  );

  await waitFor(() => expect(result.current.loading).toBe(false));
  act(() => result.current.setFilter('active'));
  expect(result.current.filtered.map((item) => item.id)).toEqual(['live']);
});

test('clears the keyboard selection when search or sort changes', async () => {
  state.rows = [row({ id: 'one', title: 'One' }), row({ id: 'two', title: 'Two' })];
  const { result } = renderHook(() => useCrudPanel(makeConfig()));

  await waitFor(() => expect(result.current.loading).toBe(false));
  act(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j' }));
  });
  expect(result.current.selectedIndex).toBe(0);

  act(() => result.current.setSearch('one'));
  expect(result.current.selectedIndex).toBe(-1);
});

test('blocks save when validation fails and reports the payload when it succeeds', async () => {
  const trackSave = vi.fn<(info: CrudSaveInfo) => void>();
  const cfg = makeConfig({
    validate: (editing) => (editing.title ? null : 'Title and content are required.'),
    toPayload: (editing) => ({ title: editing.title, tags: ['a', 'b'] }),
    trackSave,
  });
  const { result } = renderHook(() => useCrudPanel(cfg));
  await waitFor(() => expect(result.current.loading).toBe(false));

  act(() => result.current.startCreate());
  await act(async () => {
    await result.current.saveItem(submitEvent);
  });
  expect(result.current.formError).toBe('Title and content are required.');
  expect(state.inserts).toHaveLength(0);

  act(() => result.current.updateField('title', 'Escalation'));
  await act(async () => {
    await result.current.saveItem(submitEvent);
  });

  expect(state.inserts).toEqual([[{ title: 'Escalation', tags: ['a', 'b'] }]]);
  expect(trackSave).toHaveBeenCalledWith({
    isNew: true,
    payload: { title: 'Escalation', tags: ['a', 'b'] },
  });
  expect(toast).toHaveBeenCalledWith({ title: 'Note saved' });
  expect(result.current.editing).toBeNull();
});

test('confirms before delete and uses the panel delete message', async () => {
  state.rows = [row({ id: 'note-1', title: 'Note' })];
  const trackDelete = vi.fn<(props: { id: string }) => void>();
  const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
  const { result } = renderHook(() => useCrudPanel(makeConfig({ trackDelete })));
  await waitFor(() => expect(result.current.loading).toBe(false));

  await act(async () => {
    await result.current.deleteItem('note-1');
  });
  expect(confirm).toHaveBeenCalledWith('Delete note-1?');
  expect(state.deletes).toHaveLength(0);

  confirm.mockReturnValue(true);
  await act(async () => {
    await result.current.deleteItem('note-1');
  });
  expect(state.deletes).toEqual(['note-1']);
  expect(trackDelete).toHaveBeenCalledWith({ id: 'note-1' });
  expect(toast).toHaveBeenCalledWith({ title: 'Note deleted' });
});
