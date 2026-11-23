import { pathToFileURL } from 'node:url';
import { query, transaction } from './db.js';
import { schemaSql } from './schema.js';
import { defaultContent, defaultProjects, defaultTestimonials } from '../src/data/defaultContent.js';
import { defaultAdmins } from './defaultAdmins.js';
import { env } from './env.js';

export const migrate = async () => {
  await query(schemaSql);
  // Add metric column to existing testimonials tables
  await query(`alter table testimonials add column if not exists metric text not null default ''`);
};

export const seed = async () => {
  await transaction(async (client) => {
    // Seed administrators once; afterwards the dashboard's Access tab owns the list.
    const adminCount = await client.query('select count(*)::int as count from admin_users');
    if (adminCount.rows[0].count === 0) {
      const adminEmails = new Set([
        ...defaultAdmins.map((admin) => admin.email),
        ...env.adminEmails,
      ]);
      const adminNames = new Map(defaultAdmins.map((admin) => [admin.email, admin.name]));

      for (const email of adminEmails) {
        await client.query(
          `insert into admin_users (email, name)
           values ($1, $2)
           on conflict (email) do nothing`,
          [email.toLowerCase(), adminNames.get(email.toLowerCase()) || ''],
        );
      }
    }

    for (const [key, value] of Object.entries(defaultContent)) {
      await client.query(
        `insert into site_content (key, value)
         values ($1, $2::jsonb)
         on conflict (key) do nothing`,
        [key, JSON.stringify(value)],
      );
    }

    const projectCount = await client.query('select count(*)::int as count from projects');
    if (projectCount.rows[0].count === 0) {
      let order = 0;
      for (const project of defaultProjects) {
        await client.query(
          `insert into projects (slug, title, category, description, image_url, link_url, stage, sort_order)
           values ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            project.id,
            project.title,
            project.category,
            project.description,
            project.imageUrl,
            project.linkUrl,
            project.stage,
            order++,
          ],
        );
      }
    }

    const testimonialCount = await client.query('select count(*)::int as count from testimonials');
    if (testimonialCount.rows[0].count === 0) {
      let order = 0;
      for (const testimonial of defaultTestimonials) {
        await client.query(
          `insert into testimonials (quote, author, role, metric, sort_order)
           values ($1, $2, $3, $4, $5)`,
          [testimonial.quote, testimonial.author, testimonial.role, testimonial.metric || '', order++],
        );
      }
    }
  });
};

const isEntryPoint =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isEntryPoint) {
  try {
    await migrate();
    console.log('✓ schema applied');
    await seed();
    console.log('✓ default content seeded (existing rows left untouched)');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}
