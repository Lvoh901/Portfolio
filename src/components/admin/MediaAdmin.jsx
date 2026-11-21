'use client';

import { useEffect, useState } from 'react';
import { FileUp, ExternalLink } from 'lucide-react';
import { adminFetch } from '../../lib/adminApi';
import toast from '../../lib/toast';
import { useUploadThing } from '../../lib/uploadthing';
import { useContent } from '../../contexts/ContentContext';

const MediaAdmin = () => {
  const [cv, setCv] = useState(null);
  const [busy, setBusy] = useState(false);
  const { reload } = useContent();
  const { startUpload } = useUploadThing('cvUpload', {
    headers: async () => ({ Authorization: `Bearer ${localStorage.getItem('portfolio_token')}` }),
  });

  useEffect(() => {
    adminFetch('/admin/content')
      .then((result) => setCv(result.content.cv))
      .catch((error) => toast.error('Could not load CV', error.message));
  }, []);

  const uploadCv = async (file) => {
    if (!file) return;
    setBusy(true);
    try {
      const uploaded = await startUpload([file]);
      const result = uploaded?.[0];
      if (!result) throw new Error('Upload failed. Please try again.');

      const saved = await adminFetch('/admin/cv', {
        method: 'POST',
        body: JSON.stringify({
          url: result.ufsUrl || result.url,
          key: result.key,
          filename: result.name || file.name,
        }),
      });

      setCv(saved.cv);
      await reload();
      toast.success('CV replaced', 'The site links now point to the new file.');
    } catch (error) {
      toast.error('Upload failed', error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Files</p>
      <h1 className="mt-2 font-serif text-3xl">CV &amp; uploads</h1>
      <p className="mt-2 max-w-xl text-[13px] text-muted">
        The CV is stored on UploadThing and linked from the hero and about sections. Uploading a
        new PDF replaces it everywhere.
      </p>

      <div className="mt-6 max-w-xl border border-line bg-paper p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          Current CV
        </p>
        <p className="mt-2 break-words text-[14px]">{cv?.filename || 'Loading…'}</p>
        {cv?.updatedAt && (
          <p className="mt-1 text-[11px] text-muted">
            Updated {new Date(cv.updatedAt).toLocaleString()}
          </p>
        )}
        {cv?.url && (
          <a
            href={cv.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open current file
          </a>
        )}

        <label className="mt-6 inline-flex cursor-pointer items-center gap-2 bg-ink px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink">
          <FileUp className="h-3.5 w-3.5" />
          {busy ? 'Uploading…' : 'Upload new CV (PDF)'}
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            disabled={busy}
            onChange={(event) => uploadCv(event.target.files?.[0])}
          />
        </label>

        <p className="mt-4 text-[11px] leading-relaxed text-muted">
          The previous file is deleted from UploadThing when you replace it. Project images are
          uploaded from the Projects tab.
        </p>
      </div>
    </div>
  );
};

export default MediaAdmin;
