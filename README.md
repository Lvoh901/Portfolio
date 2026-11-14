# Elvis Odhiambo — portfolio & dashboard

Next.js (App Router) portfolio with a private dashboard for editing site content,
managing projects, replacing the CV, and reading client enquiries.

**Stack:** Next.js 16 · Tailwind CSS v4 · Neon Postgres · Neon Managed Auth (Better Auth) ·
Neon Realtime · UploadThing

## Local setup

```bash
npm install
neon deploy          # pulls the Neon branch credentials into .env.local
npm run db:migrate   # creates the schema and seeds default content
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint
```

`.env.example` lists every variable the app reads. Set `UPLOADTHING_TOKEN` from
https://uploadthing.com/dashboard to enable CV and project image uploads.

## Structure

```
app/(site)/      public pages (home, contact, design)
app/admin/       dashboard (sign-in, inbox, content, projects, CV, access)
app/api/         route handlers: content, inquiries, admin CRUD, realtime, uploadthing
server/          Postgres, auth, realtime, UploadThing and content helpers
src/components/  UI (public sections + dashboard)
src/data/        default content, shared by the seed and the frontend fallback
```

## Dashboard

`/admin` signs in through Managed Auth. Access is controlled by the `admin_users`
table (seeded by the migration, managed from the Access tab), not by env vars.
