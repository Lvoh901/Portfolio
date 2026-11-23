import { query } from './db.js';
import { defaultContent } from '../src/data/defaultContent.js';

export const readStoredContent = async () => {
  const { rows } = await query('select key, value from site_content');
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
};

/**
 * The CV lives in UploadThing, so the stored object carries its public URL.
 */
export const presentCv = (cv) => {
  const value = cv && typeof cv === 'object' ? cv : defaultContent.cv;
  return {
    filename: value.filename || defaultContent.cv.filename,
    updatedAt: value.updatedAt || null,
    url: value.url || defaultContent.cv.url,
  };
};

export const listProjects = async () => {
  const { rows } = await query(
    `select id, slug, title, category, description, image_key, image_url, link_url, stage, sort_order, created_at
       from projects
      order by sort_order asc, created_at asc`,
  );

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    description: row.description,
    imageKey: row.image_key || '',
    imageUrl: row.image_url || '',
    linkUrl: row.link_url || '',
    stage: row.stage,
    sortOrder: row.sort_order,
  }));
};

export const listTestimonials = async () =>
  (
    await query(
      `select id, quote, author, role, metric, sort_order from testimonials order by sort_order asc, author asc`,
    )
  ).rows;

export const publicContent = async () => {
  const stored = await readStoredContent();
  const merged = { ...defaultContent, ...stored };
  return {
    content: { ...merged, cv: presentCv(merged.cv) },
    projects: await listProjects(),
    testimonials: await listTestimonials(),
  };
};

export const text = (value, max = 2000) => String(value ?? '').trim().slice(0, max);

export const trimToNull = (value) => {
  const trimmed = text(value);
  return trimmed === '' ? null : trimmed;
};

export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
