'use client';

import { toast } from '@gv-tech/ui-web';
import { useCallback, useEffect, useMemo, useState, type SubmitEvent } from 'react';

import { supabase } from '@/lib/supabase';

/**
 * Fields the shared list logic reads. Panels may omit the optional ones.
 * `title` covers note sorting; cover letters supply their own text via `sortText`.
 */
type CrudRecord = {
  id?: string;
  title?: string | null;
  category?: string | null;
  pinned?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
};

/** Values passed to a panel's save analytics callback. */
export type CrudSaveInfo = {
  isNew: boolean;
  payload: Record<string, unknown>;
};

/**
 * Configuration for a type-specific CRUD panel.
 *
 * `T` is the database record shape. `F` is the filter value type.
 * Pass a memoized config so list filtering does not recompute every render.
 */
export type CrudConfig<T, F extends string> = {
  /** Supabase table name. Also used as the save-shortcut form id: `{table}-form`. */
  table: string;
  /** Shape of a brand-new empty record (or factory that returns one). */
  emptyItem: Partial<T> | (() => Partial<T>);
  /** Transform editing state into a Supabase payload. */
  toPayload: (editing: Partial<T>) => Record<string, unknown>;
  /** Return an error message to block save, or null when the record is valid. */
  validate?: (editing: Partial<T>) => string | null;
  /** Confirmation message shown before deleting. */
  deleteMessage: (id: string) => string;
  /** Toast title after a successful save. Defaults to "Saved". */
  savedMessage?: string;
  /** Toast title after a successful delete. Defaults to "Deleted". */
  deletedMessage?: string;
  /** Analytics emitted on save. */
  trackSave: (info: CrudSaveInfo) => void;
  /** Analytics emitted on delete. */
  trackDelete: (props: { id: string }) => void;
  /** Analytics emitted on pin toggle. */
  trackPin?: (props: { pinned: boolean }) => void;
  /** Filter value meaning "show everything". */
  allFilterValue: F;
  /** True when the item should stay visible for the current filter value. */
  filterMatches: (item: T, filterValue: F) => boolean;
  /**
   * Text compared when `sortBy` is neither `updated` nor `created`.
   * Return null to keep the date order for that key.
   */
  sortText?: (item: T, sortBy: string) => string | null;
};

/**
 * Shared CRUD logic for the admin panels.
 *
 * Encapsulates: fetch, loading/error, editing state, dirty tracking,
 * beforeunload warning, Cmd/Ctrl+S save hotkey, j/k/Enter list navigation,
 * search/filter/sort memoization, save/delete/pin, and analytics.
 *
 * Each panel supplies its table name, payload transform, validation, filter
 * predicate, text sort, and tracking. Rendering stays in the panel components.
 */
