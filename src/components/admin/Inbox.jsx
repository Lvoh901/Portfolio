'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RealtimeProvider, useLiveQuery } from '@neon/realtime-react';
import { Mail, RefreshCw, Trash2 } from 'lucide-react';
import { adminFetch } from '../../lib/adminApi';
import { realtimeClient } from '../../lib/realtimeClient';

const statuses = [
  { id: 'new', label: 'New' },
  { id: 'read', label: 'Read' },
  { id: 'archived', label: 'Archived' },
  { id: 'all', label: 'All' },
];

const formatDate = (value) => {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const StatusBadge = ({ status }) => {
  const tone =
    status === 'new'
      ? 'bg-accent text-ink'
      : status === 'archived'
        ? 'border border-line text-muted'
        : 'bg-ink text-paper';
  return (
    <span className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${tone}`}>
      {status}
    </span>
  );
};

const InquiryList = ({ rows, onStatus, onDelete, busyId, emptyLabel }) => (
  <div className="divide-y divide-line border border-line bg-paper">
    {rows.length === 0 && (
      <p className="px-5 py-10 text-center text-[13px] text-muted">{emptyLabel}</p>
    )}

    {rows.map((row) => (
      <article key={row.id} className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={row.status} />
              <h3 className="text-[15px] font-semibold">{row.name}</h3>
              <a
                href={`mailto:${row.email}`}
                className="inline-flex items-center gap-1 text-[12px] text-muted underline underline-offset-4 hover:text-ink"
              >
                <Mail className="h-3.5 w-3.5" />
                {row.email}
              </a>
            </div>
            <p className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-muted">
              {[row.project_type, row.company, row.project_title].filter(Boolean).join(' · ') ||
                'General enquiry'}
            </p>
          </div>
          <time className="text-[11px] text-muted">{formatDate(row.created_at)}</time>
        </div>

        <p className="mt-3 whitespace-pre-line text-[13.5px] leading-relaxed text-ink-soft">
          {row.message}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {['new', 'read', 'archived']
            .filter((status) => status !== row.status)
            .map((status) => (
              <button
                key={status}
                type="button"
                disabled={busyId === row.id}
                onClick={() => onStatus(row.id, status)}
                className="border border-line px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-50"
              >
                Mark {status}
              </button>
            ))}
          <a
            href={`mailto:${row.email}?subject=Re: your enquiry`}
            className="inline-flex items-center gap-1.5 bg-ink px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-accent hover:text-ink"
          >
            Reply
          </a>
          <button
            type="button"
            disabled={busyId === row.id}
            onClick={() => onDelete(row.id)}
            aria-label="Delete enquiry"
            className="ml-auto inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-red-700 disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </article>
    ))}
  </div>
);

const LiveList = ({ sealed, refreshSealed, onLiveError, onLiveData, filter, onStatus, onDelete, busyId }) => {
  const { data, status, error } = useLiveQuery(sealed, { refreshQuery: refreshSealed });

  useEffect(() => {
    if (status === 'error') onLiveError(error?.message || 'Live updates stopped.');
  }, [status, error, onLiveError]);

  useEffect(() => {
    if (data) onLiveData(data);
  }, [data, onLiveData]);

  const rows = useMemo(() => {
    const list = data ?? [];
    return filter === 'all' ? list : list.filter((row) => row.status === filter);
  }, [data, filter]);

  if (data === undefined) {
    return (
      <p className="border border-line bg-paper px-5 py-10 text-center text-[13px] text-muted">
        Connecting to live updates…
      </p>
    );
  }

  return (
    <InquiryList
      rows={rows}
      onStatus={onStatus}
      onDelete={onDelete}
      busyId={busyId}
      emptyLabel="No enquiries in this view yet. New submissions appear here instantly."
    />
  );
};

const Inbox = () => {
  const [rows, setRows] = useState([]);
  const [liveRows, setLiveRows] = useState(null);
  const [sealed, setSealed] = useState(null);
  const [filter, setFilter] = useState('all');
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');
  const [liveError, setLiveError] = useState('');

  const loadRows = useCallback(async () => {
    try {
      const result = await adminFetch('/admin/inquiries');
      setRows(result.inquiries || []);
      setError('');
    } catch (loadError) {
      setError(loadError.message);
    }
  }, []);

  const refreshSealed = useCallback(async () => {
    const result = await adminFetch('/admin/inquiries/live');
    setSealed(result);
    return result;
  }, []);

  useEffect(() => {
    loadRows();
    if (realtimeClient) {
      refreshSealed().catch((sealError) => setLiveError(sealError.message));
    }
  }, [loadRows, refreshSealed]);

  const changeStatus = async (id, status) => {
    setBusyId(id);
    try {
      await adminFetch(`/admin/inquiries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      await loadRows();
    } catch (updateError) {
      setError(updateError.message);
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id) => {
    setBusyId(id);
    try {
      await adminFetch(`/admin/inquiries/${id}`, { method: 'DELETE' });
      await loadRows();
    } catch (deleteError) {
      setError(deleteError.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleLiveError = useCallback((message) => {
    setLiveError(message);
    setSealed(null);
  }, []);

  const restRows = filter === 'all' ? rows : rows.filter((row) => row.status === filter);
  const countSource = liveRows ?? rows;
  const counts = {
    new: countSource.filter((row) => row.status === 'new').length,
    total: countSource.length,
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            Client enquiries
          </p>
          <h1 className="mt-2 font-serif text-3xl">Inbox</h1>
          <p className="mt-2 text-[13px] text-muted">
            {counts.new} new · {counts.total} total
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {statuses.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                filter === item.id
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line text-muted hover:border-ink hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              loadRows();
              if (realtimeClient) refreshSealed().catch(() => {});
            }}
            className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px]">
        <span
          className={`inline-flex items-center gap-1.5 border px-2.5 py-1 uppercase tracking-[0.12em] ${
            sealed ? 'border-accent text-ink' : 'border-line text-muted'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${sealed ? 'bg-accent' : 'bg-muted'}`} />
          {sealed ? 'Live' : realtimeClient ? 'Polling' : 'Live updates off'}
        </span>
        {liveError && <span className="text-muted">Live updates stopped: {liveError}</span>}
      </div>

      {error && (
        <p role="alert" className="mt-4 border-l-2 border-red-500 bg-paper px-4 py-2 text-[12px] text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6">
        {sealed && realtimeClient ? (
          <RealtimeProvider client={realtimeClient}>
            <LiveList
              sealed={sealed}
              refreshSealed={refreshSealed}
              onLiveError={handleLiveError}
              onLiveData={setLiveRows}
              filter={filter}
              onStatus={changeStatus}
              onDelete={remove}
              busyId={busyId}
            />
          </RealtimeProvider>
        ) : (
          <InquiryList
            rows={restRows}
            onStatus={changeStatus}
            onDelete={remove}
            busyId={busyId}
            emptyLabel="No enquiries yet. Submit the contact form on the site to test this."
          />
        )}
      </div>
    </div>
  );
};

export default Inbox;