export function useCrudPanel<T extends CrudRecord, F extends string>(
  config: CrudConfig<T, F>,
  initialEditId?: string | null,
  onClearEditId?: () => void,
) {
  const {
    table,
    emptyItem,
    toPayload,
    validate,
    deleteMessage,
    savedMessage,
    deletedMessage,
    trackSave,
    trackDelete,
    trackPin,
    allFilterValue,
    filterMatches,
    sortText,
  } = config;

  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Partial<T> | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<F>(allFilterValue);
  const [sortBy, setSortBy] = useState('updated');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  /* ---------------------------------------------------------------- fetch */

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setListError(null);
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });

    if (error) {
      setListError(error.message);
      setItems([]);
    } else {
      setItems((data as T[]) || []);
    }
    setLoading(false);
  }, [table]);

  useEffect(() => {
    // Mount fetch: `loading` already starts true, so this resolves pending state
    // instead of cascading — the canonical data-fetch effect.
    // oxlint-disable-next-line react/set-state-in-effect
    fetchItems();
  }, [fetchItems]);

  /* --------------------------------------------- deep-link edit-id sync --- */

  useEffect(() => {
    if (!initialEditId || items.length === 0) {
      return;
    }
    const match = items.find((item) => item.id === initialEditId);
    if (match) {
      // oxlint-disable-next-line react/set-state-in-effect
      setEditing({ ...match });
      setDirty(false);
      onClearEditId?.();
    }
  }, [initialEditId, items, onClearEditId]);

  /* ---------------------------------------------- dirty beforeunload ------ */

  useEffect(() => {
    if (!dirty) {
      return;
    }
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  /* --------------------------------------------------- cmd/ctrl+s save ----- */

  useEffect(() => {
    if (!editing) {
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        const form = document.getElementById(`${table}-form`) as HTMLFormElement | null;
        form?.requestSubmit();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [editing, table]);

  /* ------------------------------------------------- derived lists --------- */

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      const category = item.category?.trim();
      if (category) {
        set.add(category);
      }
    });
    return Array.from(set).toSorted((a, b) => a.localeCompare(b));
  }, [items]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    let next = items.filter((item) => filterMatches(item, filter));

    if (query) {
      next = next.filter((item) => {
        const haystack = Object.values(item)
          .filter((value) => value !== null && value !== undefined)
          .map((value) => (typeof value === 'string' ? value : String(value)))
          .join(' ')
          .toLowerCase();
        return haystack.includes(query);
      });
    }

    return next.toSorted((a, b) => {
      if (Boolean(a.pinned) !== Boolean(b.pinned)) {
        return a.pinned ? -1 : 1;
      }

      if (sortBy !== 'updated' && sortBy !== 'created') {
        const aText = sortText?.(a, sortBy) ?? null;
        const bText = sortText?.(b, sortBy) ?? null;
        if (aText !== null && bText !== null) {
          return aText.localeCompare(bText);
        }
      }

      const aDate = sortBy === 'created' ? a.created_at : a.updated_at || a.created_at;
      const bDate = sortBy === 'created' ? b.created_at : b.updated_at || b.created_at;
      return new Date(bDate || 0).getTime() - new Date(aDate || 0).getTime();
    });
  }, [items, search, filter, sortBy, filterMatches, sortText]);

  /* ----------------------------------------- selection follows the list --- */

  const selectionScope = `${search}\0${filter}\0${sortBy}`;
  const [seenSelectionScope, setSeenSelectionScope] = useState(selectionScope);
  if (seenSelectionScope !== selectionScope) {
    setSeenSelectionScope(selectionScope);
    setSelectedIndex(-1);
  } else if (selectedIndex >= filtered.length) {
    setSelectedIndex(filtered.length === 0 ? -1 : filtered.length - 1);
  }

  /* ------------------------------------------------------ field updates --- */

  const updateField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setEditing((prev) => (prev ? { ...prev, [key]: value } : null));
    setDirty(true);
  }, []);

  /* ------------------------------------------------------ create/edit ----- */

  const startCreate = useCallback(() => {
    const base = typeof emptyItem === 'function' ? emptyItem() : emptyItem;
    setEditing({ ...base });
    setFormError(null);
    setDirty(false);
  }, [emptyItem]);

  const startEdit = useCallback((item: T) => {
    setEditing({ ...item });
    setFormError(null);
    setDirty(false);
  }, []);

  /* --------------------------------------------------------------- save --- */

  const saveItem = useCallback(
    async (e: SubmitEvent) => {
      e.preventDefault();
      if (!editing) {
        return;
      }

      const validationError = validate?.(editing) ?? null;
      if (validationError) {
        setFormError(validationError);
        return;
      }

      setSaving(true);
      setFormError(null);

      const payload = toPayload(editing);
      const editId = editing.id;
      const result = editId
        ? await supabase.from(table).update(payload).eq('id', editId)
        : await supabase.from(table).insert([payload]);

      setSaving(false);

      if (result.error) {
        setFormError(result.error.message);
        toast({ title: 'Save failed', description: result.error.message, variant: 'destructive' });
        return;
      }

      trackSave({ isNew: !editId, payload });
      setDirty(false);
      setEditing(null);
      toast({ title: savedMessage ?? 'Saved' });
      fetchItems();
    },
    [editing, validate, toPayload, table, trackSave, savedMessage, fetchItems],
  );

  /* ------------------------------------------------------------ delete --- */

  const deleteItem = useCallback(
    async (id: string) => {
      if (!confirm(deleteMessage(id))) {
        return;
      }
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) {
        toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
        return;
      }
      trackDelete({ id });
      toast({ title: deletedMessage ?? 'Deleted' });
      if (editing?.id === id) {
        setEditing(null);
        setDirty(false);
      }
      fetchItems();
    },
    [deleteMessage, table, trackDelete, deletedMessage, editing, fetchItems],
  );

  /* ------------------------------------------------------------ cancel --- */

  const cancelEdit = useCallback(() => {
    if (dirty && !confirm('Discard unsaved changes?')) {
      return;
    }
    setEditing(null);
    setFormError(null);
    setDirty(false);
  }, [dirty]);

  /* -------------------------------------------------------- pin toggle --- */

  const togglePin = useCallback(
    async (id: string, currentPinned: boolean) => {
      const updated_at = new Date().toISOString();
      const { error } = await supabase.from(table).update({ pinned: !currentPinned, updated_at }).eq('id', id);
      if (error) {
        toast({ title: 'Failed to update pin', description: error.message, variant: 'destructive' });
        return;
      }
      trackPin?.({ pinned: !currentPinned });
      toast({ title: !currentPinned ? 'Pinned' : 'Unpinned' });
      fetchItems();
    },
    [table, trackPin, fetchItems],
  );

  /* ----------------------------------------------- keyboard list nav ------ */

  useEffect(() => {
    if (editing || loading || filtered.length === 0) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        const item = filtered[selectedIndex];
        if (!item) {
          return;
        }
        e.preventDefault();
        startEdit(item);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editing, loading, filtered, selectedIndex, startEdit]);

  return {
    items,
    loading,
    listError,
    editing,
    formError,
    saving,
    dirty,
    search,
    setSearch,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    categories,
    filtered,
    selectedIndex,
    setSelectedIndex,
    fetchItems,
    startCreate,
    startEdit,
    cancelEdit,
    saveItem,
    deleteItem,
    togglePin,
    updateField,
    setEditing,
    setDirty,
    setFormError,
  };
}
